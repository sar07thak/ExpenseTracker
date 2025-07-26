import React, { useContext } from 'react'
import { userDataContext } from '../../Context/userContext';

const Home = () => {
  const {  userData , setUserData } = useContext(userDataContext);

  console.log("User Data:", userData?.user);

  return (
    <div>
      <h1>Welcome to the Expense Tracker</h1>
        <h3>{userData?.user?.name}</h3>
    </div>
  )
}

export default Home ;