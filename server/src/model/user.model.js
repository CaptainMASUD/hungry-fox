import db from "../config/db.js"
// model/user.model.js
const User = {
  create: (username, password, callback) => {
    const query = 'INSERT INTO Users (username, password, isAdmin) VALUES (?, ?, ?)';
    db.query(query, [username, password, 0], callback); // Default isAdmin to 0
  },

  findByUsername: (username, callback) => {
    const query = 'SELECT * FROM Users WHERE username = ?';
    db.query(query, [username], callback);
  },


// Fetch all users

findAll: (callback) => {
  const query = 'SELECT * FROM Users';
  db.query(query, (err, results) => {
      console.log("Query results:", results); // Log the results here
      callback(err, results);
  });
},


// Update a user by id
update: (id, username, isAdmin, callback) => {
    const query = 'UPDATE Users SET username = ?, isAdmin = ? WHERE id = ?';
    db.query(query, [username, isAdmin, id], (err, result) => {
        callback(err, result);
    });
},

// Delete a user by id
delete: (id, callback) => {
    const query = 'DELETE FROM Users WHERE id = ?';
    db.query(query, [id], (err) => {
        callback(err);
    });
}

  // Add other User model functions as needed
};

export default User;
