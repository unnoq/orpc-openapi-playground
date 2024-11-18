import { oz } from '@orpc/zod'
import { z } from 'zod'

export const NewUserSchema = oz.openapi(
  z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
  }),
  {
    examples: [
      {
        name: 'John Doe',
        email: 'john@doe.com',
        password: '123456',
      },
    ],
  },
)

export const UserSchema = oz.openapi(
  z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
  }),
  {
    examples: [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@doe.com',
      },
    ],
  },
)
