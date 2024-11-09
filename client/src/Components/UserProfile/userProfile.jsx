import React, { useEffect, useState } from 'react';
import { FaUserCircle, FaTruck, FaSignOutAlt, FaClock, FaShippingFast, FaCheckCircle } from 'react-icons/fa'; // Add icons for statuses
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../Redux/UserSlice/userSlice';
import axios from 'axios';
import { Spinner } from 'flowbite-react';
import { toast } from 'react-toastify';

// Import order status images
import pendingImage from "../../Images/Order icons/pending.svg";
import onTheWayImage from "../../Images/Order icons/on the way.png";
import completedImage from "../../Images/Order icons/completed.png";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';  // Import framer-motion

function UserProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout());
    navigate('/')
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:12005/api/orders', {
          withCredentials: true,
        });
        setOrders(response.data);
      } catch (error) {
        toast.error("Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Status styles function to include animated background for "In-Delivery"
  const getStatusStyles = (status) => {
    switch (status) {
      case 'Pending':
        return { text: 'text-purple-500', icon: <FaClock className="text-purple-500 mr-2" /> };
      case 'In-Delivery':
        return { 
          text: 'text-orange-500', 
          icon: <FaShippingFast className="text-orange-500 mr-2" />,
          gradient: {
            initial: 'bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500',
            animate: 'bg-gradient-to-r from-pink-500 via-indigo-500 to-purple-500'
          }
        };
      case 'Completed':
        return { text: 'text-green-500', icon: <FaCheckCircle className="text-green-500 mr-2" /> };
      default:
        return { text: '', icon: null };
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-800">
      {/* Sidebar */}
      <div className="w-1/4 bg-white dark:bg-gray-900 p-4 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
        <div className="flex flex-col">
          <button 
            className="py-2 px-4 text-left hover:bg-gray-200 dark:hover:bg-gray-700 transition" 
            onClick={() => setActiveTab('profile')}
          >
            <FaUserCircle className="inline-block mr-2" /> Profile
          </button>
          <button 
            className="py-2 px-4 text-left hover:bg-gray-200 dark:hover:bg-gray-700 transition" 
            onClick={() => setActiveTab('orders')}
          >
            <FaTruck className="inline-block mr-2" /> My Orders
          </button>
          <button
            className="py-2 px-4 text-left hover:bg-gray-200 dark:hover:bg-gray-700 transition" 
            onClick={handleLogout}
          >
            <FaSignOutAlt className="inline-block mr-2" /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {activeTab === 'profile' ? (
          <div className="max-w-md w-full bg-white dark:bg-gray-900 shadow-lg rounded-lg p-6 text-center mb-4">
            <div className="flex flex-col items-center mb-4">
              <FaUserCircle className="text-6xl text-gray-600 dark:text-gray-300 mb-2" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{currentUser.username}</h3>
            </div>
          </div>
        ) : (
          <div  > 
            <h2 className="text-2xl font-bold mb-4">Your Order Status</h2>
            {loading ? (
              <Spinner />
            ) : orders.length === 0 ? (
              <p>No orders found.</p>
            ) : (
              <ul>
                {orders.map((order) => {
                  const { text, icon, gradient } = getStatusStyles(order.status);
                  return (
                    <li key={order.id} className="mb-4 border p-4 rounded flex items-start">
                      {/* Status Image aligned to the top left */}
                      {/* Order Details aligned to the right of the image */}
                      <div className="flex-1">
                        <h3 className="font-semibold">Order ID: {order.id}</h3>
                        <p>Total Amount: ৳{parseFloat(order.totalAmount).toFixed(2)}</p>
                        <p>Food Items: {JSON.parse(order.foodItems).map(item => `${item.name} x${item.sliderQuantity}`).join(', ')}</p>
                        <p>Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                        <div className={`flex items-center font-semibold ${text}`}>
                          {icon}
                          <span>{order.status}</span>
                        </div>
                      </div>
                      <div className="mr-4">
                        {order.status === 'Pending' && <img src={pendingImage} alt="Pending" className="w-24 h-24" />}
                        {order.status === 'In-Delivery' && (
                          <motion.div
                            className={`w-24 h-24 rounded-lg ${gradient.initial} animate-gradient-x`} // Animated gradient for In-Delivery
                            initial={{ backgroundPosition: '0% 50%' }}
                            animate={{
                              backgroundPosition: '100% 50%',
                              transition: {
                                repeat: Infinity,
                                repeatType: 'loop',
                                duration: 5,
                                ease: 'linear',
                              },
                            }}
                          >
                            <img src={onTheWayImage} alt="In Delivery" className="w-full h-full object-cover rounded-lg" />
                          </motion.div>
                        )}
                        {order.status === 'Completed' && <img src={completedImage} alt="Completed" className="w-24 h-24" />}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
