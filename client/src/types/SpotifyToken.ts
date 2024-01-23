import { z } from 'zod'

export const SpotifyConnectSchema = z.object({
  auth_url: z.string(),
})

export const SpotifyTokenSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
})

export type SpotifyTokenType = z.infer<typeof SpotifyTokenSchema>
