import { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Balance = () => {
  const [userId, setUserId] = useState('');
  const [balance, setBalance] = useState(null);

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const handleBalanceInquiry = async () => {
    try {
      const response = await axios.get(`https://mfs-server-three.vercel.app/balance/${userId}`);

      if (response.status === 200) {
        const userBalance = response.data.balance;
        setBalance(userBalance);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error('Failed to fetch balance');
      }
      setBalance(null);
    }
  };

  return (
    <div className="mx-auto max-w-md p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Balance Inquiry</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="userId" className="block text-sm font-medium text-gray-700">User ID:</label>
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={handleUserIdChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <button
          onClick={handleBalanceInquiry}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Check Balance
        </button>

        {balance !== null && (
          <div className="mt-4">
            <p className="text-lg font-semibold">Current Balance: {balance} Taka</p>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Balance;
