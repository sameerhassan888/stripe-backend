// packageRoutes.js
const express = require("express");
const router = express.Router();
const packageController = require("../controllers/packageController");
const multer = require("multer");
const path = require("path");

// Multer configuration for handling image uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../uploads/")); // Use path.join() to construct the absolute path
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});


const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/gif"
    ) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type. Only JPEG, PNG, and GIF are allowed."));
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});

// Add other routes for fetching, updating, and deleting packages
router.get("/packages", packageController.getAllPackages);
router.post("/packages", upload.single("image"), packageController.createPackage);
router.put("/packages/:id", upload.single("image"), packageController.updatePackage); // Corrected route definition
router.delete("/packages/:id", packageController.deletePackage);
router.get("/packages/:id", packageController.getPackageById);

module.exports = router;
