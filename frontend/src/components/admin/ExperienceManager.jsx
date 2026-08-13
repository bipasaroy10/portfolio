import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api";

const ExperienceManager = () => {
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [showForm, setShowForm] = useState(false);
    const [editingExperience, setEditingExperience] = useState(null);

    const [formData, setFormData] = useState({
        company: "",
        position: "",
        employmentType: "Internship",
        location: "",
        startDate: "",
        endDate: "",
        currentlyWorking: false,
        description: "",
        technologies: ""
    });

    const getToken = () => {
        return localStorage.getItem("adminToken");
    };

    // --------------------------------
    // Load Experiences
    // --------------------------------

    const loadExperiences = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                `${API_URL}/experiences`
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Failed to load experiences"
                );
            }

            setExperiences(data.data || []);

        } catch (error) {
            console.error(
                "Load experiences error:",
                error
            );

            setError(error.message);

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadExperiences();
    }, []);

    // --------------------------------
    // Handle Input
    // --------------------------------

    const handleChange = (e) => {
        const {
            name,
            value,
            type,
            checked
        } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]:
                type === "checkbox"
                    ? checked
                    : value
        }));
    };

    // --------------------------------
    // Add Experience
    // --------------------------------

    const handleAdd = () => {
        setEditingExperience(null);

        setFormData({
            company: "",
            position: "",
            employmentType: "Internship",
            location: "",
            startDate: "",
            endDate: "",
            currentlyWorking: false,
            description: "",
            technologies: ""
        });

        setShowForm(true);
        setError("");
    };

    // --------------------------------
    // Edit Experience
    // --------------------------------

    const handleEdit = (experience) => {
        setEditingExperience(experience);

        setFormData({
            company: experience.company || "",
            position: experience.position || "",
            employmentType:
                experience.employmentType ||
                "Internship",
            location: experience.location || "",

            startDate: experience.startDate
                ? experience.startDate.substring(0, 10)
                : "",

            endDate: experience.endDate
                ? experience.endDate.substring(0, 10)
                : "",

            currentlyWorking:
                experience.currentlyWorking || false,

            description:
                experience.description || "",

            technologies:
                Array.isArray(experience.technologies)
                    ? experience.technologies.join(", ")
                    : ""
        });

        setShowForm(true);
        setError("");
    };

    // --------------------------------
    // Create / Update Experiences
    // --------------------------------

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setError("");

            const token = getToken();

            const technologies =
                formData.technologies
                    .split(",")
                    .map((item) => item.trim())
                    .filter(Boolean);

            const payload = {
                company: formData.company,

                position: formData.position,

                employmentType:
                    formData.employmentType,

                location:
                    formData.location,

                startDate:
                    formData.startDate,

                endDate:
                    formData.currentlyWorking
                        ? null
                        : formData.endDate || null,

                currentlyWorking:
                    formData.currentlyWorking,

                description:
                    formData.description,

                technologies
            };

            const url = editingExperience
                ? `${API_URL}/experiences/${editingExperience._id}`
                : `${API_URL}/experiences`;

            const method = editingExperience
                ? "PUT"
                : "POST";

            const response = await fetch(
                url,
                {
                    method,

                    headers: {
                        "Content-Type":
                            "application/json",

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
                    "Failed to save experiences"
                );
            }

            setShowForm(false);
            setEditingExperience(null);

            await loadExperiences();

        } catch (error) {
            console.error(
                "Save experiences error:",
                error
            );

            setError(error.message);
        }
    };

    // --------------------------------
    // Delete Experiences
    // --------------------------------

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this experience?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setError("");

            const token = getToken();

            const response = await fetch(
                `${API_URL}/experiences/${id}`,
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
                    "Failed to delete experiences"
                );
            }

            await loadExperiences();

        } catch (error) {
            console.error(
                "Delete experiences error:",
                error
            );

            setError(error.message);
        }
    };

    // --------------------------------
    // Format Date
    // --------------------------------

    const formatDate = (date) => {
        if (!date) {
            return "";
        }

        return new Date(date).toLocaleDateString(
            "en-US",
            {
                month: "short",
                year: "numeric"
            }
        );
    };

    return (
        <div>

            {/* Header */}

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

                <div>

                    <h2 className="text-3xl font-bold">
                        Experiences
                    </h2>

                    <p className="text-gray-500 mt-1">
                        Manage your work experiences
                    </p>

                </div>

                <button
                    onClick={handleAdd}
                    className="px-5 py-3 bg-black text-white rounded-lg"
                >
                    + Add Experience
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
                            {editingExperience
                                ? "Edit Experience"
                                : "Add Experience"}
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

                        {/* Company */}

                        <div>

                            <label className="block text-sm font-medium mb-2">
                                Company
                            </label>

                            <input
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                placeholder="IEMA"
                                required
                                className="w-full border rounded-lg px-4 py-3"
                            />

                        </div>


                        {/* Position */}

                        <div>

                            <label className="block text-sm font-medium mb-2">
                                Position
                            </label>

                            <input
                                type="text"
                                name="position"
                                value={formData.position}
                                onChange={handleChange}
                                placeholder="Backend Developer Intern"
                                required
                                className="w-full border rounded-lg px-4 py-3"
                            />

                        </div>


                        {/* Employment Type */}

                        <div>

                            <label className="block text-sm font-medium mb-2">
                                Employment Type
                            </label>

                            <select
                                name="employmentType"
                                value={
                                    formData.employmentType
                                }
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-3"
                            >

                                <option value="Internship">
                                    Internship
                                </option>

                                <option value="Full-time">
                                    Full-time
                                </option>

                                <option value="Part-time">
                                    Part-time
                                </option>

                                <option value="Freelance">
                                    Freelance
                                </option>

                                <option value="Contract">
                                    Contract
                                </option>

                            </select>

                        </div>


                        {/* Location */}

                        <div>

                            <label className="block text-sm font-medium mb-2">
                                Location
                            </label>

                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="India"
                                className="w-full border rounded-lg px-4 py-3"
                            />

                        </div>


                        {/* Dates */}

                        <div className="grid md:grid-cols-2 gap-5">

                            <div>

                                <label className="block text-sm font-medium mb-2">
                                    Start Date
                                </label>

                                <input
                                    type="date"
                                    name="startDate"
                                    value={formData.startDate}
                                    onChange={handleChange}
                                    required
                                    className="w-full border rounded-lg px-4 py-3"
                                />

                            </div>


                            <div>

                                <label className="block text-sm font-medium mb-2">
                                    End Date
                                </label>

                                <input
                                    type="date"
                                    name="endDate"
                                    value={formData.endDate}
                                    onChange={handleChange}
                                    disabled={
                                        formData.currentlyWorking
                                    }
                                    className="w-full border rounded-lg px-4 py-3 disabled:bg-gray-100"
                                />

                            </div>

                        </div>


                        {/* Current Job */}

                        <div className="flex items-center gap-3">

                            <input
                                type="checkbox"
                                name="currentlyWorking"
                                checked={
                                    formData.currentlyWorking
                                }
                                onChange={handleChange}
                                className="w-4 h-4"
                            />

                            <label className="text-sm">
                                I currently work here
                            </label>

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
                                rows="6"
                                required
                                placeholder="Describe your responsibilities and achievements..."
                                className="w-full border rounded-lg px-4 py-3 resize-none"
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
                                value={
                                    formData.technologies
                                }
                                onChange={handleChange}
                                placeholder="JavaScript, Node.js, Express.js, MongoDB"
                                className="w-full border rounded-lg px-4 py-3"
                            />

                            <p className="text-xs text-gray-500 mt-1">
                                Separate technologies with commas.
                            </p>

                        </div>


                        {/* Buttons */}

                        <div className="flex gap-3 pt-4">

                            <button
                                type="submit"
                                className="px-6 py-3 bg-black text-white rounded-lg"
                            >
                                {editingExperience
                                    ? "Update Experience"
                                    : "Create Experience"}
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
                    Loading experiences...
                </p>
            )}


            {/* Empty */}

            {!loading &&
                experiences.length === 0 && (

                    <div className="bg-white border rounded-xl p-10 text-center">

                        <p className="text-gray-500">
                            No experiences found.
                        </p>

                        <button
                            onClick={handleAdd}
                            className="mt-4 px-5 py-2 bg-black text-white rounded-lg"
                        >
                            Add Your First Experience
                        </button>

                    </div>
                )}


            {/* Experiences List */}

            {!loading &&
                experiences.length > 0 && (

                    <div className="space-y-5">

                        {experiences.map((experience) => (

                            <div
                                key={experience._id}
                                className="bg-white border rounded-2xl p-6"
                            >

                                <div className="flex flex-col md:flex-row md:justify-between gap-4">

                                    <div>

                                        <h3 className="text-xl font-bold">
                                            {experience.position}
                                        </h3>

                                        <p className="text-lg mt-1">
                                            {experience.company}
                                        </p>

                                        <p className="text-sm text-gray-500 mt-1">
                                            {experience.employmentType}

                                            {experience.location &&
                                                ` • ${experience.location}`}
                                        </p>

                                    </div>


                                    <div className="text-sm text-gray-500">

                                        {formatDate(
                                            experience.startDate
                                        )}

                                        {" - "}

                                        {experience.currentlyWorking
                                            ? "Present"
                                            : formatDate(
                                                experience.endDate
                                            )}

                                    </div>

                                </div>


                                <p className="text-gray-600 leading-7 mt-5">
                                    {experience.description}
                                </p>


                                <div className="flex flex-wrap gap-2 mt-5">

                                    {experience.technologies?.map(
                                        (technology, index) => (

                                            <span
                                                key={index}
                                                className="text-xs border px-3 py-1 rounded-full"
                                            >
                                                {technology}
                                            </span>

                                        )
                                    )}

                                </div>


                                <div className="flex gap-3 mt-6">

                                    <button
                                        onClick={() =>
                                            handleEdit(
                                                experience
                                            )
                                        }
                                        className="px-4 py-2 border rounded-lg"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleDelete(
                                                experience._id
                                            )
                                        }
                                        className="px-4 py-2 bg-red-600 text-white rounded-lg"
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>
                )}

        </div>
    );
};

export default ExperienceManager;