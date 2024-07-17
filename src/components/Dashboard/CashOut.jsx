import { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CashOut = () => {
  const [formData, setFormData] = useState({
    userId: '',
    agentId: '',
    amount: '',
    pin: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://mfs-server-three.vercel.app/user', formData);

      if (response.status === 200) {
        const data = response.data;
        toast.success(`Cash-out successful. Transaction Fee: ${data.cashOutFee} Taka`);
        setFormData({
          userId: '',
          agentId: '',
          amount: '',
          pin: ''
        });
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error('Failed to process cash-out');
      }
    }
  };

  return (
    <div className="mx-auto max-w-md p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Cash Out</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="userId" className="block text-sm font-medium text-gray-700">User ID:</label>
          <input
            type="text"
            id="userId"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="agentId" className="block text-sm font-medium text-gray-700">Agent ID:</label>
          <input
            type="text"
            id="agentId"
            name="agentId"
            value={formData.agentId}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount (Taka):</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="pin" className="block text-sm font-medium text-gray-700">PIN:</label>
          <input
            type="password"
            id="pin"
            name="pin"
            value={formData.pin}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cash Out
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CashOut;
