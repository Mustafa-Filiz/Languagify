import { NextUIProvider } from '@nextui-org/react'
import './App.css'
import { useNavigate } from 'react-router-dom'

function App() {
  const navigate = useNavigate()
  return (
    <NextUIProvider navigate={navigate}>
      <div className="App">
        <h1>Hello, world!</h1>
      </div>
    </NextUIProvider>
  )
}

export default App
