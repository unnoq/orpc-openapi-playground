import { os, ORPCError } from '@orpc/server'
import type { z } from 'zod'
import type { UserSchema } from './schemas/user'

export type ORPCContext = { user?: z.infer<typeof UserSchema>; db: any }

export const osw = os.context<ORPCContext>().use((input, context, meta) => {
  const start = Date.now()

  meta.onFinish(() => {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.log(`[${meta.path.join('/')}] ${Date.now() - start}ms`)
  })
})

export const authed = osw.use((input, context, meta) => {
  if (!context.user) {
    throw new ORPCError({
      code: 'UNAUTHORIZED',
    })
  }

  return {
    context: {
      user: context.user,
    },
  }
})
