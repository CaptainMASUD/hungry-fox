import db from './db.js';

const initializeDatabase = () => {
  const userTable = `
    CREATE TABLE IF NOT EXISTS Users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(50) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      isAdmin BOOLEAN DEFAULT false
    );
  `;

  const foodItemsTable = `
  CREATE TABLE IF NOT EXISTS Food_Items (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      category VARCHAR(50) NOT NULL,
      price FLOAT NOT NULL,  -- Changed from Decimal(10, 2) to FLOAT
      imageUrl VARCHAR(255) NOT NULL,
      isAvailable BOOLEAN DEFAULT true
  );
`;




const ordersTable = `
  CREATE TABLE IF NOT EXISTS Orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    foodItems JSON NOT NULL,
    totalAmount DECIMAL(10, 2) NOT NULL,
    status ENUM('Pending', 'In-Delivery', 'Completed') DEFAULT 'Pending',
    customerName VARCHAR(100),
    address TEXT,
    phone VARCHAR(15),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES Users(id)
  );
`;




  db.query(userTable, (err) => {
    if (err) {
      console.error('Failed to create Users table:', err);
    } else {
      console.log('Users table ready');
    }
  });

  db.query(foodItemsTable, (err) => {
    if (err) {
      console.error('Failed to create Food_Items table:', err);
    } else {
      console.log('Food_Items table ready');
    }
  });

  db.query(ordersTable, (err) => {
    if (err) {
      console.error('Failed to create Orders table:', err);
    } else {
      console.log('Orders table ready');
    }
  });
};

export default initializeDatabase;
