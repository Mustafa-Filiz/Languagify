import { useQuery } from '@tanstack/react-query'
import customFetch from '../utils/customFetch'
import { SpotifyProfileSchema } from '../types/SpotifyProfile'
import { queryClient } from '../main'

const useSpotifyProfile = () => {
  const query = useQuery({
    queryKey: ['spotify-me'],
    queryFn: async () => {
      const response = await customFetch('/spotify/me', SpotifyProfileSchema, {
        init: {
          method: 'GET',
        },
      })
      console.log('🤖 ~ response:', response)
      return response
    },
    enabled: !queryClient.getQueryData(['spotify-me']),
  })

  return query
}

export { useSpotifyProfile }
