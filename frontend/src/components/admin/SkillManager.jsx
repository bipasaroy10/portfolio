import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api";

const emptyForm = {
    name: "",
    category: "",
    level: "Intermediate",
    icon: ""
};

const categories = [
    "Frontend",
    "Backend",
    "Database",
    "Tools",
    "Other"
];

const levels = [
    "Beginner",
    "Intermediate",
    "Advanced"
];

const SkillManager = () => {

    const [skills, setSkills] = useState([]);

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [deletingId, setDeletingId] = useState(null);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");

    const [showForm, setShowForm] = useState(false);

    const [editingSkill, setEditingSkill] = useState(null);

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
    // LOAD SKILLS
    // =====================================================

    const loadSkills = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await fetch(
                `${API_URL}/skills`
            );

            const data =
                await response.json();

            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Failed to load skills"
                );

            }

            setSkills(data.data || []);

        } catch (error) {

            console.error(
                "Load skills error:",
                error
            );

            setError(
                error.message ||
                "Failed to load skills"
            );

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        loadSkills();

    }, []);


    // =====================================================
    // HANDLE INPUT
    // =====================================================

    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;


        setFormData((previous) => ({

            ...previous,

            [name]: value

        }));

    };


    // =====================================================
    // RESET FORM
    // =====================================================

    const resetForm = () => {

        setFormData({
            ...emptyForm
        });

        setEditingSkill(null);

    };


    // =====================================================
    // ADD
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
    // EDIT
    // =====================================================

    const handleEdit = (skill) => {

        setError("");
        setSuccess("");

        setEditingSkill(skill);


        setFormData({

            name:
                skill.name || "",

            category:
                skill.category || "",

            level:
                skill.level || "Intermediate",

            icon:
                skill.icon || ""

        });


        setShowForm(true);


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };


    // =====================================================
    // CANCEL
    // =====================================================

    const handleCancel = () => {

        setShowForm(false);

        resetForm();

        setError("");

    };


    // =====================================================
    // CREATE / UPDATE
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


            const payload = {

                name:
                    formData.name.trim(),

                category:
                    formData.category,

                level:
                    formData.level,

                icon:
                    formData.icon.trim()

            };


            const isEditing =
                Boolean(editingSkill);


            const url = isEditing

                ? `${API_URL}/skills/${editingSkill._id}`

                : `${API_URL}/skills`;


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
                    "Failed to save skill"
                );

            }


            setSuccess(

                isEditing
                    ? "Skill updated successfully."
                    : "Skill created successfully."

            );


            setShowForm(false);

            resetForm();

            await loadSkills();


        } catch (error) {

            console.error(
                "Save skill error:",
                error
            );

            setError(
                error.message ||
                "Failed to save skill"
            );

        } finally {

            setSaving(false);

        }

    };


    // =====================================================
    // DELETE
    // =====================================================

    const handleDelete = async (id) => {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this skill?"
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
                    `${API_URL}/skills/${id}`,
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
                    "Failed to delete skill"
                );

            }


            setSuccess(
                "Skill deleted successfully."
            );


            await loadSkills();


        } catch (error) {

            console.error(
                "Delete skill error:",
                error
            );

            setError(
                error.message ||
                "Failed to delete skill"
            );

        } finally {

            setDeletingId(null);

        }

    };


    // =====================================================
    // LEVEL CONFIG
    // =====================================================

    const getLevelWidth = (level) => {

        if (level === "Advanced") {
            return "90%";
        }

        if (level === "Intermediate") {
            return "65%";
        }

        return "40%";

    };


    // =====================================================
    // CATEGORY STYLE
    // =====================================================

    const getCategoryStyle = (category) => {

        switch (category) {

            case "Frontend":
                return "text-cyan-300 bg-cyan-400/[0.06] border-cyan-400/10";

            case "Backend":
                return "text-purple-300 bg-purple-500/[0.07] border-purple-400/10";

            case "Database":
                return "text-pink-300 bg-pink-500/[0.06] border-pink-400/10";

            case "Tools":
                return "text-blue-300 bg-blue-500/[0.06] border-blue-400/10";

            default:
                return "text-zinc-300 bg-white/[0.04] border-white/[0.08]";

        }

    };


    // =====================================================
    // RENDER
    // =====================================================

    return (

        <div className="w-full">


            {/* HEADER */}

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

                    <p className="
                        text-xs
                        uppercase
                        tracking-[0.22em]
                        text-cyan-400
                        font-semibold
                        mb-2
                    ">
                        Technical Expertise
                    </p>


                    <h2 className="
                        text-3xl
                        sm:text-4xl
                        font-bold
                        text-white
                    ">
                        Skills
                    </h2>


                    <p className="
                        mt-2
                        text-sm
                        text-zinc-500
                    ">
                        Manage your technical skills
                        and expertise.
                    </p>

                </div>


                <button
                    type="button"
                    onClick={handleAdd}
                    className="
                        rounded-xl
                        bg-gradient-to-r
                        from-purple-600
                        to-cyan-500
                        px-5
                        py-3
                        font-semibold
                        text-white
                        shadow-[0_0_25px_rgba(139,92,246,0.16)]
                        transition-all
                        hover:-translate-y-0.5
                        hover:shadow-[0_0_35px_rgba(34,211,238,0.18)]
                    "
                >
                    + Add Skill
                </button>

            </div>


            {/* SUCCESS */}

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
                    ✓ {success}
                </div>

            )}


            {/* ERROR */}

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
                    ! {error}
                </div>

            )}


            {/* FORM */}

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
                                text-purple-400
                                font-semibold
                            ">
                                {editingSkill
                                    ? "Edit Skill"
                                    : "New Skill"}
                            </p>


                            <h3 className="
                                mt-1
                                text-xl
                                font-bold
                                text-white
                            ">
                                {editingSkill
                                    ? "Update skill"
                                    : "Add technical skill"}
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
                            md:grid-cols-2
                            gap-6
                        ">


                            {/* NAME */}

                            <div>

                                <label className="
                                    mb-2
                                    block
                                    text-sm
                                    font-medium
                                    text-zinc-300
                                ">
                                    Skill Name
                                </label>


                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Node.js"
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


                            {/* ICON */}

                            <div>

                                <label className="
                                    mb-2
                                    block
                                    text-sm
                                    font-medium
                                    text-zinc-300
                                ">
                                    Icon
                                </label>


                                <input
                                    type="text"
                                    name="icon"
                                    value={formData.icon}
                                    onChange={handleChange}
                                    placeholder="nodejs / react / database"
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
                                    "
                                />

                                <p className="
                                    mt-2
                                    text-xs
                                    text-zinc-600
                                ">
                                    Optional. You can leave this empty.
                                </p>

                            </div>


                            {/* CATEGORY */}

                            <div>

                                <label className="
                                    mb-2
                                    block
                                    text-sm
                                    font-medium
                                    text-zinc-300
                                ">
                                    Category
                                </label>


                                <select
                                    name="category"
                                    value={
                                        formData.category
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                    className="
                                        w-full
                                        rounded-xl
                                        border
                                        border-white/[0.08]
                                        bg-[#0b0b0f]
                                        px-4
                                        py-3
                                        text-sm
                                        text-white
                                        outline-none
                                        focus:border-cyan-400/50
                                    "
                                >

                                    <option value="">
                                        Select category
                                    </option>

                                    {categories.map(
                                        (category) => (

                                            <option
                                                key={category}
                                                value={category}
                                            >
                                                {category}
                                            </option>

                                        )
                                    )}

                                </select>

                            </div>


                            {/* LEVEL */}

                            <div>

                                <label className="
                                    mb-2
                                    block
                                    text-sm
                                    font-medium
                                    text-zinc-300
                                ">
                                    Skill Level
                                </label>


                                <select
                                    name="level"
                                    value={
                                        formData.level
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                    className="
                                        w-full
                                        rounded-xl
                                        border
                                        border-white/[0.08]
                                        bg-[#0b0b0f]
                                        px-4
                                        py-3
                                        text-sm
                                        text-white
                                        outline-none
                                        focus:border-purple-400/50
                                    "
                                >

                                    {levels.map(
                                        (level) => (

                                            <option
                                                key={level}
                                                value={level}
                                            >
                                                {level}
                                            </option>

                                        )
                                    )}

                                </select>

                            </div>

                        </div>


                        {/* BUTTONS */}

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
                                    px-6
                                    py-3
                                    text-sm
                                    font-semibold
                                    text-zinc-400
                                    transition
                                    hover:bg-white/[0.05]
                                    hover:text-white
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
                                    transition
                                    hover:-translate-y-0.5
                                    disabled:opacity-50
                                "
                            >
                                {saving
                                    ? "Saving..."
                                    : editingSkill
                                        ? "Update Skill"
                                        : "Create Skill"}
                            </button>

                        </div>

                    </form>

                </div>

            )}


            {/* LOADING */}

            {loading && (

                <div className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    xl:grid-cols-3
                    gap-5
                ">

                    {[1, 2, 3, 4, 5, 6].map(
                        (item) => (

                            <div
                                key={item}
                                className="
                                    h-40
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


            {/* EMPTY */}

            {!loading &&
                skills.length === 0 && (

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
                            border-cyan-400/20
                            bg-cyan-400/[0.07]
                            text-2xl
                            text-cyan-300
                        ">
                            ✦
                        </div>


                        <h3 className="
                            mt-5
                            text-xl
                            font-bold
                            text-white
                        ">
                            No skills yet
                        </h3>


                        <p className="
                            mt-2
                            text-sm
                            text-zinc-600
                        ">
                            Add your first technical skill.
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
                            "
                        >
                            + Add Your First Skill
                        </button>

                    </div>

                )}


            {/* SKILL GRID */}

            {!loading &&
                skills.length > 0 && (

                    <div className="
                        grid
                        grid-cols-1
                        sm:grid-cols-2
                        xl:grid-cols-3
                        gap-5
                    ">

                        {skills.map(
                            (skill) => (

                                <article
                                    key={
                                        skill._id
                                    }
                                    className="
                                        group
                                        relative
                                        overflow-hidden
                                        rounded-2xl
                                        border
                                        border-white/[0.07]
                                        bg-white/[0.025]
                                        p-5
                                        backdrop-blur-xl
                                        transition-all
                                        duration-300
                                        hover:-translate-y-1
                                        hover:border-purple-400/20
                                        hover:shadow-[0_20px_60px_rgba(0,0,0,0.30)]
                                    "
                                >

                                    {/* GLOW */}

                                    <div className="
                                        pointer-events-none
                                        absolute
                                        -right-16
                                        -top-16
                                        h-32
                                        w-32
                                        rounded-full
                                        bg-purple-500/10
                                        blur-3xl
                                        transition
                                        group-hover:bg-cyan-400/10
                                    " />


                                    <div className="
                                        relative
                                        flex
                                        items-start
                                        justify-between
                                        gap-4
                                    ">


                                        {/* ICON */}

                                        <div className="
                                            flex
                                            h-12
                                            w-12
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-xl
                                            border
                                            border-purple-400/15
                                            bg-purple-500/[0.08]
                                            text-lg
                                            font-bold
                                            text-purple-300
                                        ">
                                            {skill.icon ||
                                                skill.name
                                                    ?.charAt(0)
                                                    ?.toUpperCase()}
                                        </div>


                                        {/* CATEGORY */}

                                        <span
                                            className={`
                                                rounded-full
                                                border
                                                px-3
                                                py-1
                                                text-[10px]
                                                font-semibold
                                                ${getCategoryStyle(
                                                    skill.category
                                                )}
                                            `}
                                        >
                                            {
                                                skill.category
                                            }
                                        </span>

                                    </div>


                                    {/* NAME */}

                                    <h3 className="
                                        relative
                                        mt-5
                                        text-lg
                                        font-bold
                                        text-white
                                    ">
                                        {skill.name}
                                    </h3>


                                    {/* LEVEL */}

                                    <div className="
                                        relative
                                        mt-4
                                    ">

                                        <div className="
                                            flex
                                            items-center
                                            justify-between
                                            text-xs
                                        ">

                                            <span className="
                                                text-zinc-600
                                            ">
                                                Proficiency
                                            </span>

                                            <span className="
                                                font-medium
                                                text-cyan-300
                                            ">
                                                {skill.level}
                                            </span>

                                        </div>


                                        <div className="
                                            mt-2
                                            h-1.5
                                            overflow-hidden
                                            rounded-full
                                            bg-white/[0.06]
                                        ">

                                            <div
                                                className="
                                                    h-full
                                                    rounded-full
                                                    bg-gradient-to-r
                                                    from-purple-500
                                                    via-fuchsia-500
                                                    to-cyan-400
                                                    transition-all
                                                "
                                                style={{
                                                    width:
                                                        getLevelWidth(
                                                            skill.level
                                                        )
                                                }}
                                            />

                                        </div>

                                    </div>


                                    {/* ACTIONS */}

                                    <div className="
                                        relative
                                        mt-5
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
                                                    skill
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
                                                hover:text-cyan-300
                                            "
                                        >
                                            Edit
                                        </button>


                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleDelete(
                                                    skill._id
                                                )
                                            }
                                            disabled={
                                                deletingId ===
                                                skill._id
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
                                                disabled:opacity-50
                                            "
                                        >
                                            {deletingId ===
                                            skill._id
                                                ? "Deleting..."
                                                : "Delete"}
                                        </button>

                                    </div>

                                </article>

                            )
                        )}

                    </div>

                )}

        </div>

    );

};

export default SkillManager;