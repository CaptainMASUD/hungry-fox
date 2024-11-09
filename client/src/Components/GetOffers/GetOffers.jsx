import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { FaPercent, FaUtensils, FaIceCream, FaWineGlass } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function GetOffers() {
  const { currentUser } = useSelector((state) => state.user);
  const [token, setToken] = useState(null);
  const [lastTokenDate, setLastTokenDate] = useState(null);

  const couponCodes = ['#hungryfox#66', '#hungryfox12', '#hungryfox88', '#hungryfox44'];

  useEffect(() => {
    // Retrieve last token collection date from localStorage
    const savedDate = localStorage.getItem('lastTokenDate');
    if (savedDate) {
      setLastTokenDate(new Date(savedDate));
    }
  }, []);

  const collectToken = () => {
    const today = new Date();
    
    // Prevent collecting a token if already collected today
    if (lastTokenDate && lastTokenDate.toDateString() === today.toDateString()) {
      toast.warn('You can only collect one token per day. Come back tomorrow!');
    } else {
      const newToken = {
        id: 1,
        discount: Math.floor(Math.random() * 21) + 5, // Random discount between 5 and 25%
        couponCode: couponCodes[Math.floor(Math.random() * couponCodes.length)], // Random coupon code
      };
      setToken(newToken);
      setLastTokenDate(today);

      // Save the date of token collection in localStorage
      localStorage.setItem('lastTokenDate', today);

      // Show success toast
      toast.success('Token collected! Use it for a discount on your next purchase.');
    }
  };

  const categories = [
    { name: 'Appetizers', icon: FaUtensils },
    { name: 'Main Course', icon: FaUtensils },
    { name: 'Desserts', icon: FaIceCream },
    { name: 'Drinks', icon: FaWineGlass },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-indigo-100 p-6 dark:from-gray-900 dark:to-gray-800">
      {/* ToastContainer is required for the toast notifications to work */}
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={true} />

      <motion.div
        className="mb-8 rounded-2xl bg-gradient-to-r from-gray-600 to-indigo-600 p-8 text-white shadow-2xl"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-4xl font-bold">Delicious Deals Await!</h1>
        <p className="mt-4 text-lg">Savor the savings with our exclusive restaurant offers.</p>
      </motion.div>

      {currentUser ? (
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <button
            onClick={collectToken}
            className="bg-indigo-500 px-6 py-3 text-lg font-semibold text-white shadow-lg transition-all hover:bg-indigo-600 hover:shadow-xl rounded"
          >
            Collect Token
          </button>
          <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
            {token ? "You've collected a token for today!" : "Start collecting tokens for discounts!"}
          </p>
        </motion.div>
      ) : (
        <p className="mb-8 text-center text-lg text-gray-700 dark:text-gray-300">Sign in to unlock exclusive discounts and offers!</p>
      )}

      {token && (
        <div
          key={token.id}
          className="mb-12 overflow-hidden rounded-xl bg-white dark:bg-gray-700 shadow-lg"
        >
          <div className="flex items-center justify-between bg-gradient-to-r from-gray-500 to-indigo-500 p-4 text-white">
            <span className="text-2xl font-bold">{token.discount}% OFF</span>
            <FaPercent className="h-8 w-8" />
          </div>
          <div className="p-4 text-center">
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-300">Discount Token #{token.id}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Coupon Code: <span className="font-bold text-gray-500">{token.couponCode}</span></p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Valid for your next order</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {categories.map((category, index) => {
          const Icon = category.icon;
          return (
            <motion.div
              key={index}
              className="group overflow-hidden rounded-xl bg-white dark:bg-gray-700 shadow-lg transition-all hover:shadow-xl"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative h-40 bg-gradient-to-br from-gray-400 to-indigo-400 dark:from-gray-600 dark:to-indigo-600">
                <Icon className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 transform text-white transition-all group-hover:scale-110" />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-300">{category.name}</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Exclusive {category.name.toLowerCase()} deals</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
