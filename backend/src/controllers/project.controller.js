import Project from "../models/project.js";


// CREATE PROJECT
export const createProject = async (req, res) => {
    try {
        const {
            title,
            description,
            technologies,
            github,
            liveDemo,
            image,
            featured
        } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: "Title and description are required"
            });
        }

        const project = await Project.create({
            title,
            description,
            technologies,
            github,
            liveDemo,
            image,
            featured
        });

        res.status(201).json({
            success: true,
            message: "Project created successfully",
            data: project
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create project",
            error: error.message
        });
    }
};


// GET ALL PROJECTS
export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find().sort({
            createdAt: -1
        });

        res.status(200).json({
            success: true,
            count: projects.length,
            data: projects
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch projects",
            error: error.message
        });
    }
};


// GET SINGLE PROJECT
export const getProjectById = async (req, res) => {
    try {
        const { id } = req.params;

        const project = await Project.findById(id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }

        res.status(200).json({
            success: true,
            data: project
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch project",
            error: error.message
        });
    }
};


// UPDATE PROJECT
export const updateProject = async (req, res) => {
    try {
        const { id } = req.params;

        const project = await Project.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Project updated successfully",
            data: project
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update project",
            error: error.message
        });
    }
};


// DELETE PROJECT
export const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;

        const project = await Project.findByIdAndDelete(id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Project deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete project",
            error: error.message
        });
    }
};