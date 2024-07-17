import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Overview = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('https://mfs-server-three.vercel.app/user', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 200) {
        setUserData(response.data);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error('Failed to fetch user data');
      }
    } 
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-6">Users Overview</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-200 text-gray-700">
                        <tr>
                            <th className="py-2 px-3 text-left">Index</th>
                            <th className="py-2 px-3 text-left">Name</th>
                            <th className="py-2 px-3 text-left">Email</th>
                            <th className="py-2 px-3 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600">
                        {userData.map((user, index) => ( 
                            <tr key={user._id} className="border-b border-gray-200">
                                <td className="py-3 px-3">{index + 1}</td>
                                <td className="py-3 px-3">{user.name}</td>
                                <td className="py-3 px-3">{user.email}</td>
                                <td className="py-3 px-3">{user.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ToastContainer />
        </div>
  );
};

export default Overview;
