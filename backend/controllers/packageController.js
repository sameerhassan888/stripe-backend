// packageController.js
const mongoose = require("mongoose");
const Package = require("../models/package");

// Get all packages
exports.getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    res.json(packages);
  } catch (error) {
    console.error("Error while fetching packages:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create a new package
exports.createPackage = async (req, res) => {
  try {
    const { title, price, duration, people, location, description, province, reviews, rating } = req.body;

    // Check if an image file was uploaded
    let image = "";
    if (req.file) {
      image = req.file.filename;
    }

    const newPackage = new Package({
      title,
      price,
      duration,
      people,
      location,
      description,
      province,
      reviews,
      rating,
      image,
    });

    await newPackage.save();

    res.status(201).json({ message: "Package created successfully" });
  } catch (error) {
    console.error("Error while creating package:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a package
exports.updatePackage = async (req, res) => {
  try {
    const updateFields = {};
    if (req.body.title) updateFields.title = req.body.title;
    if (req.body.price) updateFields.price = req.body.price;
    if (req.body.duration) updateFields.duration = req.body.duration;
    if (req.body.people) updateFields.people = req.body.people;
    if (req.body.location) updateFields.location = req.body.location;
    if (req.file) updateFields.image = req.file.filename; // Only update image if a new file is provided
    if (req.body.description) updateFields.description = req.body.description;
    if (req.body.province) updateFields.province = req.body.province;
    if (req.body.reviews) updateFields.reviews = req.body.reviews;
    if (req.body.rating) updateFields.rating = req.body.rating;

    await Package.findByIdAndUpdate(req.params.id, updateFields);

    res.json({ message: "Package updated successfully" });
  } catch (error) {
    console.error("Error while updating package:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Delete a package
exports.deletePackage = async (req, res) => {
  try {
    await Package.findByIdAndDelete(req.params.id);
    res.json({ message: "Package deleted successfully" });
  } catch (error) {
    console.error("Error while deleting package:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function to handle the package details request
exports.getPackageById = async (req, res) => {
  try {
    const packageId = req.params.id;

    // Convert the packageId string to ObjectId
    const objectId = new mongoose.Types.ObjectId(packageId);

    // Now you can use the objectId to query the database
    const packageDetails = await Package.findById(objectId);

    if (!packageDetails) {
      return res.status(404).json({ message: "Package not found" });
    }

    // Return the package details in the response
    res.json(packageDetails);
  } catch (error) {
    console.error("Error fetching package details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
