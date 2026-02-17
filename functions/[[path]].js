function hasFileExtension(pathname) {
  return /\.[a-zA-Z0-9]+$/.test(pathname)
}

function normalizeAssetPath(pathname, prefix = '') {
  if (!pathname) return null

  const strippedQuery = pathname.split('?')[0]
  const normalized = strippedQuery
    .replace(/^\.\//, '/')
    .replace(/^\/+/, '/')

  if (!prefix) {
    return normalized.startsWith('/') ? normalized : `/${normalized}`
  }

  const basePrefix = prefix.endsWith('/') ? prefix.slice(0, -1) : prefix
  if (normalized.startsWith(`${basePrefix}/`)) return normalized
  return `${basePrefix}${normalized.startsWith('/') ? normalized : `/${normalized}`}`
}

async function readEntrypoints(indexResponse, assetPrefix = '') {
  const html = await indexResponse.clone().text()
  const scriptMatch = html.match(/<script[^>]+type="module"[^>]+src="([^"]+)"/i)
  const cssMatch = html.match(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/i)

  return {
    script: normalizeAssetPath(scriptMatch?.[1], assetPrefix),
    css: normalizeAssetPath(cssMatch?.[1], assetPrefix),
  }
}

function cloneWithStatus(response, status = 200) {
  const headers = new Headers(response.headers)
  headers.delete('location')
  headers.delete('content-length')

  return new Response(response.body, {
    status,
    headers,
  })
}

export async function onRequest(context) {
  const { request, env } = context
  const url = new URL(request.url)

  const distIndexUrl = new URL('/dist/index.html', url)
  const distIndexResponse = await env.ASSETS.fetch(new Request(distIndexUrl, request))
  const distContentType = (distIndexResponse.headers.get('content-type') || '').toLowerCase()
  const hasDistFallback = distIndexResponse.status === 200 && distContentType.includes('text/html')
  const distAssetPrefix = '/dist'

  let rootIndexResponse = null
  let hasRootFallback = false
  if (!hasDistFallback) {
    const rootIndexUrl = new URL('/', url)
    rootIndexResponse = await env.ASSETS.fetch(new Request(rootIndexUrl, request))
    const rootContentType = (rootIndexResponse.headers.get('content-type') || '').toLowerCase()
    hasRootFallback = rootIndexResponse.status === 200 && rootContentType.includes('text/html')
  }

  const hasIndexFallback = hasDistFallback || hasRootFallback
  const indexResponse = hasDistFallback ? distIndexResponse : rootIndexResponse

  if (hasIndexFallback) {
    if (url.pathname === '/' || url.pathname === '/index.html' || !hasFileExtension(url.pathname)) {
      return cloneWithStatus(indexResponse, 200)
    }

    if (hasDistFallback && (url.pathname.startsWith('/assets/') || url.pathname === '/vite.svg')) {
      const mappedUrl = new URL(`${distAssetPrefix}${url.pathname}`, url)
      const mappedResponse = await env.ASSETS.fetch(new Request(mappedUrl, request))
      if (mappedResponse.status !== 404) {
        return mappedResponse
      }
    }

    if (url.pathname === '/src/main.jsx' || url.pathname === '/src/index.css') {
      const entrypoints = await readEntrypoints(indexResponse, hasDistFallback ? distAssetPrefix : '')
      const mappedPath = url.pathname === '/src/main.jsx' ? entrypoints.script : entrypoints.css

      if (mappedPath) {
        const mappedResponse = await env.ASSETS.fetch(new Request(new URL(mappedPath, url), request))
        if (mappedResponse.status !== 404) {
          return mappedResponse
        }
      }

      return new Response('Not Found', { status: 404 })
    }
  }

  const assetResponse = await env.ASSETS.fetch(request)
  if (assetResponse.status !== 404) {
    return assetResponse
  }

  if (!hasFileExtension(url.pathname)) {
    const indexPath = hasDistFallback ? '/dist/index.html' : '/'
    const indexResponse = await env.ASSETS.fetch(new Request(new URL(indexPath, url), request))
    const indexContentType = (indexResponse.headers.get('content-type') || '').toLowerCase()
    if (indexResponse.status === 200 && indexContentType.includes('text/html')) {
      return cloneWithStatus(indexResponse, 200)
    }
  }

  return assetResponse
}
