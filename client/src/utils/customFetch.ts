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
    let finalUrl = `${import.meta.env.VITE_BASE_API_URL}${url}`

    if (options?.params) {
      const params = new URLSearchParams(options.params).toString()
      finalUrl += `?${params}`
    }

    const response = await fetch(finalUrl, options?.init)

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    const data = await response.json()

    const validatedData = responseSchema.parse(data)

    return validatedData as z.infer<typeof responseSchema>
  } catch (error) {
    console.error(error)
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    if (error instanceof ZodError) {
      throw new ApiResponseValidationError(error)
    }
  }

  throw new Error('Unknown error')
}

export default customFetch
