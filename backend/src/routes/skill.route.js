import express from "express";
import protect from "../middleware/auth.middleware.js";

import {
    createSkill,
    getSkills,
    updateSkill,
    deleteSkill
} from "../controllers/skill.controller.js";

const router = express.Router();

router.post("/", protect, createSkill);

router.get("/", getSkills);

router.put("/:id", protect, updateSkill);

router.delete("/:id", protect, deleteSkill);

export default router;