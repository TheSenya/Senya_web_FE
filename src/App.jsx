import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './login/Login'

function App() {
  const [count, setCount] = useState(0)
  
  return (
    <>
    <div>
      <div className="login-container">
        <h1>Senya</h1>
        <Login />
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <footer className="footer">
        <p>&copy; 2024 Senya. All rights reserved.</p>
      </footer>
      </div>
    </>
  )
}

export default App
