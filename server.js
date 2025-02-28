const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

//  MongoDB connects correctly
mongoose
  .connect("mongodb://localhost:27017/blogs")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

//  Import & use blog routes
const blogRoutes = require("./routes/blogRoutes");
app.use("/api/blogs", blogRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Blog API");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
