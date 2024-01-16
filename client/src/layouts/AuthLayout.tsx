import { Outlet } from '@tanstack/react-router'

const AuthLayout = () => {
  return (
    <div className="bg-spotify bg-cover">
      <Outlet />
    </div>
  )
}

export default AuthLayout
