import express from "express";

import {
    uploadProfileImage,
    uploadResume
} from "../controllers/upload.controller.js";

import protect from "../middleware/auth.middleware.js";

import upload from "../middleware/upload.middleware.js";

const router = express.Router();


// Profile Image

router.post(
    "/profile-image",
    protect,
    upload.single("profileImage"),
    uploadProfileImage
);


// Resume

router.post(
    "/resume",
    protect,
    upload.single("resume"),
    uploadResume
);


export default router;