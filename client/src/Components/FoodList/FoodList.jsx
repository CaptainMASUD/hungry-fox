import React, { useState, useEffect } from 'react';
import { FiShoppingCart, FiStar, FiEye, FiFilter } from 'react-icons/fi';
import { Badge, Spinner } from 'flowbite-react';
import { fetchAllFoodItems } from '../services/Api';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../Redux/CartSlice/cartSlice';
import { ToastContainer, toast } from 'react-toastify';
import { motion } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';
import { MdRestaurantMenu } from "react-icons/md";

function FoodList() {
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState(''); // Filter state for sorting
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    const loadFoods = async () => {
      try {
        const data = await fetchAllFoodItems();
        const foodsWithRatings = data.map(food => ({
          ...food,
          rating: (Math.random() * (5 - 4) + 4).toFixed(1),
        }));
        setFoods(foodsWithRatings);
        setFilteredFoods(foodsWithRatings);
        setLoading(false);
      } catch (err) {
        setError('Failed to load food items. Please try again later.');
        setLoading(false);
      }
    };

    loadFoods();
  }, []);

  const handleAddItem = (food) => {
    const existingItem = cartItems.find(item => item.id === food.id);
    if (existingItem) {
      toast.info(`"${food.name}" is already in your cart!`, { autoClose: 2000 });
    } else {
      dispatch(addItem(food));
      toast.success(`Added "${food.name}" to your cart!`, { autoClose: 2000 });
    }
  };

  const handleFilterChange = (e) => {
    const selectedFilter = e.target.value;
    setFilter(selectedFilter);

    let sortedFoods = [...foods];
    if (selectedFilter === 'price-low-high') {
      sortedFoods.sort((a, b) => a.price - b.price);
    } else if (selectedFilter === 'price-high-low') {
      sortedFoods.sort((a, b) => b.price - a.price);
    } else if (selectedFilter === 'name') {
      sortedFoods.sort((a, b) => a.name.localeCompare(b.name));
    } else if (selectedFilter === 'category') {
      sortedFoods.sort((a, b) => a.category.localeCompare(b.category));
    }

    setFilteredFoods(sortedFoods);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
        >
          <Spinner size="xl" />
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 text-xl mt-10">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnHover draggable />

      {/* Filter Dropdown */}
      <div className="flex justify-end mb-6">
        <div className="flex items-center space-x-2 dark:text-gray-200">
          <FiFilter className="text-2xl" />
          <select
            className="p-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-200"
            value={filter}
            onChange={handleFilterChange}
          >
            <option value="">Sort by</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
            <option value="name">Name</option>
            <option value="category">Category</option>
          </select>
        </div>
      </div>

      {/* "Our Menu" Header */}
      <div className='grid place-items-center'>
        <motion.h2
          className="text-3xl font-bold mb-6 text-center flex"
          animate={{ color: ["#8b5cf6", "#ec4899", "#fb923c"] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        >
          <motion.span className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-transparent bg-clip-text">
            <MdRestaurantMenu className='mt-1' />
          </motion.span>
          <span className="text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text">
            Our Menu
          </span>
          <motion.span className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-transparent bg-clip-text">
            <MdRestaurantMenu className='mt-1' />
          </motion.span>
        </motion.h2>
      </div>

      {/* Food List */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filteredFoods.map((food) => (
          <motion.div
            key={food.id}
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden transition-all"
          >
            <div className="relative group">
              <img
                src={food.imageUrl || '/placeholder.svg?height=150&width=150'}
                alt={food.name}
                className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white">
                <button className="flex items-center text-sm font-semibold">
                  <FiEye className="mr-2" />
                  View Details
                </button>
              </div>
              <Badge color="yellow" className="absolute top-2 right-2">
                <FiStar className="inline-block mr-1" /> {food.rating}
              </Badge>
              <Badge color="green" className="absolute bottom-2 left-2 text-xs px-2 py-1">
                {food.category}
              </Badge>
            </div>
            <div className="p-4">
              <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white mb-2 truncate">
                {food.name}
              </h5>
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  <span> &#2547; </span>{food.price.toFixed(2)}
                </span>
              </div>
              <button
                onClick={() => handleAddItem(food)}
                className="w-full flex items-center justify-center text-gray-900 hover:text-gray-100 dark:text-white font-semibold rounded-lg border-2 border-gradient-to-r from-purple-500 to-indigo-500 p-2 
                transition-all hover:bg-black hover:border-transparent"
              >
                <FiShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default FoodList;
