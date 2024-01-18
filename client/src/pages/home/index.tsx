import { getAuthUser } from '../../services/AuthService'

const Home = () => {
  const user = getAuthUser()
  console.log('🤖 ~ user:', user)
  return <div>Home</div>
}

export default Home
