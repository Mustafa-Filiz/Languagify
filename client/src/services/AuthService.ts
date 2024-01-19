import { useMutation, useQuery } from '@tanstack/react-query'
import { SignUpType } from '../schemas/SignUp'
import { queryClient } from '../main'
import customFetch from '../utils/customFetch'
import { UserSchema } from '../schemas/User'
import { useNavigate } from '@tanstack/react-router'
import { LoginType } from '../schemas/Login'
import useLocalStorage from '../hooks/useLocalStorage'

export const LANGIFY_LOCAL_STORAGE_KEY = 'langify-token'

export const getAuthUser = () => {
  return queryClient.getQueryData(['authUser'])
}

export const useCreateUser = () => {
  const navigate = useNavigate()
  const [, setToken] = useLocalStorage<string>(LANGIFY_LOCAL_STORAGE_KEY, '')

  const mutation = useMutation({
    mutationKey: ['authUser'],
    mutationFn: async (values: SignUpType) => {
      const response = await customFetch('/user/create', UserSchema, {
        init: {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(values),
        },
      })
      return response
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['authUser'], data)
      setToken(data.token)
      navigate({
        to: '/',
      })
    },
  })

  return mutation
}

export const useLogin = () => {
  const navigate = useNavigate()
  const [, setToken] = useLocalStorage<string>(LANGIFY_LOCAL_STORAGE_KEY, '')

  const mutation = useMutation({
    mutationKey: ['authUser'],
    mutationFn: async (values: LoginType) => {
      const response = await customFetch('/user/login', UserSchema, {
        init: {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(values),
        },
      })
      return response
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['authUser'], data)
      setToken(data.token)
      navigate({
        to: '/',
      })
    },
  })

  return mutation
}

export const useUser = () => {
  const authUser = getAuthUser()
  const query = useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      const response = await customFetch('/user/me', UserSchema)
      return response
    },
    enabled: !authUser,
  })

  return query
}
