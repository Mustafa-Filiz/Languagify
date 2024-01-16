import { Suspense } from 'react'
import './App.css'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Outlet } from '@tanstack/react-router'
import LoadingSpinner from './components/shared/LoadingSpinner'

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Outlet />
      <TanStackRouterDevtools />
    </Suspense>
  )
}

export default App
