import { useMutation } from '@tanstack/react-query'
import { SignUpType } from '../schemas/SignUp'
import { queryClient } from '../main'
import customFetch from '../utils/customFetch'
import { UserSchema } from '../schemas/User'
import { useNavigate } from '@tanstack/react-router'

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
    onSuccess: (data, variables, context) => {
      console.log('🤖 ~ data:', data)
      console.log('🤖 ~ variables:', variables)
      console.log('🤖 ~ context:', context)
      queryClient.setQueryData(['authUser'], data)
      navigate({
        to: '/',
      })
    },
  })

  return { mutate, isError, isSuccess, isPending, error, data }
}

export const getAuthUser = () => {
  return queryClient.getQueryData(['authUser'])
}
