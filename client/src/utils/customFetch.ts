import { ZodError, z } from 'zod'
import { LANGIFY_LOCAL_STORAGE_KEY } from '../services/AuthService'
import {
  getLocalStorageValue,
  removeLocalStorageValue,
} from '../hooks/useLocalStorage'
import router from '../routes'

type RequestOptions = {
  params?: Record<string, string>
  init?: RequestInit
}

class ApiResponseValidationError extends Error {
  constructor(public validationErrors: ZodError) {
    super('API response validation failed')
  }
}

async function customFetch<T>(
  url: string,
  responseSchema: z.ZodType<T>,
  options?: RequestOptions
): Promise<z.infer<typeof responseSchema>> {
  try {
    let finalUrl = `${import.meta.env.VITE_BASE_API_URL}${url}`

    if (options?.params) {
      const params = new URLSearchParams(options.params).toString()
      finalUrl += `?${params}`
    }

    const token = getLocalStorageValue<string | null>(
      LANGIFY_LOCAL_STORAGE_KEY,
      null
    )

    const response = await fetch(finalUrl, {
      ...options?.init,
      headers: {
        ...options?.init?.headers,
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    })

    if (response.status === 401) {
      removeLocalStorageValue(LANGIFY_LOCAL_STORAGE_KEY)
      throw router.navigate({
        to: '/login',
      })
    }

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    const data = await response.json()

    const validatedData = responseSchema.parse(data)

    return validatedData as z.infer<typeof responseSchema>
  } catch (error) {
    console.error(error)
    if (error instanceof ZodError) {
      throw new ApiResponseValidationError(error)
    }
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }

  throw new Error('Unknown error')
}

export default customFetch
