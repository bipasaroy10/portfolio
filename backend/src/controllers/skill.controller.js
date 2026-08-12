import Skill from "../models/skill.js";


// CREATE SKILL
export const createSkill = async (req, res) => {
    try {
        const {
            name,
            category,
            level,
            icon
        } = req.body;

        if (!name || !category) {
            return res.status(400).json({
                success: false,
                message: "Name and category are required"
            });
        }

        const skill = await Skill.create({
            name,
            category,
            level,
            icon
        });

        res.status(201).json({
            success: true,
            message: "Skill created successfully",
            data: skill
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create skill",
            error: error.message
        });
    }
};


// GET ALL SKILLS
export const getSkills = async (req, res) => {
    try {
        const skills = await Skill.find().sort({
            category: 1,
            name: 1
        });

        res.status(200).json({
            success: true,
            count: skills.length,
            data: skills
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch skills",
            error: error.message
        });
    }
};


// UPDATE SKILL
export const updateSkill = async (req, res) => {
    try {
        const { id } = req.params;

        const skill = await Skill.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!skill) {
            return res.status(404).json({
                success: false,
                message: "Skill not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Skill updated successfully",
            data: skill
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update skill",
            error: error.message
        });
    }
};


// DELETE SKILL
export const deleteSkill = async (req, res) => {
    try {
        const { id } = req.params;

        const skill = await Skill.findByIdAndDelete(id);

        if (!skill) {
            return res.status(404).json({
                success: false,
                message: "Skill not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Skill deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete skill",
            error: error.message
        });
    }
};