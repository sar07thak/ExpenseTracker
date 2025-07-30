import React from 'react';
import { FiTrendingDown } from "react-icons/fi";

// Helper function to format dates into a more readable format (e.g., "30 Jul 2025")
const formatDate = (dateString) => {
  if (!dateString || isNaN(new Date(dateString))) {
    return 'Invalid Date';
  }
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

// Helper function to format the amount into Indian Rupees (INR)
const formatCurrency = (amount) => {
  const numericAmount = typeof amount === 'number' ? amount : 0;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(numericAmount);
};

const ExpenseDashboard = ({ expenseData }) => {
  // A robust check to ensure the data is a valid array
  if (!Array.isArray(expenseData) || expenseData.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Expenses</h2>
        <p className="text-gray-500">No expenses to display.</p>
      </div>
    );
  }

  // Only take the first 5 items from the array
  const expensesToShow = expenseData.slice(0, 5);

  return (
    <div className="bg-white p-6 rounded-xl shadow-xl hover:-translate-y-1 transition-transform duration-300">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Expenses</h2>
        {/* Only show "See All" if there are more than 5 expenses */}
        {expenseData.length > 5 && (
            <a href="#" className="text-sm font-semibold text-blue-500 hover:text-blue-700 transition-colors">
              See All →
            </a>
        )}
      </div>

      {/* List of expenses */}
      <div className="space-y-2">
        {expensesToShow.map((expense, index) => {
          // Destructure with default values for safety - changed 'source' to 'category'
          const {
            _id,
            icon = '❓',
            category = 'Unspecified Source',
            date,
            amount = 0,
          } = expense;

          return (
            // Added hover effect, padding, and rounded corners to this container
            <div key={_id || index} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-200 transition-colors duration-200">
              {/* Left side: Icon, Category, and Date */}
              <div className="flex items-center">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 mr-4">
                  <span className="text-xl">{icon}</span>
                </div>
                <div>
                  {/* Changed 'source' to 'category' here as well */}
                  <p className="font-semibold text-gray-700">{category}</p>
                  <p className="text-sm text-gray-500">{formatDate(date)}</p>
                </div>
              </div>

              {/* Right side: Amount with trend icon */}
              <div className="flex items-center justify-center bg-red-100 text-red-600 font-semibold px-3 py-1 rounded-full">
                <FiTrendingDown className="mr-1" />
                {/* We remove the currency symbol from the formatted string for a cleaner look */}
                <span>{formatCurrency(amount).replace('₹', '')}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExpenseDashboard;
