import { Router } from '@tanstack/react-router'
import rootRoute from './rootRoute'
import { authRoute, loginRoute, signUpRoute } from './authRoute'

const routeTree = rootRoute.addChildren([
  authRoute.addChildren([loginRoute, signUpRoute]),
])

const router = new Router({ routeTree })

export default router
