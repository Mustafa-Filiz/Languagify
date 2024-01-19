import { z } from 'zod'

export const UserSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  token: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type UserType = z.infer<typeof UserSchema>
