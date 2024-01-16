import { Route, lazyRouteComponent } from '@tanstack/react-router'
import rootRoute from './rootRoute'

const AuthLayout = lazyRouteComponent(() => import('../layouts/AuthLayout'))
const Login = lazyRouteComponent(() => import('../pages/auth/Login'))
const SignUp = lazyRouteComponent(() => import('../pages/auth/SignUp'))

const authRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'auth',
  component: AuthLayout,
})

const loginRoute = new Route({
  getParentRoute: () => authRoute,
  path: 'login',
  component: Login,
})

const signUpRoute = new Route({
  getParentRoute: () => authRoute,
  path: 'sign-up',
  component: SignUp,
})

export { authRoute, loginRoute, signUpRoute }
