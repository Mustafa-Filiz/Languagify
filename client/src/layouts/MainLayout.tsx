import { Image } from '@nextui-org/react'
import { Outlet } from '@tanstack/react-router'
import { useUser } from '../services/AuthService'

const MainLayout = () => {
  const { data } = useUser()
  console.log('🤖 ~ data:', data)
  return (
    <div className="flex items-center min-h-screen justify-evenly bg-spotify-l-black">
      <div className="flex flex-col items-center justify-center gap-4 p-4">
        <Image
          src="/langify.svg"
          width={200}
          height={200}
        />
        <h1 className="text-3xl tracking-widest text-spotify-l-gray">
          LANGIFY
        </h1>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout
