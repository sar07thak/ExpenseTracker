import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../../Components/Navbar';
import axios from 'axios';
import { serverDataContext } from '../../Context/ServerContext';

// Import child components
import RecentTransaction from '../../Components/RecentTransaction'; // Assuming it's in the same folder
// import FinancialOverview from '../../Components/FinancialOverview'; // The new chart component

// Import icons for stat cards
import { FaWallet, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import FinancialOverview from '../../Components/FinancialOverview';

const Home = () => {
  const { serverUrl } = useContext(serverDataContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper function for stat cards
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleUserData = async () => {
    try {
      const response = await axios.get(`${serverUrl}/api/dashboard/`, { withCredentials: true });
      console.log(response.data)
      setUserData(response.data);
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
        <div className="p-8 bg-gray-50 min-h-screen"> 
          {/* Top Stat Cards */}
          <div className="mt-4 mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Balance, Income, Expense cards go here... */}
            <div className="flex items-center p-6 bg-white rounded-xl shadow-lg hover:-translate-y-1 transition-transform duration-300">
              <div className="flex justify-center items-center w-12 h-12 rounded-full bg-purple-500"><FaWallet size={22} className="text-white" /></div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Total Balance</p>
                <h3 className="text-2xl font-semibold text-gray-800">{formatCurrency(userData.totalBalance)}</h3>
              </div>
            </div>
            <div className="flex items-center p-6 bg-white rounded-xl shadow-lg hover:-translate-y-1 transition-transform duration-300">
              <div className="flex justify-center items-center w-12 h-12 rounded-full bg-orange-500"><FaArrowUp size={22} className="text-white" /></div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Total Income</p>
                <h3 className="text-2xl font-semibold text-gray-800">{formatCurrency(userData.totalIncome)}</h3>
              </div>
            </div>
            <div className="flex items-center p-6 bg-white rounded-xl shadow-lg hover:-translate-y-1 transition-transform duration-300">
              <div className="flex justify-center items-center w-12 h-12 rounded-full bg-red-500"><FaArrowDown size={22} className="text-white" /></div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Total Expenses</p>
                <h3 className="text-2xl font-semibold text-gray-800">{formatCurrency(userData.totalExpenses)}</h3>
              </div>
            </div>
          </div>

          {/* Main content area with two-column grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            
            {/* Left Column: Recent Transactions (takes up 3/5 of the width on large screens) */}
            <div className="lg:col-span-3">
              <RecentTransaction recentTransactions={userData.recentTransactions} />
            </div>

            {/* Right Column: Financial Overview (takes up 2/5 of the width on large screens) */}
            <div className="lg:col-span-2">
              <FinancialOverview />
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
