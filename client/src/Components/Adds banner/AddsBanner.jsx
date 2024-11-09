import React from 'react'
import { Carousel } from 'flowbite-react'
import { FiShoppingCart, FiHeart } from 'react-icons/fi'
import banner1 from "../../Images/Banner Images/Black Orange Modern Food Promotion Banner.png" // Make sure the file extension is correct

function AddsBanner() {
  return (
    <div className="w-full h-[500px]">
      <Carousel className="w-full h-full">
        
        {/* Slide 1 - Using banner1 */}
        <div
          className="w-full h-full bg-cover bg-center relative"
          style={{ backgroundImage: `url(${banner1})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white space-y-4">
              <h2 className="text-4xl font-bold">Pizza</h2>
              <p className="text-lg">Category: Italian | Price: &#2547; 999/-</p>
              <div className="flex justify-center space-x-4">
                <button className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center">
                  <FiHeart size={20} className="mr-2" />
                  Like
                </button>
                <button className="text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg flex items-center">
                  <FiShoppingCart size={20} className="mr-2" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 2 */}
        <div
          className="w-full h-full bg-cover bg-center relative"
          style={{ backgroundImage: 'url(https://via.placeholder.com/1600x900)' }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white space-y-4">
              <h2 className="text-4xl font-bold">Burger</h2>
              <p className="text-lg">Category: American | Price: $8.49</p>
              <div className="flex justify-center space-x-4">
                <button className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center">
                  <FiHeart size={20} className="mr-2" />
                  Like
                </button>
                <button className="text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg flex items-center">
                  <FiShoppingCart size={20} className="mr-2" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 3 */}
        <div
          className="w-full h-full bg-cover bg-center relative"
          style={{ backgroundImage: 'url(https://via.placeholder.com/1600x900)' }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white space-y-4">
              <h2 className="text-4xl font-bold">Pasta</h2>
              <p className="text-lg">Category: Italian | Price: $10.50</p>
              <div className="flex justify-center space-x-4">
                <button className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center">
                  <FiHeart size={20} className="mr-2" />
                  Like
                </button>
                <button className="text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg flex items-center">
                  <FiShoppingCart size={20} className="mr-2" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 4 */}
        <div
          className="w-full h-full bg-cover bg-center relative"
          style={{ backgroundImage: 'url(https://via.placeholder.com/1600x900)' }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white space-y-4">
              <h2 className="text-4xl font-bold">Sushi</h2>
              <p className="text-lg">Category: Japanese | Price: $15.99</p>
              <div className="flex justify-center space-x-4">
                <button className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center">
                  <FiHeart size={20} className="mr-2" />
                  Like
                </button>
                <button className="text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg flex items-center">
                  <FiShoppingCart size={20} className="mr-2" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </Carousel>
    </div>
  )
}

export default AddsBanner