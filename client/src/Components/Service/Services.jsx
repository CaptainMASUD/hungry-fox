import React, { useState } from 'react';
import { FaTruck, FaBirthdayCake, FaUtensils, FaCoffee } from 'react-icons/fa'; 
import { motion } from 'framer-motion';
import { Button, Tooltip } from 'flowbite-react'; 
import Catering from "../../Images/ServiceImage/cat.jpg" 
import Food_Delivery from "../../Images/ServiceImage/food.jpg" 
import dine from "../../Images/ServiceImage/dine.webp"
import Specialty_Coffee from "../../Images/ServiceImage/coffie.webp"


function Services() {
  const [selectedService, setSelectedService] = useState(null); // Track which service is selected

  const services = [
    {
      id: 1,
      icon: <FaTruck />,
      title: "Food Delivery",
      description: "Fast and reliable delivery service so you can enjoy your favorite meals at home.",
      details: "We offer quick food delivery service to ensure that your food reaches you fresh and hot. Our delivery personnel are trained to deliver within the promised time frame, ensuring an excellent experience every time.",
      image: Food_Delivery
    },
    {
      id: 2,
      icon: <FaBirthdayCake />,
      title: "Catering",
      description: "Let us handle your event with our exceptional catering services for any occasion.",
      details: "Our catering services are perfect for weddings, corporate events, and private parties. We provide a range of menus to suit your event’s theme and can tailor them to fit your specific needs.",
      image: Catering
    },
    {
      id: 3,
      icon: <FaUtensils />,
      title: "Dine-In",
      description: "Enjoy a cozy dining experience with our delicious meals served in a relaxed setting.",
      details: "Our dine-in experience offers a comfortable ambiance where you can relax and enjoy freshly prepared meals. Whether you're here for a casual meal or a special occasion, we ensure a memorable dining experience.",
      image: dine
    },
    {
      id: 4,
      icon: <FaCoffee />,
      title: "Specialty Coffee",
      description: "Indulge in freshly brewed specialty coffee to accompany your meal or enjoy on its own.",
      details: "Our specialty coffee is made from freshly roasted beans and brewed to perfection. We offer a variety of coffee drinks, including espressos, lattes, cappuccinos, and more. Enjoy your coffee in-house or take it with you.",
      image: Specialty_Coffee
    }
  ];

  return (
    <div className="py-16 p-5 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-12">
          Our Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {services.map((service) => (
            <motion.div
              key={service.id}
              className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 flex flex-col items-center text-center transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              whileHover={{ opacity: 0.8 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="text-4xl text-indigo-600 dark:text-purple-400 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {service.icon}
              </motion.div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {service.description}
              </p>
              <Tooltip content="Click to view more details!" placement="top">
                <button
                  className="text-indigo-600 dark:text-purple-400 hover:underline"
                  onClick={() => setSelectedService(service.id)}
                >
                  Learn More
                </button>
              </Tooltip>
            </motion.div>
          ))}
        </div>

        {/* Show Details of Selected Service */}
        {selectedService && (
          <div className="mt-12 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
            <div className="flex items-center gap-8">
              <img
                src={services.find((service) => service.id === selectedService).image}
                alt={services.find((service) => service.id === selectedService).title}
                className="w-1/2 rounded-lg shadow-lg"
              />
              <div className="w-1/2 text-gray-800 dark:text-white">
                <h3 className="text-2xl font-semibold mb-4">
                  {services.find((service) => service.id === selectedService).title} - Details
                </h3>
                <p className="text-lg mb-4">
                  {services.find((service) => service.id === selectedService).details}
                </p>
               <div className='flex justify-center'>
               <Button
                gradientDuoTone='pinkToOrange'
                outline
                  onClick={() => setSelectedService(null)}
                  className=" bg-red-500 text-white rounded-lg hover:bg-red-600 w-24"
                >
                  Close
                </Button>
               </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Services;
