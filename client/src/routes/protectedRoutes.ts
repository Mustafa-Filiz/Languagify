import { Route, lazyRouteComponent, redirect } from '@tanstack/react-router'
import rootRoute from './rootRoute'
import { LANGIFY_LOCAL_STORAGE_KEY } from '../services/AuthService'
import { getLocalStorageValue } from '../hooks/useLocalStorage'

const MainLayout = lazyRouteComponent(() => import('../layouts/MainLayout'))
const Home = lazyRouteComponent(() => import('../pages/home'))

const protectedRoutes = new Route({
  getParentRoute: () => rootRoute,
  id: 'protected',
  component: MainLayout,
  beforeLoad: async () => {
    const token = getLocalStorageValue<string | null>(
      LANGIFY_LOCAL_STORAGE_KEY,
      null
    )
    if (!token) {
      throw redirect({
        to: '/login',
      })
    }
  },
})

const homeRoute = new Route({
  getParentRoute: () => protectedRoutes,
  path: '/',
  component: Home,
})

export { protectedRoutes, homeRoute }
