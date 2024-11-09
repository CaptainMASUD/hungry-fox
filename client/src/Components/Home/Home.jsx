import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FoodList from '../FoodList/FoodList';
import Cart from '../Cart/Cart';
import AddsBanner from '../Adds banner/AddsBanner';
import HomePageBadges from '../HomePageBadges/HomePageBadges';
import FlashSales from '../Flashsales/FlashSales';

const Home = () => {
  const [cartItems, setCartItems] = useState([]);

  // Animation variants for page entrance
  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Animation variants for individual components
  const componentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <motion.div
      className="dark:bg-gray-900 bg-white min-h-screen"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      transition={{ type: 'spring', stiffness: 100, damping: 25 }}
    >
      {/* Adds Banner */}
      <motion.div variants={componentVariants}>
        <AddsBanner />
      </motion.div>

      {/* Home Page Badges */}
      <motion.div variants={componentVariants}>
        <HomePageBadges />
      </motion.div>

      {/* Flash Sales Section */}
      <motion.div variants={componentVariants}>
        <FlashSales />
      </motion.div>

      {/* Welcome Message with Colorful Text */}
      <motion.h1
        className="text-4xl font-extrabold text-center my-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Welcome to Our Restaurant
      </motion.h1>

      {/* Food List Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <FoodList setCartItems={setCartItems} />
      </motion.div>
    </motion.div>
  );
};

export default Home;
