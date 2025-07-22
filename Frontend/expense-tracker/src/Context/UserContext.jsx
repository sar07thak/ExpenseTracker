import React, { createContext, useContext, useEffect, useState } from 'react'
import { serverDataContext } from './ServerContext';
import axios from 'axios';

export const userDataContext = createContext();

const UserContext = ({children}) => {

    const { serverUrl } = useContext(serverDataContext);
    const [ userData , setUserData ] = useState(null);

    const getCurrentUser = async ( ) => {
        try{
            const response = await axios.get(`${serverUrl}/api/user/getUser` , { withCredentials: true });
            console.log("Current User Data:", response.data);
            setUserData(response.data);

        }catch(error) {
            console.error("Error fetching current user:", error);
        }
    }

    useEffect(() => {
        getCurrentUser();
    },[]);

    const value = {
        userData , setUserData , getCurrentUser
    }
  return (
    <div>
        <userDataContext.Provider value={value} >
            {
                children
            }
        </userDataContext.Provider>
    </div>
  )
}

export default UserContext ;