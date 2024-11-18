import { oz } from '@orpc/zod'
import { z } from 'zod'

export const CredentialSchema = oz.openapi(
  z.object({
    email: z.string().email(),
    password: z.string(),
  }),
  {
    examples: [
      {
        email: 'john@doe.com',
        password: '123456',
      },
    ],
  },
)

export const TokenSchema = oz.openapi(
  z.object({
    token: z.string(),
  }),
  {
    examples: [
      {
        token: '****',
      },
    ],
  },
)
