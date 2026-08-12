import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
    {
        company: {
            type: String,
            required: true,
            trim: true
        },

        position: {
            type: String,
            required: true,
            trim: true
        },

        employmentType: {
            type: String,
            default: "Internship"
        },

        location: {
            type: String,
            default: ""
        },

        startDate: {
            type: Date,
            required: true
        },

        endDate: {
            type: Date,
            default: null
        },

        currentlyWorking: {
            type: Boolean,
            default: false
        },

        description: {
            type: String,
            required: true
        },

        technologies: {
            type: [String],
            default: []
        }
    },
    {
        timestamps: true
    }
);

const Experience = mongoose.model(
    "Experience",
    experienceSchema
);

export default Experience;