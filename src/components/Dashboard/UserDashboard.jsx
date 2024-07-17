import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserDashboard = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('https://mfs-server-three.vercel.app/user');
                if (response.ok) {
                    const data = await response.json();
                    setUsers(data);
                } else {
                    throw new Error('Failed to fetch users');
                }
            } catch (error) {
                toast.error(error.message);
            }
        };
        fetchUsers();
    }, []);

    const handleApprove = async (userId) => {
        try {
            const response = await fetch(`https://mfs-server-three.vercel.app/user/${userId}`, {
                method: 'PUT',
            });

            if (response.ok) {
                const updatedUsers = users.map(user =>
                    user._id === userId ? { ...user, status: 'approved', balance: user.balance + 40 } : user
                );
                setUsers(updatedUsers);
                toast.success('User approved and bonus applied');
            } else {
                throw new Error('Failed to approve user');
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-6">Users Information</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-200 text-gray-700">
                        <tr>
                            <th className="py-2 px-3 text-left">Index</th>
                            <th className="py-2 px-3 text-left">Name</th>
                            <th className="py-2 px-3 text-left">Email</th>
                            <th className="py-2 px-3 text-left">Status</th>
                            <th className="py-2 px-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600">
                        {users.map((user, index) => ( 
                            <tr key={user._id} className="border-b border-gray-200">
                                <td className="py-3 px-3">{index + 1}</td>
                                <td className="py-3 px-3">{user.name}</td>
                                <td className="py-3 px-3">{user.email}</td>
                                <td className="py-3 px-3">{user.status}</td>
                                <td className="py-3 px-3">
                                    {user.status === 'pending' && (
                                        <button
                                            onClick={() => handleApprove(user._id)}
                                            className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded focus:outline-none"
                                        >
                                            Approve
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ToastContainer />
        </div>
    );
};

export default UserDashboard;
