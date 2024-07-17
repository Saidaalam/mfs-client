import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SendMoney = () => {
    const [formData, setFormData] = useState({
        senderId: '',
        receiverId: '',
        amount: '',
        pin: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://mfs-server-three.vercel.app/send-money', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                toast.success(`Money sent successfully. Transaction Fee: ${data.transactionFee} Taka`);
                setFormData({
                    senderId: '',
                    receiverId: '',
                    amount: '',
                    pin: ''
                });
            } else {
                const error = await response.json();
                toast.error(error.error);
            }
        } catch (error) {
            toast.error('Failed to send money');
        }
    };

    return (
        <div className="mx-auto max-w-md p-6 bg-white rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">Send Money</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="senderId" className="block text-sm font-medium text-gray-700">Sender ID:</label>
                    <input
                        type="text"
                        id="senderId"
                        name="senderId"
                        value={formData.senderId}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                <div>
                    <label htmlFor="receiverId" className="block text-sm font-medium text-gray-700">Receiver ID:</label>
                    <input
                        type="text"
                        id="receiverId"
                        name="receiverId"
                        value={formData.receiverId}
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
                    Send Money
                </button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default SendMoney;
