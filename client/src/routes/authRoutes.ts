import { Route, lazyRouteComponent, redirect } from '@tanstack/react-router'
import rootRoute from './rootRoute'
import { getLocalStorageValue } from '../hooks/useLocalStorage'
import { LANGIFY_LOCAL_STORAGE_KEY } from '../services/AuthService'

const AuthLayout = lazyRouteComponent(() => import('../layouts/AuthLayout'))
const Login = lazyRouteComponent(() => import('../pages/auth/Login'))
const SignUp = lazyRouteComponent(() => import('../pages/auth/SignUp'))

const authRoute = new Route({
  getParentRoute: () => rootRoute,
  id: 'auth',
  component: AuthLayout,
  beforeLoad: () => {
    const token = getLocalStorageValue<string | null>(
      LANGIFY_LOCAL_STORAGE_KEY,
      null
    )
    if (token) {
      throw redirect({
        to: '/',
      })
    }
  },
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
