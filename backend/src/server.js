import "dotenv/config";
import cloudinary from "./config/cloudinary.js";
import express from "express";
import cors from "cors";


import connectDB from "./config/db.js";
import projectRoutes from "./routes/project.route.js";
import skillRoutes from "./routes/skill.route.js";
import experienceRoutes from "./routes/experience.route.js";
import contactRoutes from "./routes/contact.route.js";
import authRoutes from "./routes/auth.route.js";
import settingsRoutes from "./routes/settings.routes.js";
import uploadRoutes from "./routes/upload.routes.js";




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
app.use("/api/settings", settingsRoutes);
app.use("/api/uploads", uploadRoutes);

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
    console.log(`Server running on port http://localhost:${PORT}`);
});