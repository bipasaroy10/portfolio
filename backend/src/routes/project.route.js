import express from "express";
import protect from "../middleware/auth.middleware.js";

import {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject
} from "../controllers/project.controller.js";

const router = express.Router();


// CREATE
router.post("/", protect, createProject);

// GET ALL
router.get("/", getProjects);

// GET SINGLE
router.get("/:id", getProjectById);

// UPDATE
router.put("/:id", protect, updateProject);

// DELETE
router.delete("/:id", protect, deleteProject);


export default router;