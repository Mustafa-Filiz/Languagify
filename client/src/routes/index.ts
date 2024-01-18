import { Router } from '@tanstack/react-router'
import rootRoute from './rootRoute'
import { authRoute, loginRoute, signUpRoute } from './authRoutes'
import { homeRoute, protectedRoutes } from './protectedRoutes'

const routeTree = rootRoute.addChildren([
  authRoute.addChildren([loginRoute, signUpRoute]),
  protectedRoutes.addChildren([homeRoute]),
])

const router = new Router({ routeTree })

export default router
