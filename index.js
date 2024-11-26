const express = require("express");
const mongoose = require("mongoose");
const dotEnv = require("dotenv");
const bodyParser = require("body-parser");
const roomRoutes = require("./routes/roomRoutes");
const detailsRoutes = require("./routes/detailsRoutes");
const cors = require("cors");

const app = express();

dotEnv.config();
app.use(cors());

const PORT = process.env.PORT || 4000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((error) => console.log("MongoDB connection error:", error));

// Middleware
app.use(bodyParser.json());
app.use("/room", roomRoutes);
app.use("/details", detailsRoutes);
app.use("/uploads", express.static("uploads"));

// Home route
app.get("/", (req, res) => {
  res.send("<h1>Welcome to Room</h1>"); // Close the <h1> tag for proper HTML
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server started and running at http://localhost:${PORT}`);
});
