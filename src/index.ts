interface Env {
  ASSETS: {
    fetch: (request: Request) => Promise<Response>
  }
}

export default {
  fetch: async (request: Request, env: Env) => {
    try {
      const url = new URL(request.url)

      let response = await env.ASSETS.fetch(request)

      if (response.status === 404 && !url.pathname.startsWith('/api')) {
        const indexRequest = new Request(
          new URL('/index.html', request.url),
          request,
        )
        response = await env.ASSETS.fetch(indexRequest)
      }

      return response
    } catch (error: any) {
      return new Response(`Error: ${error.message}`, {
        status: 500,
      })
    }
  },
}
