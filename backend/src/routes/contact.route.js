import express from "express";
import protect from "../middleware/auth.middleware.js";

import {
    createContact,
    getContacts,
    updateContactStatus,
    deleteContact
} from "../controllers/contact.controller.js";

const router = express.Router();


router.post("/", protect, createContact);

router.get("/", getContacts);

router.patch("/:id/status", protect, updateContactStatus);

router.delete("/:id", protect, deleteContact);

export default router;