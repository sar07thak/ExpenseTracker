// Home.js

import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../../Components/Navbar';
import axios from 'axios';
import { serverDataContext } from '../../Context/ServerContext';

// Import icons (no CSS file needed)
import { FaWallet, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import RecentTransaction from '../../Components/RecentTransaction';

const Home = () => {
  const { serverUrl } = useContext(serverDataContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper function to format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleUserData = async () => {
    try {
      const response = await axios.get(`${serverUrl}/api/dashboard/`, { withCredentials: true });
      setUserData(response.data);
      console.log(response.data.recentTransactions);
    } catch (err) {
      console.error("Data can not be fetched", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleUserData();
  }, []);

  if (loading) {
    return <div><Navbar /><h1>Loading...</h1></div>;
  }

  return (
    <div>
      <Navbar />

      {userData && (
        <div className="p-8">
          {/* Stats Container */}
          <div className="mt-4 mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Total Balance Card */}
            <div className="flex items-center p-6 bg-white rounded-xl shadow-lg hover:-translate-y-1 transition-transform duration-300">
              <div className="flex justify-center items-center w-12 h-12 rounded-full bg-purple-500">
                <FaWallet size={22} className="text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Total Balance</p>
                <h3 className="text-2xl font-semibold text-gray-800">{formatCurrency(userData.totalBalance)}</h3>
              </div>
            </div>

            {/* Total Income Card */}
            <div className="flex items-center p-6 bg-white rounded-xl shadow-lg hover:-translate-y-1 transition-transform duration-300">
              <div className="flex justify-center items-center w-12 h-12 rounded-full bg-orange-500">
                <FaArrowUp size={22} className="text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Total Income</p>
                <h3 className="text-2xl font-semibold text-gray-800">{formatCurrency(userData.totalIncome)}</h3>
              </div>
            </div>

            {/* Total Expenses Card */}
            <div className="flex items-center p-6 bg-white rounded-xl shadow-lg hover:-translate-y-1 transition-transform duration-300">
              <div className="flex justify-center items-center w-12 h-12 rounded-full bg-red-500">
                <FaArrowDown size={22} className="text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Total Expenses</p>
                <h3 className="text-2xl font-semibold text-gray-800">{formatCurrency(userData.totalExpenses)}</h3>
              </div>
            </div>

          </div>
          
          {/* Your other components like Recent Transactions would go here */}
          <RecentTransaction recentTransactions = {userData.recentTransactions} />
          
        </div>
      )}
    </div>
  );
};

export default Home;