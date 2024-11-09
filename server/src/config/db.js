import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'restaurant',
});

connection.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

export default connection;
