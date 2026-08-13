import express from "express";

import {
    getSettings,
    updateSettings
} from "../controllers/settings.controller.js";

import protect from "../middleware/auth.middleware.js";

const router = express.Router();


// ---------------------------------------
// Public
// ---------------------------------------

router.get(
    "/",
    getSettings
);


// ---------------------------------------
// Admin
// ---------------------------------------

router.put(
    "/",
    protect,
    updateSettings
);


export default router;