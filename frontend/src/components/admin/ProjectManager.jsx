import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api";

const ProjectManager = () => {
    const [projects, setProjects] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [showForm, setShowForm] = useState(false);

    const [editingProject, setEditingProject] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        technologies: "",
        github: "",
        liveDemo: "",
        image: "",
        featured: false
    });


    // --------------------------------
    // Get JWT token
    // --------------------------------

    const getToken = () => {
        return localStorage.getItem("adminToken");
    };


    // --------------------------------
    // Load projects
    // --------------------------------

    const loadProjects = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                `${API_URL}/projects`
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to load projects"
                );
            }

            setProjects(data.data || []);

        } catch (error) {

            console.error(
                "Load projects error:",
                error
            );

            setError(error.message);

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {
        loadProjects();
    }, []);


    // --------------------------------
    // Handle input
    // --------------------------------

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]:
                type === "checkbox"
                    ? checked
                    : value
        }));
    };


    // --------------------------------
    // Open Add form
    // --------------------------------

    const handleAdd = () => {

        setEditingProject(null);

        setFormData({
            title: "",
            description: "",
            technologies: "",
            github: "",
            liveDemo: "",
            image: "",
            featured: false
        });

        setShowForm(true);
    };


    // --------------------------------
    // Open Edit form
    // --------------------------------

    const handleEdit = (project) => {

        setEditingProject(project);

        setFormData({
            title: project.title || "",

            description:
                project.description || "",

            technologies:
                Array.isArray(project.technologies)
                    ? project.technologies.join(", ")
                    : "",

            github:
                project.github || "",

            liveDemo:
                project.liveDemo || "",

            image:
                project.image || "",

            featured:
                project.featured || false
        });

        setShowForm(true);
    };


    // --------------------------------
    // Submit
    // --------------------------------

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setError("");

            const technologies = formData.technologies
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean);


            const payload = {
                title: formData.title,

                description: formData.description,

                technologies,

                github: formData.github,

                liveDemo: formData.liveDemo,

                image: formData.image,

                featured: formData.featured
            };


            const token = getToken();


            const url = editingProject
                ? `${API_URL}/projects/${editingProject._id}`
                : `${API_URL}/projects`;


            const method = editingProject
                ? "PUT"
                : "POST";


            const response = await fetch(
                url,
                {
                    method,

                    headers: {
                        "Content-Type": "application/json",

                        Authorization:
                            `Bearer ${token}`
                    },

                    body: JSON.stringify(payload)
                }
            );


            const data = await response.json();


            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Failed to save project"
                );
            }


            setShowForm(false);

            setEditingProject(null);

            await loadProjects();


        } catch (error) {

            console.error(
                "Save project error:",
                error
            );

            setError(error.message);
        }
    };


    // --------------------------------
    // Delete
    // --------------------------------

    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this project?"
        );

        if (!confirmed) {
            return;
        }


        try {

            const token = getToken();


            const response = await fetch(
                `${API_URL}/projects/${id}`,
                {
                    method: "DELETE",

                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );


            const data = await response.json();


            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Failed to delete project"
                );
            }


            await loadProjects();


        } catch (error) {

            console.error(
                "Delete project error:",
                error
            );

            setError(error.message);
        }
    };


    return (
        <div>

            {/* Header */}

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

                <div>

                    <h2 className="text-3xl font-bold">
                        Projects
                    </h2>

                    <p className="text-gray-500 mt-1">
                        Manage your portfolio projects
                    </p>

                </div>


                <button
                    onClick={handleAdd}
                    className="px-5 py-3 bg-black text-white rounded-lg"
                >
                    + Add Project
                </button>

            </div>


            {/* Error */}

            {error && (
                <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg">
                    {error}
                </div>
            )}


            {/* Form */}

            {showForm && (

                <div className="bg-white border rounded-2xl p-6 mb-8">

                    <div className="flex justify-between items-center mb-6">

                        <h3 className="text-xl font-bold">
                            {editingProject
                                ? "Edit Project"
                                : "Add Project"}
                        </h3>

                        <button
                            onClick={() => setShowForm(false)}
                            className="text-gray-500"
                        >
                            ✕
                        </button>

                    </div>


                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        {/* Title */}

                        <div>

                            <label className="block text-sm font-medium mb-2">
                                Project Title
                            </label>

                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                className="w-full border rounded-lg px-4 py-3"
                                placeholder="Email Sender"
                            />

                        </div>


                        {/* Description */}

                        <div>

                            <label className="block text-sm font-medium mb-2">
                                Description
                            </label>

                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                rows="5"
                                className="w-full border rounded-lg px-4 py-3 resize-none"
                                placeholder="Describe your project..."
                            />

                        </div>


                        {/* Technologies */}

                        <div>

                            <label className="block text-sm font-medium mb-2">
                                Technologies
                            </label>

                            <input
                                type="text"
                                name="technologies"
                                value={formData.technologies}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-3"
                                placeholder="Node.js, Express.js, MongoDB"
                            />

                            <p className="text-xs text-gray-500 mt-1">
                                Separate technologies with commas.
                            </p>

                        </div>


                        {/* GitHub */}

                        <div>

                            <label className="block text-sm font-medium mb-2">
                                GitHub URL
                            </label>

                            <input
                                type="url"
                                name="github"
                                value={formData.github}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-3"
                                placeholder="https://github.com/..."
                            />

                        </div>


                        {/* Live Demo */}

                        <div>

                            <label className="block text-sm font-medium mb-2">
                                Live Demo URL
                            </label>

                            <input
                                type="url"
                                name="liveDemo"
                                value={formData.liveDemo}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-3"
                                placeholder="https://..."
                            />

                        </div>


                        {/* Image */}

                        <div>

                            <label className="block text-sm font-medium mb-2">
                                Image URL
                            </label>

                            <input
                                type="url"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-3"
                                placeholder="https://..."
                            />

                        </div>


                        {/* Featured */}

                        <div className="flex items-center gap-3">

                            <input
                                type="checkbox"
                                name="featured"
                                checked={formData.featured}
                                onChange={handleChange}
                                className="w-4 h-4"
                            />

                            <label>
                                Featured Project
                            </label>

                        </div>


                        {/* Buttons */}

                        <div className="flex gap-3 pt-4">

                            <button
                                type="submit"
                                className="px-6 py-3 bg-black text-white rounded-lg"
                            >
                                {editingProject
                                    ? "Update Project"
                                    : "Create Project"}
                            </button>


                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="px-6 py-3 border rounded-lg"
                            >
                                Cancel
                            </button>

                        </div>

                    </form>

                </div>
            )}


            {/* Loading */}

            {loading && (
                <p className="text-gray-500">
                    Loading projects...
                </p>
            )}


            {/* Empty */}

            {!loading &&
                projects.length === 0 && (
                    <div className="bg-white border rounded-xl p-10 text-center">

                        <p className="text-gray-500">
                            No projects found.
                        </p>

                        <button
                            onClick={handleAdd}
                            className="mt-4 px-5 py-2 bg-black text-white rounded-lg"
                        >
                            Add Your First Project
                        </button>

                    </div>
                )}


            {/* Project List */}

            {!loading &&
                projects.length > 0 && (

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {projects.map((project) => (

                            <div
                                key={project._id}
                                className="bg-white border rounded-2xl overflow-hidden"
                            >

                                {/* Image */}

                                {project.image ? (

                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-44 object-cover"
                                    />

                                ) : (

                                    <div className="w-full h-44 bg-gray-100 flex items-center justify-center">

                                        <span className="text-gray-400">
                                            No Image
                                        </span>

                                    </div>
                                )}


                                <div className="p-5">

                                    <div className="flex justify-between gap-3">

                                        <h3 className="text-xl font-bold">
                                            {project.title}
                                        </h3>

                                        {project.featured && (
                                            <span className="text-xs bg-gray-100 px-2 py-1 rounded-full h-fit">
                                                Featured
                                            </span>
                                        )}

                                    </div>


                                    <p className="text-gray-500 text-sm mt-3 line-clamp-3">
                                        {project.description}
                                    </p>


                                    <div className="flex flex-wrap gap-2 mt-4">

                                        {project.technologies?.map(
                                            (technology, index) => (

                                                <span
                                                    key={index}
                                                    className="text-xs border px-2 py-1 rounded-full"
                                                >
                                                    {technology}
                                                </span>

                                            )
                                        )}

                                    </div>


                                    <div className="flex gap-3 mt-5">

                                        <button
                                            onClick={() =>
                                                handleEdit(project)
                                            }
                                            className="flex-1 px-3 py-2 border rounded-lg"
                                        >
                                            Edit
                                        </button>


                                        <button
                                            onClick={() =>
                                                handleDelete(project._id)
                                            }
                                            className="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg"
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>
                )}

        </div>
    );
};

export default ProjectManager;