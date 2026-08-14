import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api";

const emptyForm = {
    title: "",
    description: "",
    technologies: "",
    github: "",
    liveDemo: "",
    image: "",
    featured: false
};


const ProjectManager = () => {

    const [projects, setProjects] = useState([]);

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [deletingId, setDeletingId] = useState(null);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");

    const [showForm, setShowForm] = useState(false);

    const [editingProject, setEditingProject] =
        useState(null);

    const [formData, setFormData] =
        useState(emptyForm);


    // =====================================================
    // TOKEN
    // =====================================================

    const getToken = () => {

        return (
            localStorage.getItem("adminToken") ||
            localStorage.getItem("token")
        );

    };


    // =====================================================
    // LOAD PROJECTS
    // =====================================================

    const loadProjects = async () => {

        try {

            setLoading(true);
            setError("");

            const token = getToken();

            const response = await fetch(
                `${API_URL}/projects`,
                {
                    headers: token
                        ? {
                            Authorization:
                                `Bearer ${token}`
                        }
                        : {}
                }
            );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Failed to load projects"
                );

            }


            setProjects(
                data.data || []
            );

        } catch (error) {

            console.error(
                "Load projects error:",
                error
            );

            setError(
                error.message ||
                "Failed to load projects"
            );

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        loadProjects();

    }, []);


    // =====================================================
    // FORM CHANGE
    // =====================================================

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


    // =====================================================
    // RESET FORM
    // =====================================================

    const resetForm = () => {

        setFormData({
            ...emptyForm
        });

        setEditingProject(null);

    };


    // =====================================================
    // ADD PROJECT
    // =====================================================

    const handleAdd = () => {

        setError("");
        setSuccess("");

        resetForm();

        setShowForm(true);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };


    // =====================================================
    // EDIT PROJECT
    // =====================================================

    const handleEdit = (project) => {

        setError("");
        setSuccess("");

        setEditingProject(project);


        setFormData({

            title:
                project.title || "",

            description:
                project.description || "",

            technologies:
                Array.isArray(
                    project.technologies
                )
                    ? project.technologies.join(
                        ", "
                    )
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


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };


    // =====================================================
    // CLOSE FORM
    // =====================================================

    const handleCancel = () => {

        setShowForm(false);

        resetForm();

        setError("");

    };


    // =====================================================
    // CREATE / UPDATE PROJECT
    // =====================================================

    const handleSubmit = async (e) => {

        e.preventDefault();


        try {

            setSaving(true);

            setError("");
            setSuccess("");


            const token = getToken();


            if (!token) {

                throw new Error(
                    "Admin authentication token is missing. Please login again."
                );

            }


            // Convert comma-separated
            // technologies into array

            const technologies =
                formData.technologies
                    .split(",")
                    .map(
                        (item) =>
                            item.trim()
                    )
                    .filter(Boolean);


            const payload = {

                title:
                    formData.title.trim(),

                description:
                    formData.description.trim(),

                technologies,

                github:
                    formData.github.trim(),

                liveDemo:
                    formData.liveDemo.trim(),

                image:
                    formData.image.trim(),

                featured:
                    formData.featured

            };


            const isEditing =
                Boolean(editingProject);


            const url = isEditing

                ? `${API_URL}/projects/${editingProject._id}`

                : `${API_URL}/projects`;


            const method = isEditing
                ? "PUT"
                : "POST";


            const response =
                await fetch(
                    url,
                    {

                        method,

                        headers: {

                            "Content-Type":
                                "application/json",

                            Authorization:
                                `Bearer ${token}`

                        },

                        body:
                            JSON.stringify(
                                payload
                            )

                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Failed to save project"
                );

            }


            setSuccess(

                isEditing

                    ? "Project updated successfully."

                    : "Project created successfully."

            );


            setShowForm(false);

            resetForm();


            await loadProjects();


        } catch (error) {

            console.error(
                "Save project error:",
                error
            );


            setError(
                error.message ||
                "Failed to save project"
            );

        } finally {

            setSaving(false);

        }

    };


    // =====================================================
    // DELETE PROJECT
    // =====================================================

    const handleDelete = async (id) => {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this project?"
            );


        if (!confirmed) {
            return;
        }


        try {

            setDeletingId(id);

            setError("");
            setSuccess("");


            const token = getToken();


            if (!token) {

                throw new Error(
                    "Admin authentication token is missing. Please login again."
                );

            }


            const response =
                await fetch(
                    `${API_URL}/projects/${id}`,
                    {

                        method: "DELETE",

                        headers: {

                            Authorization:
                                `Bearer ${token}`

                        }

                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Failed to delete project"
                );

            }


            setSuccess(
                "Project deleted successfully."
            );


            await loadProjects();


        } catch (error) {

            console.error(
                "Delete project error:",
                error
            );


            setError(
                error.message ||
                "Failed to delete project"
            );

        } finally {

            setDeletingId(null);

        }

    };


    // =====================================================
    // RENDER
    // =====================================================

    return (

        <div className="w-full">


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="
                flex
                flex-col
                gap-5
                sm:flex-row
                sm:items-center
                sm:justify-between
                mb-8
            ">

                <div>

                    <div className="
                        text-xs
                        uppercase
                        tracking-[0.22em]
                        text-purple-400
                        font-semibold
                        mb-2
                    ">
                        Portfolio Management
                    </div>


                    <h2 className="
                        text-3xl
                        sm:text-4xl
                        font-bold
                        text-white
                    ">
                        Projects
                    </h2>


                    <p className="
                        mt-2
                        text-sm
                        text-zinc-500
                    ">
                        Create, update and manage
                        your portfolio projects.
                    </p>

                </div>


                <button
                    type="button"
                    onClick={handleAdd}
                    className="
                        group
                        inline-flex
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        px-5
                        py-3
                        font-semibold
                        text-white
                        bg-gradient-to-r
                        from-purple-600
                        to-cyan-500
                        shadow-[0_0_25px_rgba(139,92,246,0.18)]
                        transition-all
                        duration-300
                        hover:-translate-y-0.5
                        hover:shadow-[0_0_35px_rgba(34,211,238,0.20)]
                    "
                >

                    <span className="
                        text-lg
                        leading-none
                    ">
                        +
                    </span>

                    Add Project

                </button>

            </div>


            {/* =================================================
                SUCCESS MESSAGE
            ================================================= */}

            {success && (

                <div className="
                    mb-6
                    rounded-xl
                    border
                    border-emerald-400/20
                    bg-emerald-500/[0.08]
                    px-5
                    py-4
                    text-sm
                    text-emerald-300
                ">

                    <div className="
                        flex
                        items-center
                        gap-3
                    ">

                        <span className="
                            flex
                            h-7
                            w-7
                            items-center
                            justify-center
                            rounded-full
                            bg-emerald-400/10
                        ">
                            ✓
                        </span>

                        {success}

                    </div>

                </div>

            )}


            {/* =================================================
                ERROR MESSAGE
            ================================================= */}

            {error && (

                <div className="
                    mb-6
                    rounded-xl
                    border
                    border-red-400/20
                    bg-red-500/[0.07]
                    px-5
                    py-4
                    text-sm
                    text-red-300
                ">

                    <div className="
                        flex
                        items-center
                        gap-3
                    ">

                        <span className="
                            flex
                            h-7
                            w-7
                            items-center
                            justify-center
                            rounded-full
                            bg-red-400/10
                        ">
                            !
                        </span>

                        {error}

                    </div>

                </div>

            )}


            {/* =================================================
                ADD / EDIT FORM
            ================================================= */}

            {showForm && (

                <div className="
                    mb-10
                    overflow-hidden
                    rounded-2xl
                    border
                    border-white/[0.08]
                    bg-white/[0.025]
                    shadow-[0_25px_80px_rgba(0,0,0,0.30)]
                    backdrop-blur-xl
                ">

                    {/* Form Header */}

                    <div className="
                        flex
                        items-center
                        justify-between
                        border-b
                        border-white/[0.06]
                        px-6
                        py-5
                        sm:px-8
                    ">

                        <div>

                            <p className="
                                text-xs
                                uppercase
                                tracking-[0.18em]
                                text-cyan-400
                                font-semibold
                            ">
                                {editingProject
                                    ? "Edit Project"
                                    : "New Project"}
                            </p>


                            <h3 className="
                                mt-1
                                text-xl
                                font-bold
                                text-white
                            ">
                                {editingProject
                                    ? "Update project details"
                                    : "Add a new project"}
                            </h3>

                        </div>


                        <button
                            type="button"
                            onClick={handleCancel}
                            className="
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-lg
                                border
                                border-white/[0.08]
                                bg-white/[0.03]
                                text-zinc-400
                                transition
                                hover:border-pink-400/30
                                hover:bg-pink-400/[0.08]
                                hover:text-pink-300
                            "
                        >
                            ×
                        </button>

                    </div>


                    <form
                        onSubmit={handleSubmit}
                        className="p-6 sm:p-8"
                    >

                        <div className="
                            grid
                            grid-cols-1
                            lg:grid-cols-2
                            gap-6
                        ">


                            {/* TITLE */}

                            <div className="lg:col-span-2">

                                <label className="
                                    mb-2
                                    block
                                    text-sm
                                    font-medium
                                    text-zinc-300
                                ">
                                    Project Title
                                </label>


                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    placeholder="Email Sender API"
                                    className="
                                        admin-input
                                        w-full
                                        rounded-xl
                                        border
                                        border-white/[0.08]
                                        bg-black/30
                                        px-4
                                        py-3
                                        text-sm
                                        text-white
                                        outline-none
                                        placeholder:text-zinc-700
                                        transition
                                        focus:border-purple-400/50
                                        focus:ring-2
                                        focus:ring-purple-500/10
                                    "
                                />

                            </div>


                            {/* DESCRIPTION */}

                            <div className="lg:col-span-2">

                                <label className="
                                    mb-2
                                    block
                                    text-sm
                                    font-medium
                                    text-zinc-300
                                ">
                                    Description
                                </label>


                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    rows="6"
                                    placeholder="Describe the project, your responsibilities and the main features..."
                                    className="
                                        w-full
                                        resize-none
                                        rounded-xl
                                        border
                                        border-white/[0.08]
                                        bg-black/30
                                        px-4
                                        py-3
                                        text-sm
                                        leading-6
                                        text-white
                                        outline-none
                                        placeholder:text-zinc-700
                                        transition
                                        focus:border-purple-400/50
                                        focus:ring-2
                                        focus:ring-purple-500/10
                                    "
                                />

                            </div>


                            {/* TECHNOLOGIES */}

                            <div className="lg:col-span-2">

                                <label className="
                                    mb-2
                                    block
                                    text-sm
                                    font-medium
                                    text-zinc-300
                                ">
                                    Technologies
                                </label>


                                <input
                                    type="text"
                                    name="technologies"
                                    value={formData.technologies}
                                    onChange={handleChange}
                                    placeholder="Node.js, Express.js, MongoDB, React"
                                    className="
                                        w-full
                                        rounded-xl
                                        border
                                        border-white/[0.08]
                                        bg-black/30
                                        px-4
                                        py-3
                                        text-sm
                                        text-white
                                        outline-none
                                        placeholder:text-zinc-700
                                        transition
                                        focus:border-cyan-400/50
                                        focus:ring-2
                                        focus:ring-cyan-400/10
                                    "
                                />


                                <p className="
                                    mt-2
                                    text-xs
                                    text-zinc-600
                                ">
                                    Separate technologies using commas.
                                </p>

                            </div>


                            {/* GITHUB */}

                            <div>

                                <label className="
                                    mb-2
                                    block
                                    text-sm
                                    font-medium
                                    text-zinc-300
                                ">
                                    GitHub URL
                                </label>


                                <input
                                    type="url"
                                    name="github"
                                    value={formData.github}
                                    onChange={handleChange}
                                    placeholder="https://github.com/username/project"
                                    className="
                                        w-full
                                        rounded-xl
                                        border
                                        border-white/[0.08]
                                        bg-black/30
                                        px-4
                                        py-3
                                        text-sm
                                        text-white
                                        outline-none
                                        placeholder:text-zinc-700
                                        transition
                                        focus:border-purple-400/50
                                        focus:ring-2
                                        focus:ring-purple-500/10
                                    "
                                />

                            </div>


                            {/* LIVE DEMO */}

                            <div>

                                <label className="
                                    mb-2
                                    block
                                    text-sm
                                    font-medium
                                    text-zinc-300
                                ">
                                    Live Demo URL
                                </label>


                                <input
                                    type="url"
                                    name="liveDemo"
                                    value={formData.liveDemo}
                                    onChange={handleChange}
                                    placeholder="https://yourproject.com"
                                    className="
                                        w-full
                                        rounded-xl
                                        border
                                        border-white/[0.08]
                                        bg-black/30
                                        px-4
                                        py-3
                                        text-sm
                                        text-white
                                        outline-none
                                        placeholder:text-zinc-700
                                        transition
                                        focus:border-cyan-400/50
                                        focus:ring-2
                                        focus:ring-cyan-400/10
                                    "
                                />

                            </div>


                            {/* IMAGE */}

                            <div className="lg:col-span-2">

                                <label className="
                                    mb-2
                                    block
                                    text-sm
                                    font-medium
                                    text-zinc-300
                                ">
                                    Project Image URL
                                </label>


                                <input
                                    type="url"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleChange}
                                    placeholder="https://res.cloudinary.com/..."
                                    className="
                                        w-full
                                        rounded-xl
                                        border
                                        border-white/[0.08]
                                        bg-black/30
                                        px-4
                                        py-3
                                        text-sm
                                        text-white
                                        outline-none
                                        placeholder:text-zinc-700
                                        transition
                                        focus:border-pink-400/50
                                        focus:ring-2
                                        focus:ring-pink-400/10
                                    "
                                />


                                {/* IMAGE PREVIEW */}

                                {formData.image && (

                                    <div className="
                                        mt-4
                                        overflow-hidden
                                        rounded-xl
                                        border
                                        border-white/[0.08]
                                        bg-black/30
                                    ">

                                        <img
                                            src={formData.image}
                                            alt="Project preview"
                                            className="
                                                h-44
                                                w-full
                                                object-cover
                                            "
                                            onError={(e) => {
                                                e.currentTarget.style.display =
                                                    "none";
                                            }}
                                        />

                                    </div>

                                )}

                            </div>


                            {/* FEATURED */}

                            <div className="
                                lg:col-span-2
                                rounded-xl
                                border
                                border-white/[0.07]
                                bg-white/[0.02]
                                p-4
                            ">

                                <label className="
                                    flex
                                    cursor-pointer
                                    items-center
                                    gap-4
                                ">

                                    <input
                                        type="checkbox"
                                        name="featured"
                                        checked={
                                            formData.featured
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        className="
                                            h-5
                                            w-5
                                            accent-purple-500
                                        "
                                    />


                                    <div>

                                        <p className="
                                            text-sm
                                            font-medium
                                            text-white
                                        ">
                                            Featured Project
                                        </p>

                                        <p className="
                                            mt-1
                                            text-xs
                                            text-zinc-600
                                        ">
                                            Highlight this project
                                            on your public portfolio.
                                        </p>

                                    </div>

                                </label>

                            </div>

                        </div>


                        {/* FORM ACTIONS */}

                        <div className="
                            mt-8
                            flex
                            flex-col-reverse
                            gap-3
                            sm:flex-row
                            sm:justify-end
                        ">

                            <button
                                type="button"
                                onClick={handleCancel}
                                disabled={saving}
                                className="
                                    rounded-xl
                                    border
                                    border-white/[0.08]
                                    bg-white/[0.025]
                                    px-6
                                    py-3
                                    text-sm
                                    font-semibold
                                    text-zinc-400
                                    transition
                                    hover:bg-white/[0.06]
                                    hover:text-white
                                    disabled:opacity-50
                                "
                            >
                                Cancel
                            </button>


                            <button
                                type="submit"
                                disabled={saving}
                                className="
                                    rounded-xl
                                    bg-gradient-to-r
                                    from-purple-600
                                    to-cyan-500
                                    px-7
                                    py-3
                                    text-sm
                                    font-semibold
                                    text-white
                                    shadow-[0_0_25px_rgba(139,92,246,0.16)]
                                    transition-all
                                    hover:-translate-y-0.5
                                    hover:shadow-[0_0_35px_rgba(34,211,238,0.18)]
                                    disabled:cursor-not-allowed
                                    disabled:opacity-50
                                "
                            >

                                {saving
                                    ? "Saving..."
                                    : editingProject
                                        ? "Update Project"
                                        : "Create Project"}

                            </button>

                        </div>

                    </form>

                </div>

            )}


            {/* =================================================
                LOADING
            ================================================= */}

            {loading && (

                <div className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    xl:grid-cols-3
                    gap-6
                ">

                    {[1, 2, 3].map(
                        (item) => (

                            <div
                                key={item}
                                className="
                                    h-[360px]
                                    animate-pulse
                                    rounded-2xl
                                    border
                                    border-white/[0.06]
                                    bg-white/[0.025]
                                "
                            />

                        )
                    )}

                </div>

            )}


            {/* =================================================
                EMPTY STATE
            ================================================= */}

            {!loading &&
                projects.length === 0 && (

                    <div className="
                        rounded-2xl
                        border
                        border-white/[0.07]
                        bg-white/[0.025]
                        px-6
                        py-16
                        text-center
                        backdrop-blur-xl
                    ">

                        <div className="
                            mx-auto
                            flex
                            h-16
                            w-16
                            items-center
                            justify-center
                            rounded-2xl
                            border
                            border-purple-400/20
                            bg-purple-500/[0.08]
                            text-2xl
                            text-purple-300
                        ">
                            ◇
                        </div>


                        <h3 className="
                            mt-5
                            text-xl
                            font-bold
                            text-white
                        ">
                            No projects yet
                        </h3>


                        <p className="
                            mx-auto
                            mt-2
                            max-w-md
                            text-sm
                            leading-6
                            text-zinc-600
                        ">
                            Add your first portfolio
                            project to start building
                            your showcase.
                        </p>


                        <button
                            type="button"
                            onClick={handleAdd}
                            className="
                                mt-6
                                rounded-xl
                                bg-gradient-to-r
                                from-purple-600
                                to-cyan-500
                                px-6
                                py-3
                                text-sm
                                font-semibold
                                text-white
                                transition
                                hover:-translate-y-0.5
                            "
                        >
                            + Add Your First Project
                        </button>

                    </div>

                )}


            {/* =================================================
                PROJECT GRID
            ================================================= */}

            {!loading &&
                projects.length > 0 && (

                    <div className="
                        grid
                        grid-cols-1
                        md:grid-cols-2
                        xl:grid-cols-3
                        gap-6
                    ">

                        {projects.map(
                            (project) => (

                                <article
                                    key={
                                        project._id
                                    }
                                    className="
                                        group
                                        overflow-hidden
                                        rounded-2xl
                                        border
                                        border-white/[0.07]
                                        bg-white/[0.025]
                                        backdrop-blur-xl
                                        transition-all
                                        duration-300
                                        hover:-translate-y-1
                                        hover:border-purple-400/20
                                        hover:shadow-[0_20px_60px_rgba(0,0,0,0.30)]
                                    "
                                >


                                    {/* IMAGE */}

                                    <div className="
                                        relative
                                        h-48
                                        overflow-hidden
                                        bg-black/30
                                    ">

                                        {project.image ? (

                                            <img
                                                src={
                                                    project.image
                                                }
                                                alt={
                                                    project.title
                                                }
                                                className="
                                                    h-full
                                                    w-full
                                                    object-cover
                                                    transition-transform
                                                    duration-500
                                                    group-hover:scale-105
                                                "
                                            />

                                        ) : (

                                            <div className="
                                                flex
                                                h-full
                                                items-center
                                                justify-center
                                                bg-gradient-to-br
                                                from-purple-950/30
                                                via-black
                                                to-cyan-950/20
                                            ">

                                                <span className="
                                                    text-3xl
                                                    text-purple-300/50
                                                ">
                                                    ◇
                                                </span>

                                            </div>

                                        )}


                                        {/* IMAGE OVERLAY */}

                                        <div className="
                                            pointer-events-none
                                            absolute
                                            inset-0
                                            bg-gradient-to-t
                                            from-black/70
                                            via-transparent
                                            to-transparent
                                        " />


                                        {/* FEATURED */}

                                        {project.featured && (

                                            <span className="
                                                absolute
                                                right-4
                                                top-4
                                                rounded-full
                                                border
                                                border-pink-400/20
                                                bg-pink-500/10
                                                px-3
                                                py-1
                                                text-[11px]
                                                font-semibold
                                                text-pink-300
                                                backdrop-blur-md
                                            ">
                                                Featured
                                            </span>

                                        )}

                                    </div>


                                    {/* CONTENT */}

                                    <div className="p-5">


                                        <h3 className="
                                            text-xl
                                            font-bold
                                            text-white
                                        ">
                                            {project.title}
                                        </h3>


                                        <p className="
                                            mt-3
                                            line-clamp-3
                                            text-sm
                                            leading-6
                                            text-zinc-500
                                        ">
                                            {
                                                project.description
                                            }
                                        </p>


                                        {/* TECHNOLOGIES */}

                                        {project.technologies?.length >
                                            0 && (

                                            <div className="
                                                mt-5
                                                flex
                                                flex-wrap
                                                gap-2
                                            ">

                                                {project.technologies.map(
                                                    (
                                                        technology,
                                                        index
                                                    ) => (

                                                        <span
                                                            key={
                                                                index
                                                            }
                                                            className="
                                                                rounded-full
                                                                border
                                                                border-purple-400/10
                                                                bg-purple-500/[0.06]
                                                                px-2.5
                                                                py-1
                                                                text-[11px]
                                                                font-medium
                                                                text-purple-300
                                                            "
                                                        >
                                                            {
                                                                technology
                                                            }
                                                        </span>

                                                    )
                                                )}

                                            </div>

                                        )}


                                        {/* LINKS */}

                                        <div className="
                                            mt-5
                                            flex
                                            gap-2
                                        ">

                                            {project.github && (

                                                <a
                                                    href={
                                                        project.github
                                                    }
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="
                                                        flex-1
                                                        rounded-lg
                                                        border
                                                        border-white/[0.07]
                                                        bg-white/[0.025]
                                                        px-3
                                                        py-2
                                                        text-center
                                                        text-xs
                                                        font-semibold
                                                        text-zinc-400
                                                        transition
                                                        hover:border-purple-400/20
                                                        hover:text-purple-300
                                                    "
                                                >
                                                    GitHub ↗
                                                </a>

                                            )}


                                            {project.liveDemo && (

                                                <a
                                                    href={
                                                        project.liveDemo
                                                    }
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="
                                                        flex-1
                                                        rounded-lg
                                                        bg-gradient-to-r
                                                        from-purple-600/80
                                                        to-cyan-500/80
                                                        px-3
                                                        py-2
                                                        text-center
                                                        text-xs
                                                        font-semibold
                                                        text-white
                                                        transition
                                                        hover:opacity-90
                                                    "
                                                >
                                                    Live Demo ↗
                                                </a>

                                            )}

                                        </div>


                                        {/* ACTIONS */}

                                        <div className="
                                            mt-3
                                            flex
                                            gap-2
                                            border-t
                                            border-white/[0.06]
                                            pt-4
                                        ">

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleEdit(
                                                        project
                                                    )
                                                }
                                                className="
                                                    flex-1
                                                    rounded-lg
                                                    border
                                                    border-white/[0.07]
                                                    bg-white/[0.02]
                                                    px-3
                                                    py-2
                                                    text-xs
                                                    font-semibold
                                                    text-zinc-400
                                                    transition
                                                    hover:border-cyan-400/20
                                                    hover:bg-cyan-400/[0.05]
                                                    hover:text-cyan-300
                                                "
                                            >
                                                Edit
                                            </button>


                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleDelete(
                                                        project._id
                                                    )
                                                }
                                                disabled={
                                                    deletingId ===
                                                    project._id
                                                }
                                                className="
                                                    flex-1
                                                    rounded-lg
                                                    border
                                                    border-red-400/10
                                                    bg-red-500/[0.04]
                                                    px-3
                                                    py-2
                                                    text-xs
                                                    font-semibold
                                                    text-red-400
                                                    transition
                                                    hover:bg-red-500/[0.10]
                                                    hover:text-red-300
                                                    disabled:cursor-not-allowed
                                                    disabled:opacity-50
                                                "
                                            >

                                                {deletingId ===
                                                project._id
                                                    ? "Deleting..."
                                                    : "Delete"}

                                            </button>

                                        </div>

                                    </div>

                                </article>

                            )
                        )}

                    </div>

                )}

        </div>

    );

};


export default ProjectManager;