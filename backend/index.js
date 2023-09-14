const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDatabase = require("./database");
const auth = require("./routes/router");
const packageRoutes = require("./routes/packageRoutes");
const userRouter = require('./routes/userRouter');
const contactController = require("./controllers/contactController");
const userPkgController = require("./controllers/userPkgController");
const path = require("path");
const authRoutes = require('./routes/authRoutes');
const adminRouter = require('./routes/adminRouter'); // Import the adminRouter

const app = express();
const port = process.env.PORT || 4000;

// Use the 'cors' middleware to enable CORS
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to the database
connectDatabase()
  .then(() => {
    // Database connected successfully

    // Routes
    app.use("/api/auth", auth);
    app.use("/api/auth", packageRoutes);
    app.use('/api/auth', userRouter); 
    app.use('/api/auth', authRoutes);
    app.use('/api/auth', adminRouter); // Use the adminRouter for admin routes

    // Contact form route
    app.post("/api/send-email", contactController.sendEmail);
    app.post("/api/send-email2", userPkgController.sendEmail);
    app.use("/uploads", express.static(path.join(__dirname, "uploads")));

    // Start the server
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch((error) => {
    // Database connection failed
    console.error("Database connection error:", error);
  });
