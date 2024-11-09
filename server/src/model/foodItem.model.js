import db from "../config/db.js";

const FoodItem = {
    // Fetch all available food items
    getAll: (callback) => {
        const query = "SELECT * FROM Food_Items WHERE isAvailable = true";
        db.query(query, (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    // Add a new food item
    create: (name, category, price, imageUrl, callback) => {
        const sql = `INSERT INTO Food_Items (name, category, price, imageUrl) VALUES (?, ?, ?, ?)`;
        db.query(sql, [name, category, price, imageUrl], (err, result) => {
            callback(err, result);
        });
    },

    // Delete a food item by id
    delete: (id, callback) => {
        const query = "DELETE FROM Food_Items WHERE id = ?";
        db.query(query, [id], (err) => {
            if (err) return callback(err);
            callback(null);
        });
    },

    // Get the count of all food items
    getCount: (callback) => {
        const sql = "SELECT COUNT(*) AS count FROM Food_Items";
        db.query(sql, (err, result) => {
            if (err) return callback(err);
            callback(null, result[0].count);
        });
    },
    
    update: (id, name, category, price, imageUrl, callback) => {
        const sql = `
            UPDATE Food_Items
            SET name = ?, category = ?, price = ?, imageUrl = ?
            WHERE id = ?`;
        db.query(sql, [name, category, price, imageUrl, id], (err, result) => {
            callback(err, result);
        });
    }
};

export default FoodItem;
