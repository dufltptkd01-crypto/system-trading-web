function hasFileExtension(pathname) {
  return /\.[a-zA-Z0-9]+$/.test(pathname)
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
    if (url.pathname === '/' || !hasFileExtension(url.pathname)) {
      return cloneWithStatus(distIndexResponse, 200)
    }

    if (url.pathname.startsWith('/assets/') || url.pathname === '/vite.svg') {
      const mappedUrl = new URL(`/dist${url.pathname}`, url)
      const mappedResponse = await env.ASSETS.fetch(new Request(mappedUrl, request))
      if (mappedResponse.status !== 404) {
        return mappedResponse
      }
    }
  }

  const assetResponse = await env.ASSETS.fetch(request)
  if (assetResponse.status !== 404) {
    return assetResponse
  }

  if (!hasFileExtension(url.pathname)) {
    const indexPath = hasDistFallback ? '/dist/index.html' : '/index.html'
    const indexResponse = await env.ASSETS.fetch(new Request(new URL(indexPath, url), request))
    if (indexResponse.status !== 404) {
      return cloneWithStatus(indexResponse, 200)
    }
  }

  return assetResponse
}
