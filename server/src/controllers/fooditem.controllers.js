// controllers/fooditem.controllers.js
import FoodItem from "../model/foodItem.model.js";
import uploadCloudinary from "../utils/uploadCloudinary.js";

const foodController = {
    getAll: (req, res) => {
        FoodItem.getAll((err, results) => {
            if (err) return res.status(500).json({ error: "Server error" });
            res.json(results);
        });
    },
   addFoodItem: async (req, res) => {
    console.log('Request Body:', req.body); // Log the entire request body

    const { name, category, price } = req.body;

    // Check if the required fields are present
    if (!name || !category || !price) {
        return res.status(400).json({ error: "All fields are required" });
    }

    // Trim the values to remove any leading or trailing spaces
    const trimmedName = name.trim();
    const trimmedCategory = category.trim();
    const trimmedPrice = price.trim();

    const imageFile = req.file;

    if (!imageFile) {
        return res.status(400).json({ error: "Image file is required" });
    }

    const imageUrl = (await uploadCloudinary(imageFile.path))?.url;
    if (!imageUrl) {
        return res.status(500).json({ error: "Failed to upload image to Cloudinary" });
    }

    // Parse price as a float and check if it's valid
    const priceValue = parseFloat(trimmedPrice);
    if (isNaN(priceValue)) {
        return res.status(400).json({ error: "Price must be a valid number" });
    }

    // Use trimmed values in the database insertion
    FoodItem.create(trimmedName, trimmedCategory, priceValue, imageUrl, (err, result) => {
        if (err) {
            console.error("Error adding food item:", err); // Log the error for debugging
            return res.status(400).json({ error: "Failed to add food item", details: err.message });
        }
        res.status(201).json({ message: "Food item added successfully", imageUrl,priceValue,trimmedCategory,trimmedName });
    });
}

    ,
    
    
    deleteFoodItem: (req, res) => {
        const { id } = req.params;
        FoodItem.delete(id, (err) => {
            if (err) return res.status(400).json({ error: "Failed to delete food item" });
            res.json({ message: "Food item deleted successfully" });
        });
    },

    getCount: (req, res) => {
        FoodItem.getCount((err, count) => {
            if (err) return res.status(500).json({ error: "Server error" });
            res.json({ count });
        });
    },

    updateFoodItem: async (req, res) => {
        const { id } = req.params;
        const { name, category, price } = req.body;
        
        // Validate inputs
        if (!name || !category || !price) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Trim inputs
        const trimmedName = name.trim();
        const trimmedCategory = category.trim();
        const trimmedPrice = price.trim();
        
        // Parse and validate price
        const priceValue = parseFloat(trimmedPrice);
        if (isNaN(priceValue)) {
            return res.status(400).json({ error: "Price must be a valid number" });
        }

        let imageUrl = req.body.imageUrl; // Default to existing image URL
        const imageFile = req.file;

        // If a new image is uploaded, upload it to Cloudinary
        if (imageFile) {
            imageUrl = (await uploadCloudinary(imageFile.path))?.url;
            if (!imageUrl) {
                return res.status(500).json({ error: "Failed to upload image to Cloudinary" });
            }
        }

        // Update food item details in the database
        FoodItem.update(id, trimmedName, trimmedCategory, priceValue, imageUrl, (err, result) => {
            if (err) {
                console.error("Error updating food item:", err);
                return res.status(500).json({ error: "Failed to update food item", details: err.message });
            }
            res.status(200).json({ message: "Food item updated successfully", id, trimmedName, trimmedCategory, priceValue, imageUrl });
        });
    }
};

export default foodController;
