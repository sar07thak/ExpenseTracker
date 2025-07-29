import React from 'react';

// Helper function to format dates into a more readable format (e.g., "29 Jul 2025")
const formatDate = (dateString) => {
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

// Helper function to format the amount into Indian Rupees (INR)
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0, // Optional: hide decimals for whole numbers
  }).format(amount);
};

const RecentTransaction = ({ recentTransactions }) => {
  // It's good practice to handle cases where the data might not be available yet
  if (!recentTransactions || recentTransactions.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Transactions</h2>
        <p className="text-gray-500">No recent transactions to display.</p>
      </div>
    );
  }

  return (
    // Main card container with white background, padding, rounded corners, and shadow
    <div className="bg-white p-6 rounded-xl shadow-lg">
      
      {/* Header section with title and "See All" link */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Recent Transactions</h2>
        <a href="#" className="text-sm font-semibold text-blue-500 hover:text-blue-700 transition-colors">
          See All →
        </a>
      </div>

      {/* List container: space-y-4 automatically adds margin between each transaction item */}
      <div className="space-y-4">
        {/* Map over the recentTransactions array to create a row for each item */}
        {recentTransactions.map((transaction) => (
          <div key={transaction._id} className="flex items-center justify-between">
            
            {/* Left side: Icon, Category, and Date */}
            <div className="flex items-center">
              {/* Icon container: A light gray circle */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 mr-4">
                <span className="text-xl">{transaction.icon}</span>
              </div>
              
              {/* Category and Date */}
              <div>
                <p className="font-semibold text-gray-700">{transaction.category}</p>
                <p className="text-sm text-gray-500">{formatDate(transaction.date)}</p>
              </div>
            </div>
            
            {/* Right side: Transaction Amount */}
            <p className={`font-semibold ${
                // Conditionally set text color to green for income, red for expense
                transaction.type === 'income' ? 'text-green-500' : 'text-red-500'
            }`}>
              {/* Prepend a '+' for income. The negative sign is handled automatically by formatCurrency. */}
              {transaction.type === 'income' ? `+${formatCurrency(transaction.amount)}` : formatCurrency(transaction.amount)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransaction;
