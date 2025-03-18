const multer = require('multer');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//       folder: "potholes",
//       allowed_formats: ["jpg", "png", "jpeg"]
//   }
// });

const storage = multer.memoryStorage();  // Store file in memory to pass buffer to Cloudinary
const upload = multer({ storage });



const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "potholes" },
      (error, result) => {
        if (error) {
          console.error("Cloudinary Upload Error:", error);
          reject(new Error("Image upload failed"));
        } else {
          resolve(result.secure_url);
        }
      }
    );
    stream.end(fileBuffer);
  });
};


module.exports = { cloudinary, upload,uploadToCloudinary };
