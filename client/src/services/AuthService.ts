import { useMutation } from '@tanstack/react-query'
import { SignUpType } from '../schemas/SignUp'
import { queryClient } from '../main'
import customFetch from '../utils/customFetch'
import { UserSchema } from '../schemas/User'
import { useNavigate } from '@tanstack/react-router'
import { LoginType } from '../schemas/Login'

export const getAuthUser = () => {
  return queryClient.getQueryData(['authUser'])
}

export const useCreateUser = () => {
  const navigate = useNavigate()
  const { mutate, isError, isSuccess, isPending, error, data } = useMutation({
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
      navigate({
        to: '/',
      })
    },
  })

  return { mutate, isError, isSuccess, isPending, error, data }
}

export const useLogin = () => {
  const navigate = useNavigate()
  const { mutate, isError, isSuccess, isPending, error, data } = useMutation({
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
      navigate({
        to: '/',
      })
    },
  })

  return { mutate, isError, isSuccess, isPending, error, data }
}
