function hasFileExtension(pathname) {
  return /\.[a-zA-Z0-9]+$/.test(pathname)
}

function normalizeDistPath(pathname) {
  if (!pathname) return null

  const strippedQuery = pathname.split('?')[0]
  const normalized = strippedQuery
    .replace(/^\.\//, '/')
    .replace(/^\/+/, '/')

  if (normalized.startsWith('/dist/')) return normalized
  if (!normalized.startsWith('/')) return `/dist/${normalized}`
  return `/dist${normalized}`
}

async function readDistEntrypoints(distIndexResponse) {
  const html = await distIndexResponse.clone().text()
  const scriptMatch = html.match(/<script[^>]+type="module"[^>]+src="([^"]+)"/i)
  const cssMatch = html.match(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/i)

  return {
    script: normalizeDistPath(scriptMatch?.[1]),
    css: normalizeDistPath(cssMatch?.[1]),
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

  if (hasDistFallback) {
    if (url.pathname === '/' || url.pathname === '/index.html' || !hasFileExtension(url.pathname)) {
      return cloneWithStatus(distIndexResponse, 200)
    }

    if (url.pathname.startsWith('/assets/') || url.pathname === '/vite.svg') {
      const mappedUrl = new URL(`/dist${url.pathname}`, url)
      const mappedResponse = await env.ASSETS.fetch(new Request(mappedUrl, request))
      if (mappedResponse.status !== 404) {
        return mappedResponse
      }
    }

    if (url.pathname === '/src/main.jsx' || url.pathname === '/src/index.css') {
      const entrypoints = await readDistEntrypoints(distIndexResponse)
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
