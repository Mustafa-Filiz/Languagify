import { useMutation, useQuery } from '@tanstack/react-query'
import { SignUpType } from '../schemas/SignUp'
import { queryClient } from '../main'
import customFetch from '../utils/customFetch'
import { UserSchema, UserType } from '../schemas/User'
import { useNavigate } from '@tanstack/react-router'
import { LoginType } from '../schemas/Login'
import useLocalStorage, {
  removeLocalStorageValue,
} from '../hooks/useLocalStorage'
import { useEffect } from 'react'
import { z } from 'zod'

export const LANGIFY_LOCAL_STORAGE_KEY = 'langify-token'

export const getAuthUser = () => {
  return queryClient.getQueryData(['authUser']) as UserType | undefined
}

export const useCreateUser = () => {
  const navigate = useNavigate()
  const [, setToken] = useLocalStorage<string | null>(
    LANGIFY_LOCAL_STORAGE_KEY,
    null
  )

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
    },
  })

  useEffect(() => {
    if (!mutation.isSuccess) {
      return
    }

    navigate({
      to: '/',
    })
  }, [mutation.isSuccess, navigate])

  return mutation
}

export const useLogin = () => {
  const navigate = useNavigate()
  const [, setToken] = useLocalStorage<string | null>(
    LANGIFY_LOCAL_STORAGE_KEY,
    null
  )

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
    },
  })

  useEffect(() => {
    if (!mutation.isSuccess) {
      return
    }

    navigate({
      to: '/',
    })
  }, [mutation.isSuccess, navigate])

  return mutation
}

export const useLogout = () => {
  const navigate = useNavigate()

  const LogoutSchema = z.object({
    message: z.string(),
  })

  const mutation = useMutation({
    mutationKey: ['authUser'],
    mutationFn: async () => {
      const response = await customFetch('/user/logout', LogoutSchema, {
        init: {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      })

      return response
    },
    onSuccess: () => {
      removeLocalStorageValue(LANGIFY_LOCAL_STORAGE_KEY)
      queryClient.setQueryData(['authUser'], undefined)
    },
  })

  useEffect(() => {
    if (!mutation.isSuccess) {
      return
    }

    navigate({
      to: '/login',
    })
  }, [mutation.isSuccess, navigate])

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
    initialData: authUser,
  })

  return query
}
