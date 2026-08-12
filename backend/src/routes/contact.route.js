import express from "express";

import {
    createContact,
    getContacts,
    updateContactStatus,
    deleteContact
} from "../controllers/contact.controller.js";

import protect from "../middleware/auth.middleware.js";

const router = express.Router();

// Public contact form
router.post("/", createContact);

// Admin routes
router.get("/", protect, getContacts);

router.patch("/:id/status", protect, updateContactStatus);

router.delete("/:id", protect, deleteContact);

export default router;