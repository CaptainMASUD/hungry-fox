import React from 'react';
import { FiTruck, FiShield, FiClock, FiThumbsUp } from 'react-icons/fi';
import { motion } from 'framer-motion';

function HomePageBadges() {
  const badges = [
    { icon: <FiThumbsUp />, label: 'Best Quality', color: 'text-green-400' },
    { icon: <FiClock />, label: 'Fast Delivery', color: 'text-blue-400' },
    { icon: <FiShield />, label: 'Secure Payment', color: 'text-yellow-400' },
    { icon: <FiTruck />, label: 'Easy Returns', color: 'text-purple-400' },
  ];

  return (
    <div className="flex justify-center items-center py-10">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
        {badges.map((badge, index) => (
          <motion.div
            key={index}
            className="group flex items-center justify-center space-x-2 p-2 rounded-lg border   dark:hover:bg-transparent dark:hover:border-purple-500 dark:shadow-md  border-purple-500 transition-all hover:bg-purple-500 hover:border-transparent dark:bg-gray-800 dark:border-transparent"
          >
            <span className={`text-3xl ${badge.color} group-hover:text-white`}>
              {badge.icon}
            </span>
            <span className="text-gray-700 font-semibold dark:text-gray-200 group-hover:text-white">
              {badge.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default HomePageBadges;
