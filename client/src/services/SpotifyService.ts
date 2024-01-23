import { useMutation } from '@tanstack/react-query'
import customFetch from '../utils/customFetch'
import { SpotifyConnectSchema } from '../schemas/SpotifyToken'

const useSpotifyConnect = () => {
  const mutation = useMutation({
    mutationKey: ['spotifyConnect'],
    mutationFn: async () => {
      const response = await customFetch(
        '/spotify/connect',
        SpotifyConnectSchema,
        {
          init: {
            method: 'GET',
          },
        }
      )

      return response
    },
    onSuccess: (data) => {
      const a = document.createElement('a')
      a.href = data.auth_url
      a.click()
    },
  })
  return mutation
}

export { useSpotifyConnect }
