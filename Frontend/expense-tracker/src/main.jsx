import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ServerContext from './Context/ServerContext.jsx'
import UserContext from "../../expense-tracker/src/Context/UserContext.jsx"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ServerContext>
        <UserContext>
          <App />
        </UserContext>
      </ServerContext>
    </BrowserRouter>
  </StrictMode>,
)
