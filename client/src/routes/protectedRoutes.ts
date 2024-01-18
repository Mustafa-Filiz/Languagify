import { Route, lazyRouteComponent, redirect } from '@tanstack/react-router'
import rootRoute from './rootRoute'
import { getAuthUser } from '../services/AuthService'

const Home = lazyRouteComponent(() => import('../pages/home'))

const protectedRoutes = new Route({
  getParentRoute: () => rootRoute,
  id: 'protected',
  component: () => null,
  beforeLoad: async () => {
    const authUser = getAuthUser()
    if (!authUser) {
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
