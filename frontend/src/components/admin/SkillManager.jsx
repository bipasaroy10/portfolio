import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api";

const SkillManager = () => {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [showForm, setShowForm] = useState(false);
    const [editingSkill, setEditingSkill] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        category: "",
        level: ""
    });

    const getToken = () => {
        return localStorage.getItem("adminToken");
    };

    // --------------------------------
    // Load Skills
    // --------------------------------

    const loadSkills = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                `${API_URL}/skills`
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to load skills"
                );
            }

            setSkills(data.data || []);

        } catch (error) {
            console.error("Load skills error:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadSkills();
    }, []);

    // --------------------------------
    // Handle Input
    // --------------------------------

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));
    };

    // --------------------------------
    // Add Skill
    // --------------------------------

    const handleAdd = () => {
        setEditingSkill(null);

        setFormData({
            name: "",
            category: "",
            level: ""
        });

        setShowForm(true);
        setError("");
    };

    // --------------------------------
    // Edit Skill
    // --------------------------------

    const handleEdit = (skill) => {
        setEditingSkill(skill);

        setFormData({
            name: skill.name || "",
            category: skill.category || "",
            level: skill.level || ""
        });

        setShowForm(true);
        setError("");
    };

    // --------------------------------
    // Create / Update
    // --------------------------------

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setError("");

            const token = getToken();

            const url = editingSkill
                ? `${API_URL}/skills/${editingSkill._id}`
                : `${API_URL}/skills`;

            const method = editingSkill
                ? "PUT"
                : "POST";

            const response = await fetch(url, {
                method,

                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },

                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to save skill"
                );
            }

            setShowForm(false);
            setEditingSkill(null);

            await loadSkills();

        } catch (error) {
            console.error("Save skill error:", error);
            setError(error.message);
        }
    };

    // --------------------------------
    // Delete
    // --------------------------------

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this skill?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setError("");

            const token = getToken();

            const response = await fetch(
                `${API_URL}/skills/${id}`,
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
                    "Failed to delete skill"
                );
            }

            await loadSkills();

        } catch (error) {
            console.error(
                "Delete skill error:",
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
                        Skills
                    </h2>

                    <p className="text-gray-500 mt-1">
                        Manage your technical skills
                    </p>

                </div>

                <button
                    onClick={handleAdd}
                    className="px-5 py-3 bg-black text-white rounded-lg"
                >
                    + Add Skill
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
                            {editingSkill
                                ? "Edit Skill"
                                : "Add Skill"}
                        </h3>

                        <button
                            onClick={() =>
                                setShowForm(false)
                            }
                            className="text-gray-500"
                        >
                            ✕
                        </button>

                    </div>


                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        {/* Name */}

                        <div>

                            <label className="block text-sm font-medium mb-2">
                                Skill Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Node.js"
                                required
                                className="w-full border rounded-lg px-4 py-3"
                            />

                        </div>


                        {/* Category */}

                        <div>

                            <label className="block text-sm font-medium mb-2">
                                Category
                            </label>

                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                                className="w-full border rounded-lg px-4 py-3"
                            >

                                <option value="">
                                    Select category
                                </option>

                                <option value="Frontend">
                                    Frontend
                                </option>

                                <option value="Backend">
                                    Backend
                                </option>

                                <option value="Database">
                                    Database
                                </option>

                                <option value="Programming">
                                    Programming
                                </option>

                                <option value="Tools">
                                    Tools
                                </option>

                                <option value="Other">
                                    Other
                                </option>

                            </select>

                        </div>


                        {/* Level */}

                        <div>

                            <label className="block text-sm font-medium mb-2">
                                Skill Level
                            </label>

                            <select
                                name="level"
                                value={formData.level}
                                onChange={handleChange}
                                required
                                className="w-full border rounded-lg px-4 py-3"
                            >

                                <option value="">
                                    Select level
                                </option>

                                <option value="Beginner">
                                    Beginner
                                </option>

                                <option value="Intermediate">
                                    Intermediate
                                </option>

                                <option value="Advanced">
                                    Advanced
                                </option>

                                <option value="Expert">
                                    Expert
                                </option>

                            </select>

                        </div>


                        {/* Buttons */}

                        <div className="flex gap-3 pt-4">

                            <button
                                type="submit"
                                className="px-6 py-3 bg-black text-white rounded-lg"
                            >
                                {editingSkill
                                    ? "Update Skill"
                                    : "Create Skill"}
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    setShowForm(false)
                                }
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
                    Loading skills...
                </p>
            )}


            {/* Empty */}

            {!loading && skills.length === 0 && (

                <div className="bg-white border rounded-xl p-10 text-center">

                    <p className="text-gray-500">
                        No skills found.
                    </p>

                    <button
                        onClick={handleAdd}
                        className="mt-4 px-5 py-2 bg-black text-white rounded-lg"
                    >
                        Add Your First Skill
                    </button>

                </div>
            )}


            {/* Skill List */}

            {!loading && skills.length > 0 && (

                <div className="bg-white border rounded-2xl overflow-hidden">

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead className="bg-gray-50 border-b">

                                <tr>

                                    <th className="text-left px-6 py-4">
                                        Skill
                                    </th>

                                    <th className="text-left px-6 py-4">
                                        Category
                                    </th>

                                    <th className="text-left px-6 py-4">
                                        Level
                                    </th>

                                    <th className="text-right px-6 py-4">
                                        Actions
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {skills.map((skill) => (

                                    <tr
                                        key={skill._id}
                                        className="border-b last:border-b-0"
                                    >

                                        <td className="px-6 py-5 font-semibold">
                                            {skill.name}
                                        </td>

                                        <td className="px-6 py-5 text-gray-500">
                                            {skill.category}
                                        </td>

                                        <td className="px-6 py-5">

                                            <span className="px-3 py-1 text-xs border rounded-full">
                                                {skill.level}
                                            </span>

                                        </td>

                                        <td className="px-6 py-5">

                                            <div className="flex justify-end gap-3">

                                                <button
                                                    onClick={() =>
                                                        handleEdit(skill)
                                                    }
                                                    className="px-3 py-2 border rounded-lg"
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        handleDelete(
                                                            skill._id
                                                        )
                                                    }
                                                    className="px-3 py-2 bg-red-600 text-white rounded-lg"
                                                >
                                                    Delete
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>
            )}

        </div>
    );
};

export default SkillManager;