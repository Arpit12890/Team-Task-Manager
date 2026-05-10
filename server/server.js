// ==========================================
// server/server.js
// ==========================================

const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const userRoutes =
  require("./routes/userRoutes");

const app = express();

// Middleware
app.use(express.json());

app.use(
  cors({
    origin: "https://team-task-manager-ufxp.onrender.com",
    credentials: true,
  })
);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 30000,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/users", userRoutes);

// Serve Frontend
const __dirname1 = path.resolve();

app.use(express.static(path.join(__dirname1, "client", "dist")));

// React Routes
app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname1, "client", "dist", "index.html")
  );
});

// Server Start
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server Running On ${PORT}`);
});