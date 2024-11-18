import type { z } from 'zod'
import type { PlanetSchema } from '../schemas/planet'

export const planets: z.infer<typeof PlanetSchema>[] = [
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
  {
    id: 2,
    name: 'Mars',
    description: 'The planet Mars',
    imageUrl: 'https://picsum.photos/200/300',
    creator: {
      id: '1',
      name: 'John Doe',
      email: 'john@doe.com',
    },
  },
  {
    id: 3,
    name: 'Jupiter',
    description: 'The planet Jupiter',
    imageUrl: 'https://picsum.photos/200/300',
    creator: {
      id: '1',
      name: 'John Doe',
      email: 'john@doe.com',
    },
  },
]
