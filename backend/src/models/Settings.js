import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        title: {
            type: String,
            required: true,
            trim: true
        },

        about: {
            type: String,
            default: ""
        },

        email: {
            type: String,
            trim: true,
            lowercase: true
        },

        phone: {
            type: String,
            default: ""
        },

        location: {
            type: String,
            default: ""
        },

        github: {
            type: String,
            default: ""
        },

        linkedin: {
            type: String,
            default: ""
        },

        twitter: {
            type: String,
            default: ""
        },

        website: {
            type: String,
            default: ""
        },

        // ---------------------------------
        // Resume
        // ---------------------------------

        resumeUrl: {
            type: String,
            default: ""
        },

        resumePublicId: {
            type: String,
            default: ""
        },

        // ---------------------------------
        // Profile Image
        // ---------------------------------

        profileImage: {
            type: String,
            default: ""
        },

        profileImagePublicId: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

const Settings = mongoose.model(
    "Settings",
    settingsSchema
);

export default Settings;