import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import projectRoutes from "./routes/project.route.js";
import skillRoutes from "./routes/skill.route.js";
import experienceRoutes from "./routes/experience.route.js";
import contactRoutes from "./routes/contact.route.js";
import authRoutes from "./routes/auth.route.js";


dotenv.config();

const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// Database
connectDB();


// Routes
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/experiences", experienceRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/auth", authRoutes);


// Home route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Portfolio API is running"
    });
});


// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});