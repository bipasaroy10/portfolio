import Experience from "../models/experience.js";


// CREATE EXPERIENCE
export const createExperience = async (req, res) => {
    try {
        const {
            company,
            position,
            employmentType,
            location,
            startDate,
            endDate,
            currentlyWorking,
            description,
            technologies
        } = req.body;

        if (!company || !position || !startDate || !description) {
            return res.status(400).json({
                success: false,
                message:
                    "Company, position, start date and description are required"
            });
        }

        const experience = await Experience.create({
            company,
            position,
            employmentType,
            location,
            startDate,
            endDate,
            currentlyWorking,
            description,
            technologies
        });

        res.status(201).json({
            success: true,
            message: "Experience created successfully",
            data: experience
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create experience",
            error: error.message
        });
    }
};


// GET ALL EXPERIENCE
export const getExperiences = async (req, res) => {
    try {
        const experiences = await Experience.find()
            .sort({ startDate: -1 });

        res.status(200).json({
            success: true,
            count: experiences.length,
            data: experiences
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch experiences",
            error: error.message
        });
    }
};


// GET SINGLE EXPERIENCE
export const getExperienceById = async (req, res) => {
    try {
        const { id } = req.params;

        const experience = await Experience.findById(id);

        if (!experience) {
            return res.status(404).json({
                success: false,
                message: "Experience not found"
            });
        }

        res.status(200).json({
            success: true,
            data: experience
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch experience",
            error: error.message
        });
    }
};


// UPDATE EXPERIENCE
export const updateExperience = async (req, res) => {
    try {
        const { id } = req.params;

        const experience =
            await Experience.findByIdAndUpdate(
                id,
                req.body,
                {
                    new: true,
                    runValidators: true
                }
            );

        if (!experience) {
            return res.status(404).json({
                success: false,
                message: "Experience not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Experience updated successfully",
            data: experience
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update experience",
            error: error.message
        });
    }
};


// DELETE EXPERIENCE
export const deleteExperience = async (req, res) => {
    try {
        const { id } = req.params;

        const experience =
            await Experience.findByIdAndDelete(id);

        if (!experience) {
            return res.status(404).json({
                success: false,
                message: "Experience not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Experience deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete experience",
            error: error.message
        });
    }
};