import { createServer } from 'node:http'
import { generateOpenAPI } from '@orpc/openapi'
import { createFetchHandler } from '@orpc/server/fetch'
import { createServerAdapter } from '@whatwg-node/server'
import { router } from './router'

const orpcHandler = createFetchHandler({
  router,
  hooks(context, meta) {
    meta.onError((e) => console.error(e))
  },
})

const server = createServer(
  createServerAdapter((request: Request) => {
    const url = new URL(request.url)

    const context = request.headers.get('Authorization')
      ? { user: { id: 'test', name: 'John Doe', email: 'john@doe.com' } }
      : {}

    if (url.pathname.startsWith('/api')) {
      return orpcHandler({
        request,
        prefix: '/api',
        context,
      })
    }

    if (url.pathname === '/spec.json') {
      const spec = generateOpenAPI({
        router,
        info: {
          title: 'ORPC OpenAPI Playground',
          version: '1.0.0',
          description: `
The example OpenAPI Playground for ORPC.

## Resources

* [Github](https://github.com/unnoq/orpc)
* [Documentation](https://orpc.unnoq.com)
          `,
        },
        servers: [{ url: new URL('/api', url).toString() }],
        security: [{ bearerAuth: [] }],
        components: {
          securitySchemes: {
            bearerAuth: {
              type: 'http',
              scheme: 'bearer',
            },
          },
        },
      })

      return new Response(JSON.stringify(spec), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }

    return new Response(
      `
        <!doctype html>
        <html>
        <head>
            <title>Scalar API Reference</title>
            <meta charset="utf-8" />
            <meta
            name="viewport"
            content="width=device-width, initial-scale=1" />

            <link rel="icon" type="image/svg+xml" href="https://orpc.unnoq.com/icon.svg" />
        </head>
        <body>
            <script
            id="api-reference"
            data-url="/spec.json"
            data-configuration="${JSON.stringify({
              authentication: {
                preferredSecurityScheme: 'bearerAuth',
                http: {
                  bearer: {
                    token: 'default-token',
                  },
                },
              },
            }).replaceAll('"', '&quot;')}"
            ></script>

            <script src="https://cdn.jsdelivr.net/npm/@scalar/api-reference"></script>
        </body>
        </html>
    `,
      {
        headers: {
          'Content-Type': 'text/html',
        },
      },
    )
  }),
)

server.listen(2026, () => {
  // biome-ignore lint/suspicious/noConsole: <explanation>
  console.log('Playground is available at http://localhost:2026')
})
