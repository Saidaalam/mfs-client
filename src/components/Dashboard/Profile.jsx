import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet-async';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const response = await axios.get('https://mfs-server-three.vercel.app/user', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 200) {
        setProfileData(response.data);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error('Failed to fetch profile data');
      }
    }
  };

  if (!profileData) {
    return <div>Loading...</div>;
  }
  return (
    <div className="mx-auto max-w-5xl p-6 bg-white rounded-md shadow-md">
         <Helmet>
            <title>MFS | Profile</title>
           </Helmet>
      <h2 className="text-2xl font-bold mb-4 text-center">User Profile</h2>
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
                        {profileData.map((user, index) => ( 
                            <tr key={user._id} className="border-b border-gray-200">
                                <td className="py-3 px-3">{index + 1}</td>
                                <td className="py-3 px-3">{user.name}</td>
                                <td className="py-3 px-3">{user.email}</td>
                                <td className="py-3 px-3">{user.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
      <ToastContainer />
    </div>
  );
};

export default Profile;
