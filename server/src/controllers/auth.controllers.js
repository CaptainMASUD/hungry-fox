import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../model/user.model.js';

const authController = {
  // Register a new user without specifying isAdmin (defaults to 0 in the database)
  register: (req, res) => {
    const { username, password } = req.body;
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return res.status(500).json({ error: 'Server error' });

      User.create(username, hashedPassword, (err, result) => {
        if (err) return res.status(400).json({ error: 'User creation failed' });
        res.status(201).json({ message: 'User created successfully' });
      });
    });
  },

  // Login function to authenticate user and check isAdmin status from DB
  login: (req, res) => {
    const { username, password } = req.body;

    User.findByUsername(username, (err, results) => {
        if (err || results.length === 0) 
            return res.status(404).json({ error: 'User not found' });

        const user = results[0];
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err || !isMatch) 
                return res.status(401).json({ error: 'Invalid credentials' });

            // Check isAdmin value (1 for admin, 0 for normal user)
            const isAdmin = user.isAdmin === 1; // This ensures it checks against the correct value

            // Generate JWT token with user id and isAdmin status as decoded property
            const token = jwt.sign(
                { id: user.id, isAdmin }, // Ensure that isAdmin is correctly passed
                'your_jwt_secret',
                { expiresIn: '10h' }
            );

            // Set token as an HTTP-only cookie
            res.cookie('auth_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 1000, // 1 hour
                sameSite: 'strict',
            });

            // Optionally, you can also set isAdmin as a separate cookie if needed
            res.cookie('is_admin', isAdmin, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 1000, // 1 hour
                sameSite: 'strict',
            });

            // Respond with the user details, username, and token
            res.json({ 
                message: 'Login successful', 
                username: user.username, // Include the username in the response
                isAdmin, 
                token 
            });
        });
    });
},


  // Logout function to clear the authentication cookie
  logout: (req, res) => {
    res.clearCookie('auth_token');
    res.clearCookie('is_admin'); // Clear the is_admin cookie if set
    res.json({ message: 'Logged out successfully' });
  },

  getAllUsers: (req, res) => {
    User.findAll((err, users) => {
      if (err) {
        console.error('Error fetching users:', err); // Log error
        return res.status(500).json({ error: 'Server error' });
      }
      console.log("Fetched users:", users); // Log the fetched users
      res.json(users);
    });
  },
  

// Edit user details (admin only)
editUser: (req, res) => {
    const { id } = req.params;
    const { username, isAdmin } = req.body;

    User.update(id, username, isAdmin, (err, result) => {
        if (err) return res.status(500).json({ error: 'Failed to update user' });
        res.json({ message: 'User updated successfully' });
    });
},

// Delete a user by id (admin only)
deleteUser: (req, res) => {
    const { id } = req.params;

    User.delete(id, (err) => {
        if (err) return res.status(500).json({ error: 'Failed to delete user' });
        res.json({ message: 'User deleted successfully' });
    });
}
};

export default authController;
