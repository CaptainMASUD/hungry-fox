import React, { useEffect, useState } from 'react';
import { Badge, Button, Select } from 'flowbite-react'; 
import { FiClock } from 'react-icons/fi';
import flashSaleGif1 from '../../Images/Flashsales/flash.gif'; 
import sales from '../../Images/Flashsales/sales.gif'; 
import flashSaleGif2 from '../../Images/Flashsales/flash.gif'; 
import spicyburger from "../../Images/Flashsales/sb.jpg";
import Pepperoni_Pizza from "../../Images/Flashsales/pepa.jpg";
import Vegan_Salad_Bowl from "../../Images/Flashsales/salad.jpg";


function FlashSales() {
  const [flashSaleItems, setFlashSaleItems] = useState([
    {
      id: 1,
      name: 'Spicy Chicken Burger',
      imageUrl: spicyburger,
      discount: 20, 
      originalPrice: 500, 
      category: 'Burger', 
      timeRemaining: 81323, 
    },
    {
      id: 2,
      name: 'Pepperoni Pizza',
      imageUrl: Pepperoni_Pizza,
      discount: 30, 
      originalPrice: 700, 
      category: 'Pizza',
      timeRemaining: 17110,
    },
    {
      id: 3,
      name: 'Vegan Salad Bowl',
      imageUrl: Vegan_Salad_Bowl,
      discount: 15, 
      originalPrice: 400, 
      category: 'Salad',
      timeRemaining: 54359, 
    },
  ]);

  const categories = ['All', 'Burger', 'Pizza', 'Salad']; 

  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredItems = selectedCategory === 'All' 
    ? flashSaleItems 
    : flashSaleItems.filter(item => item.category === selectedCategory);

  const calculateDiscountedPrice = (originalPrice, discount) => {
    return originalPrice - (originalPrice * discount) / 100;
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setFlashSaleItems((prevItems) => {
        return prevItems.map((item) => ({
          ...item,
          timeRemaining: item.timeRemaining > 0 ? item.timeRemaining - 1 : 0, 
        }));
      });
    }, 1000);

    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="container mx-auto py-8 p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">Flash Sales</h2>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-8">Exclusive deals for a limited time only. Don't miss out!</p>

      <div className="flex justify-center mb-8">
        <Select
          onChange={(e) => setSelectedCategory(e.target.value)}
          value={selectedCategory}
          className="w-1/3"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>
      </div>

      <div className="flex justify-center gap-4 mb-8">
        <img src={flashSaleGif1} alt="Flash Sale 1" className="w-1/2 h-auto rounded-lg shadow-md" />
        <img src={sales} alt="Flash Sale 2" className="w-1/2 h-auto rounded-lg shadow-md" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredItems.map((item) => {
          const discountedPrice = calculateDiscountedPrice(item.originalPrice, item.discount);
          return (
            <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden relative">
              <Badge color="red" className="absolute top-2 left-2 text-sm font-bold">
                {item.discount}% OFF
              </Badge>
              
              <div className="absolute top-2 right-2 flex items-center bg-red-500 text-white rounded-full px-3 py-1 text-xs font-semibold">
                <FiClock className="mr-1" />
                {formatTime(item.timeRemaining)}
              </div>
              
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-40 object-cover transition-transform duration-300 hover:scale-105"
              />
              
              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{item.name}</h3>
                
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{item.category}</p>

                <div className="flex justify-center items-center mb-4">
                  <span className="text-xl font-bold text-red-900 dark:text-white line-through mr-2">
                    &#2547; {item.originalPrice}
                  </span>
                  <span className="text-2xl font-semibold text-green-500">
                    &#2547; {discountedPrice.toFixed(2)}
                  </span>
                </div>
                
                <Button
                  onClick={() => console.log(`Navigating to ${item.name}...`)}
                  gradientDuoTone='purpleToPink'
                  outline
                  className="mt-4 w-full"
                >
                  Shop Now
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FlashSales;
