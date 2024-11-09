// src/components/Slider.js
import React from 'react';
import { FaTimes, FaPlus, FaMinus, FaTrash } from 'react-icons/fa'; // Import required icons

const Slider = ({ isOpen, onClose, items, onRemove, onIncrease, onDecrease }) => {
  return (
    <div 
      className={`fixed top-0 right-0 w-96 h-full bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
    >
      <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
        <h2 className="text-lg font-bold dark:text-white">Cart Items</h2>
        <button onClick={onClose}>
          <FaTimes className="text-xl dark:text-white" />
        </button>
      </div>
      <div className="p-4">
        {items.length > 0 ? (
          <ul className="space-y-2">
            {items.map((item) => (
              <li key={item.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <img src={item.imageUrl} alt={item.name} className="h-12 w-12 object-cover rounded mr-2" />
                  <div>
                    <p className="font-medium dark:text-white">{item.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{item.price} BDT</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <button className="text-gray-600 dark:text-gray-300" onClick={() => onDecrease(item.id)}>
                    <FaMinus />
                  </button>
                  <span className="mx-2 dark:text-white">{item.quantity}</span> {/* Show the actual quantity */}
                  <button className="text-gray-600 dark:text-gray-300" onClick={() => onIncrease(item.id)}>
                    <FaPlus />
                  </button>
                  <button className="text-red-500 ml-2" onClick={() => onRemove(item.id)}>
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center dark:text-gray-400">Your cart is empty.</p>
        )}
      </div>
      {items.length > 0 && (
        <div className="p-4 border-t dark:border-gray-700">
          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-500 transition duration-300">
            Continue
          </button>
        </div>
      )}
    </div>
  );
};

export default Slider;
