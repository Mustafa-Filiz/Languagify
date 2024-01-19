import { Button } from '@nextui-org/react'
import { getAuthUser, useLogout } from '../../services/AuthService'

const Home = () => {
  const user = getAuthUser()
  console.log('🤖 ~ user:', user)
  const { mutate: logout } = useLogout()
  return (
    <div className="text-white">
      <h1>Home</h1>
      <p>Welcome {user?.firstName}</p>
      <Button
        color="danger"
        onClick={() => {
          logout()
        }}
      >
        Logout
      </Button>
    </div>
  )
}

export default Home
