import { Button } from '@nextui-org/react'
import { useLogout, useUser } from '../../services/AuthService'

const Home = () => {
  const { data: user } = useUser()
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
