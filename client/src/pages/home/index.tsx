import { Button } from '@nextui-org/react'
import { useLogout, useUser } from '../../services/AuthService'
import { useSpotifyProfile } from '../../services/SpotifyService'

const Home = () => {
  const { data: user } = useUser()
  const { mutate: logout } = useLogout()

  const { data: spotifyProfile } = useSpotifyProfile()
  console.log('🤖 ~ spotifyProfile:', spotifyProfile)

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
      <Button
        color="success"
        onClick={() => {
          window.location.href = 'http://localhost:4000/api/spotify/connect'
        }}
      >
        Connect to Spotify
      </Button>
    </div>
  )
}

export default Home
