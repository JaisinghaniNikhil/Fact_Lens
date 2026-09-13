import React, { useEffect, useState } from 'react'
import { User } from 'lucide-react'
import Modal from '../Components/Modal'
import axios from 'axios'

function Dashboard() {
  const [user, setUser] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState(null);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');

      const res = await axios.get('http://localhost:7900/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setUser(res.data);
    } catch (err) {
      alert(err?.response?.data?.message);
    }
  };
  

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 to-black text-white px-10 py-6'>
      
      {/* Header */}
      <div className='flex justify-between items-center border-b border-gray-700 pb-4'>
        <h2 className='text-3xl font-semibold tracking-wide'>
          Hey, <span className='text-blue-400'>{user?.fname}</span> 👋
        </h2>

        <div
          onClick={() => setIsOpen(true)}
          className='p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition cursor-pointer'
        >
          <User strokeWidth={1.5} size={28} />
        </div>
      </div>

      {/* Welcome Card */}
      <div className='mt-8 bg-gray-800 p-6 rounded-2xl shadow-lg'>
        <h3 className='text-xl font-medium mb-2'>Welcome to your Dashboard</h3>
        <p className='text-gray-400'>
          Manage your profile, view details, and explore your account.
        </p>
      </div>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className='text-white'>
          <h2 className='text-2xl font-semibold mb-6 text-center'>
            User Profile
          </h2>

          <div className='space-y-4'>

            <div className='flex justify-between border-b border-gray-700 pb-2'>
              <span className='text-gray-400'>Full Name</span>
              <span className='font-medium'>
                {`${user?.fname || ''} ${user?.lname || ''}`}
              </span>
            </div>

            <div className='flex justify-between border-b border-gray-700 pb-2'>
              <span className='text-gray-400'>Email</span>
              <span className='font-medium'>{user?.email}</span>
            </div>

            <div className='flex justify-between border-b border-gray-700 pb-2'>
              <span className='text-gray-400'>Phone</span>
              <span className='font-medium'>{user?.phone}</span>
            </div>

            <div className='flex justify-between border-b border-gray-700 pb-2'>
              <span className='text-gray-400'>Age</span>
              <span className='font-medium'>{user?.age}</span>
            </div>

          </div>

          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className='mt-6 w-full bg-blue-500 hover:bg-blue-600 transition py-2 rounded-lg font-medium'
          >
            Close
          </button>
        </div>
      </Modal>

    </div>
  )
}

export default Dashboard