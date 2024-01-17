import { z } from 'zod'

export const UserSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type User = z.infer<typeof UserSchema>
