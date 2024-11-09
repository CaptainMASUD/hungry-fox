// config/multer.js
import multer from "multer";
import fs from "fs";

const tempDir = '/tmp';

if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, tempDir);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

// Accept a single file with the field name 'image'
const upload = multer({
    storage: storage,
    limits: { fileSize: 100 * 1024 * 1024 } // 100MB limit
}).single('image'); // Ensure this field name matches your frontend input

export default upload; // Export the default upload
