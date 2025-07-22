// Catch-all route for proxy functionality
export default defineEventHandler(async (event) => {
  // If RAYCAST_EMAIL is set, we're running locally - let other routes handle the request
  if (process.env.RAYCAST_EMAIL) {
    // This will fall through to other routes or return 404
    throw createError({
      statusCode: 404,
      statusMessage: 'Not Found'
    })
  }

  // If no RAYCAST_EMAIL, proxy to Raycast backend
  const { req } = event.node
  const url = getRequestURL(event)
  const path = url.pathname + url.search
  
  try {
    return await getBackendResponse(path, req.headers, req.method as any)
  } catch (error) {
    console.error('[Proxy] Error forwarding to Raycast backend:', error)
    throw createError({
      statusCode: 502,
      statusMessage: 'Bad Gateway'
    })
  }
})