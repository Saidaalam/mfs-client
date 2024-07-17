import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet-async';

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('https://mfs-server-three.vercel.app/transaction', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 200) {
        setTransactions(response.data || []);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error('Failed to fetch transactions');
      }
    } 
  };

  return (
    <div className="mx-auto p-6 bg-white rounded-md shadow-md">
      
      <Helmet>
            <title>MFS | Transaction</title>
           </Helmet>
      <h2 className="text-3xl font-bold mb-8 text-center">Transactions History</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden text-center">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="py-2 px-3">Index</th>
              <th className="py-2 px-3">Date</th>
              <th className="py-2 px-3">Amount (Taka)</th>
              <th className="py-2 px-3">Type</th>
              <th className="py-2 px-3">Sender/Receiver</th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {transactions.map((transaction, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="py-3 px-3">{index + 1}</td>
                <td className="py-3 px-3">{transaction.date}</td>
                <td className="py-3 px-3">{transaction.amount}</td>
                <td className="py-3 px-3">{transaction.type}</td>
                <td className="py-3 px-3">{transaction.senderReceiver}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Transaction;
