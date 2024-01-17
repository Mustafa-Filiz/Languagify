import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from '@tanstack/react-router'
import router from './routes'
import { NextUIProvider } from '@nextui-org/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const queryClient = new QueryClient()

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <NextUIProvider>
          <RouterProvider router={router} />
        </NextUIProvider>
      </QueryClientProvider>
    </React.StrictMode>
  )
}
