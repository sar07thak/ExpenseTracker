import React from 'react'
import { createContext } from 'react'


export const serverDataContext = createContext();

const ServerContext = ({children}) => {
  const serverUrl = "http://localhost:3000";
    return (
    <>
    <serverDataContext.Provider value={{serverUrl}}>
      {children}
    </serverDataContext.Provider>
    </>
  )
}

export default ServerContext