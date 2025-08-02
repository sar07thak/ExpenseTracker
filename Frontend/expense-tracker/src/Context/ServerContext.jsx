import React from 'react'
import { createContext } from 'react'


export const serverDataContext = createContext();

const ServerContext = ({children}) => {
  const serverUrl = "https://expensetracker-m38v.onrender.com";
    return (
    <>
    <serverDataContext.Provider value={{serverUrl}}>
      {children}
    </serverDataContext.Provider>
    </>
  )
}

export default ServerContext