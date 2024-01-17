import { useMutation } from '@tanstack/react-query'
import { SignUpSchemaType } from '../schemas/SignUp'
import customFetch from '../utils/customFetch'
import { UserSchema } from '../schemas/User'

export const useCreateUser = () => {
  const { mutate, isError, isSuccess, isPending, error, data } = useMutation({
    mutationFn: async (values: SignUpSchemaType) => {
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
  })

  return { mutate, isError, isSuccess, isPending, error, data }
}
