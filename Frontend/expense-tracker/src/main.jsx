import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ServerContext from './Context/ServerContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ServerContext>
        <App />
      </ServerContext>
    </BrowserRouter>
  </StrictMode>,
)
