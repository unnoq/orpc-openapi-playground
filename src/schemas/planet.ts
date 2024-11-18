import { oz } from '@orpc/zod'
import { z } from 'zod'
import { UserSchema } from './user'

export const NewPlanetSchema = oz.openapi(
  z.object({
    id: z.number().int().min(1),
    name: z.string(),
    description: z.string().optional(),
    image: oz.file().type('image/*').optional(),
  }),
  {
    examples: [
      {
        id: 1,
        name: 'Earth',
        description: 'The planet Earth',
      },
    ],
  },
)

export const PlanetSchema = oz.openapi(
  z.object({
    id: z.number().int().min(1),
    name: z.string(),
    description: z.string().optional(),
    imageUrl: z.string().url().optional(),
    creator: UserSchema,
  }),
  {
    examples: [
      {
        id: 1,
        name: 'Earth',
        description: 'The planet Earth',
        imageUrl: 'https://picsum.photos/200/300',
        creator: {
          id: '1',
          name: 'John Doe',
          email: 'john@doe.com',
        },
      },
    ],
  },
)
