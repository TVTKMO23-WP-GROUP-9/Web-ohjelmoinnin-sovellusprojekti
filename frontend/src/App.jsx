import React from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import '@css/styles.css'

function App() {

  return (
    <>
      <div>

        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>


      <h1>Tästä lähtee</h1>
      
      <p className="read-the-docs">
        Ding ding. 
      </p>
    </>
  )
}

export default App
