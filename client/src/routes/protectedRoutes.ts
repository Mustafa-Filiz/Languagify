import { Route, lazyRouteComponent, redirect } from '@tanstack/react-router'
import rootRoute from './rootRoute'
import { fetchUser } from '../services/AuthService'

const MainLayout = lazyRouteComponent(() => import('../layouts/MainLayout'))
const Home = lazyRouteComponent(() => import('../pages/home'))

const protectedRoutes = new Route({
  getParentRoute: () => rootRoute,
  id: 'protected',
  component: MainLayout,
  beforeLoad: async () => {
    const user = await fetchUser()
    console.log('🤖 ~ user:', user)

    if (!user) {
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
