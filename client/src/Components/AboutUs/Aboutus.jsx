import React from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiBriefcase, FiStar } from 'react-icons/fi';
import { Card } from 'flowbite-react';

function AboutUs() {
  const partners = [
    { name: 'Ayan', role: 'CEO', image: 'https://scontent.fdac41-1.fna.fbcdn.net/v/t39.30808-6/454467903_3701996050042630_3647676458570200956_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEugYkhPJNPIYbw-MQgubWdzwNOr6LzSOXPA06vovNI5TyJdCCZ2c3OBKL_Tk_i2l1hvnF2g4XZsRWLmRJtrAyT&_nc_ohc=r0uhO7uEKCoQ7kNvgGYZbLf&_nc_zt=23&_nc_ht=scontent.fdac41-1.fna&_nc_gid=A2gYREXmaGg12ZfxG_111iv&oh=00_AYBvF4MlhLHJlWOD2m_jdkbV3f9E_Wnuxy3nBo1FmlPcgw&oe=6733DFCF' },
    { name: 'Masud', role: 'COO', image: 'https://avatars.githubusercontent.com/u/108082819?v=4' },
    { name: 'Mitu', role: 'CFO', image: 'https://i.pinimg.com/736x/77/b1/e4/77b1e41effd5a934f07ba7d6a8719544.jpg' },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          About Us
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          We are a team of dedicated professionals with a passion for quality and innovation.
          Our mission is to bring exceptional services and products to our valued customers.
        </p>
      </motion.div>

      <div className="flex flex-col lg:flex-row items-center gap-12">
        <motion.img
          src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?cs=srgb&dl=pexels-chanwalrus-958545.jpg&fm=jpg"
          alt="Our Company"
          className="w-full lg:w-1/2 rounded-lg shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        />

        <motion.div
          className="flex-1 space-y-8"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Meet Our Team
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 transition-transform duration-300"
              >
                <Card className="overflow-hidden">
                  <img
                    src={partner.image}
                    alt={partner.name}
                    className="rounded-full w-24 h-24 mx-auto mb-4"
                  />
                  <div className="text-center">
                    <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                      {partner.name}
                    </h4>
                    <p className="text-gray-500 dark:text-gray-400 mb-2">{partner.role}</p>
                    <div className="flex justify-center gap-4 text-gray-500 dark:text-gray-300">
                      <FiUser className="text-xl" />
                      <FiBriefcase className="text-xl" />
                      <FiStar className="text-xl" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default AboutUs;
