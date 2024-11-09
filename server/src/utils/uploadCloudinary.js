// utils/uploadCloudinary.js
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            console.error("No file path provided.");
            return null;
        }

        const absolutePath = path.resolve(localFilePath);

        if (!fs.existsSync(absolutePath)) {
            console.error(`File not found: ${absolutePath}`);
            return null;
        }

        const response = await cloudinary.uploader.upload(absolutePath, {
            resource_type: "image"
        });

        fs.unlinkSync(absolutePath);
        console.log(`File uploaded and deleted locally: ${absolutePath}`);
        return response;
    } catch (error) {
        console.error(`Error uploading to Cloudinary: ${error.message}`);
        return null;
    }
};

export default uploadCloudinary;
