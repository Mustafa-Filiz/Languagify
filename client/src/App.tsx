import './App.css'
import LoadingSpinner from './components/LoadingSpinner'
import { Suspense } from 'react'
import { Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Outlet />
      <TanStackRouterDevtools />
      <ReactQueryDevtools initialIsOpen={false} />
    </Suspense>
  )
}

export default App
