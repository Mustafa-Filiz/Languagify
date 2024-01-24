import { ZodError, z } from 'zod'

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
    if (options?.params) {
      const params = new URLSearchParams(options.params).toString()
      url += `?${params}`
    }

    const response = await fetch(url, {
      ...options?.init,
      credentials: 'include',
    })

    if (response.status !== 200) {
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
