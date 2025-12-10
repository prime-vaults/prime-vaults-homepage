export default {
  fetch: async (request: Request, env: any) => {
    try {
      const response = await env.ASSETS.fetch(request)

      if (response.status === 404) {
        const indexRequest = new Request(
          new URL('/index.html', request.url),
          request,
        )
        return await env.ASSETS.fetch(indexRequest)
      }

      return response
    } catch (error: any) {
      return new Response(`Error fetching ${request.url}: ${error.message}`, {
        status: 500,
      })
    }
  },
}
