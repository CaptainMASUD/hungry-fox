import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { GiFox } from 'react-icons/gi';
import { Accordion } from 'flowbite-react';  // Importing Accordion component from Flowbite

function Footer() {
  return (
    <div>
      {/* Divider Section */}
      <div className="border-t border-gray-300 dark:border-gray-700"></div>

      {/* Footer Section */}
      <footer className="bg-transparent dark:bg-gray-900 text-gray-800 dark:text-white py-6">
        <div className="w-full flex flex-col md:flex-row justify-between items-center">
          {/* Footer left section with company name as a Link */}
          <div className="text-center md:text-left">
            <Link to="/" className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold flex">
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">Hungry</span>
              <GiFox className="mt-2 text-2xl text-gray-800 dark:text-white" />
            </Link>
            <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">© 2024 Hungry. All rights reserved.</p>
          </div>

          {/* Footer middle section (links) */}
          <div className="flex flex-wrap justify-center md:justify-start">
            <Link to="/aboutus" className="mx-2 text-sm text-gray-800 hover:text-indigo-500 dark:text-white dark:hover:text-indigo-300">About Us</Link>
            <Link to="/service" className="mx-2 text-sm text-gray-800 hover:text-indigo-500 dark:text-white dark:hover:text-indigo-300">Services</Link>
            <Link to="/contactus" className="mx-2 text-sm text-gray-800 hover:text-indigo-500 dark:text-white dark:hover:text-indigo-300">Contact</Link>
          </div>

          {/* Footer right section (social icons) */}
          <div className="flex space-x-4">
            {/* Facebook Icon */}
            <div className="flex justify-center items-center bg-blue-600 p-3 rounded-full hover:bg-blue-700 transition duration-300 dark:bg-blue-700 dark:hover:bg-blue-800">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebookF className="text-white text-lg" />
              </a>
            </div>

            {/* Twitter Icon */}
            <div className="flex justify-center items-center bg-blue-400 p-3 rounded-full hover:bg-blue-500 transition duration-300 dark:bg-blue-500 dark:hover:bg-blue-600">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter className="text-white text-lg" />
              </a>
            </div>

            {/* Instagram Icon */}
            <div className="flex justify-center items-center bg-pink-600 p-3 rounded-full hover:bg-pink-700 transition duration-300 dark:bg-pink-700 dark:hover:bg-pink-800">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-white text-lg" />
              </a>
            </div>

            {/* LinkedIn Icon */}
            <div className="flex justify-center items-center bg-blue-700 p-3 rounded-full hover:bg-blue-800 transition duration-300 dark:bg-blue-800 dark:hover:bg-blue-900">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedinIn className="text-white text-lg" />
              </a>
            </div>
          </div>
        </div>

        {/* Accordion Section for Features */}
        <div className="mt-6">
          <Accordion alwaysOpen={true}>
            {/* Quality Tested Products */}
            <Accordion.Panel>
              <Accordion.Title className="text-gray-800 dark:text-white">
                Quality Tested Products
              </Accordion.Title>
              <Accordion.Content>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  We ensure all our products are quality-tested and meet high standards for durability and safety.
                </p>
              </Accordion.Content>
            </Accordion.Panel>

            {/* Authorized User Login */}
            <Accordion.Panel>
              <Accordion.Title className="text-gray-800 dark:text-white">
                Authorized User Login
              </Accordion.Title>
              <Accordion.Content>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Our platform ensures that only authorized users can access specific features and services.
                </p>
              </Accordion.Content>
            </Accordion.Panel>

            {/* Safe Transactions */}
            <Accordion.Panel>
              <Accordion.Title className="text-gray-800 dark:text-white">
                Safe Transactions
              </Accordion.Title>
              <Accordion.Content>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  We use advanced encryption methods to ensure your transactions are secure and protected.
                </p>
              </Accordion.Content>
            </Accordion.Panel>

            {/* More Features */}
            <Accordion.Panel>
              <Accordion.Title className="text-gray-800 dark:text-white">
                More Features
              </Accordion.Title>
              <Accordion.Content>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Explore our additional features like personalized recommendations, live support, and easy returns.
                </p>
              </Accordion.Content>
            </Accordion.Panel>
          </Accordion>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
