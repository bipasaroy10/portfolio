import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api";

const emptyForm = {
    company: "",
    position: "",
    employmentType: "Internship",
    location: "",
    startDate: "",
    endDate: "",
    currentlyWorking: false,
    description: "",
    technologies: ""
};

const ExperienceManager = () => {

    const [experiences, setExperiences] = useState([]);

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [deletingId, setDeletingId] = useState(null);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");

    const [showForm, setShowForm] = useState(false);

    const [editingExperience, setEditingExperience] =
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
    // LOAD EXPERIENCES
    // =====================================================

    const loadExperiences = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await fetch(
                `${API_URL}/experiences`
            );

            const data =
                await response.json();

            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Failed to load experiences"
                );

            }

            setExperiences(
                data.data || []
            );

        } catch (error) {

            console.error(
                "Load experience error:",
                error
            );

            setError(
                error.message ||
                "Failed to load experiences"
            );

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        loadExperiences();

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
    // RESET
    // =====================================================

    const resetForm = () => {

        setFormData({
            ...emptyForm
        });

        setEditingExperience(null);

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

    const handleEdit = (experience) => {

        setError("");
        setSuccess("");

        setEditingExperience(experience);


        const formatDateForInput = (date) => {

            if (!date) {
                return "";
            }

            return new Date(date)
                .toISOString()
                .split("T")[0];

        };


        setFormData({

            company:
                experience.company || "",

            position:
                experience.position || "",

            employmentType:
                experience.employmentType ||
                "Internship",

            location:
                experience.location || "",

            startDate:
                formatDateForInput(
                    experience.startDate
                ),

            endDate:
                formatDateForInput(
                    experience.endDate
                ),

            currentlyWorking:
                experience.currentlyWorking ||
                false,

            description:
                experience.description || "",

            technologies:
                Array.isArray(
                    experience.technologies
                )
                    ? experience.technologies.join(
                        ", "
                    )
                    : ""

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
    // SUBMIT
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


            const technologies =
                formData.technologies
                    .split(",")
                    .map(
                        (item) =>
                            item.trim()
                    )
                    .filter(Boolean);


            const payload = {

                company:
                    formData.company.trim(),

                position:
                    formData.position.trim(),

                employmentType:
                    formData.employmentType,

                location:
                    formData.location.trim(),

                startDate:
                    formData.startDate,

                endDate:
                    formData.currentlyWorking
                        ? null
                        : (
                            formData.endDate ||
                            null
                        ),

                currentlyWorking:
                    formData.currentlyWorking,

                description:
                    formData.description.trim(),

                technologies

            };


            const isEditing =
                Boolean(editingExperience);


            const url = isEditing

                ? `${API_URL}/experiences/${editingExperience._id}`

                : `${API_URL}/experiences`;


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
                    "Failed to save experience"
                );

            }


            setSuccess(

                isEditing
                    ? "Experience updated successfully."
                    : "Experience created successfully."

            );


            setShowForm(false);

            resetForm();

            await loadExperiences();


        } catch (error) {

            console.error(
                "Save experience error:",
                error
            );

            setError(
                error.message ||
                "Failed to save experience"
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
                "Are you sure you want to delete this experience?"
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
                    `${API_URL}/experiences/${id}`,
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
                    "Failed to delete experience"
                );

            }


            setSuccess(
                "Experience deleted successfully."
            );


            await loadExperiences();


        } catch (error) {

            console.error(
                "Delete experience error:",
                error
            );

            setError(
                error.message ||
                "Failed to delete experience"
            );

        } finally {

            setDeletingId(null);

        }

    };


    // =====================================================
    // DATE FORMAT
    // =====================================================

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
                        text-pink-400
                        font-semibold
                        mb-2
                    ">
                        Career Management
                    </div>


                    <h2 className="
                        text-3xl
                        sm:text-4xl
                        font-bold
                        text-white
                    ">
                        Experience
                    </h2>


                    <p className="
                        mt-2
                        text-sm
                        text-zinc-500
                    ">
                        Manage your professional
                        experience and career timeline.
                    </p>

                </div>


                <button
                    type="button"
                    onClick={handleAdd}
                    className="
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
                        via-fuchsia-500
                        to-pink-500
                        shadow-[0_0_25px_rgba(236,72,153,0.16)]
                        transition-all
                        duration-300
                        hover:-translate-y-0.5
                        hover:shadow-[0_0_35px_rgba(236,72,153,0.22)]
                    "
                >

                    <span className="text-lg">
                        +
                    </span>

                    Add Experience

                </button>

            </div>


            {/* =================================================
                SUCCESS
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

                    ✓ {success}

                </div>

            )}


            {/* =================================================
                ERROR
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

                    ! {error}

                </div>

            )}


            {/* =================================================
                FORM
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


                    {/* FORM HEADER */}

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
                                {editingExperience
                                    ? "Edit Experience"
                                    : "New Experience"}
                            </p>


                            <h3 className="
                                mt-1
                                text-xl
                                font-bold
                                text-white
                            ">
                                {editingExperience
                                    ? "Update career details"
                                    : "Add professional experience"}
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


                            {/* COMPANY */}

                            <div>

                                <label className="
                                    mb-2
                                    block
                                    text-sm
                                    font-medium
                                    text-zinc-300
                                ">
                                    Company
                                </label>


                                <input
                                    type="text"
                                    name="company"
                                    value={
                                        formData.company
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                    placeholder="IEMA Research & Development"
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


                            {/* POSITION */}

                            <div>

                                <label className="
                                    mb-2
                                    block
                                    text-sm
                                    font-medium
                                    text-zinc-300
                                ">
                                    Position
                                </label>


                                <input
                                    type="text"
                                    name="position"
                                    value={
                                        formData.position
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                    placeholder="Backend Developer Intern"
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


                            {/* EMPLOYMENT TYPE */}

                            <div>

                                <label className="
                                    mb-2
                                    block
                                    text-sm
                                    font-medium
                                    text-zinc-300
                                ">
                                    Employment Type
                                </label>


                                <select
                                    name="employmentType"
                                    value={
                                        formData.employmentType
                                    }
                                    onChange={
                                        handleChange
                                    }
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
                                        transition
                                        focus:border-purple-400/50
                                    "
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


                            {/* LOCATION */}

                            <div>

                                <label className="
                                    mb-2
                                    block
                                    text-sm
                                    font-medium
                                    text-zinc-300
                                ">
                                    Location
                                </label>


                                <input
                                    type="text"
                                    name="location"
                                    value={
                                        formData.location
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Kolkata, India / Remote"
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

                            </div>


                            {/* START DATE */}

                            <div>

                                <label className="
                                    mb-2
                                    block
                                    text-sm
                                    font-medium
                                    text-zinc-300
                                ">
                                    Start Date
                                </label>


                                <input
                                    type="date"
                                    name="startDate"
                                    value={
                                        formData.startDate
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
                                        bg-black/30
                                        px-4
                                        py-3
                                        text-sm
                                        text-white
                                        outline-none
                                        transition
                                        focus:border-purple-400/50
                                    "
                                />

                            </div>


                            {/* END DATE */}

                            <div>

                                <label className="
                                    mb-2
                                    block
                                    text-sm
                                    font-medium
                                    text-zinc-300
                                ">
                                    End Date
                                </label>


                                <input
                                    type="date"
                                    name="endDate"
                                    value={
                                        formData.endDate
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    disabled={
                                        formData.currentlyWorking
                                    }
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
                                        transition
                                        disabled:cursor-not-allowed
                                        disabled:opacity-30
                                        focus:border-cyan-400/50
                                    "
                                />

                            </div>


                            {/* CURRENTLY WORKING */}

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
                                        name="currentlyWorking"
                                        checked={
                                            formData.currentlyWorking
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        className="
                                            h-5
                                            w-5
                                            accent-cyan-400
                                        "
                                    />


                                    <div>

                                        <p className="
                                            text-sm
                                            font-medium
                                            text-white
                                        ">
                                            I currently work here
                                        </p>

                                        <p className="
                                            mt-1
                                            text-xs
                                            text-zinc-600
                                        ">
                                            End date will be
                                            automatically shown
                                            as Present.
                                        </p>

                                    </div>

                                </label>

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
                                    value={
                                        formData.description
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                    rows="6"
                                    placeholder="Describe your responsibilities, achievements and contributions..."
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
                                    value={
                                        formData.technologies
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Node.js, Express.js, MongoDB, REST API"
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
                                    "
                                />


                                <p className="
                                    mt-2
                                    text-xs
                                    text-zinc-600
                                ">
                                    Separate technologies
                                    using commas.
                                </p>

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
                                    via-fuchsia-500
                                    to-pink-500
                                    px-7
                                    py-3
                                    text-sm
                                    font-semibold
                                    text-white
                                    transition-all
                                    hover:-translate-y-0.5
                                    hover:shadow-[0_0_30px_rgba(236,72,153,0.20)]
                                    disabled:cursor-not-allowed
                                    disabled:opacity-50
                                "
                            >

                                {saving
                                    ? "Saving..."
                                    : editingExperience
                                        ? "Update Experience"
                                        : "Create Experience"}

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
                    space-y-5
                ">

                    {[1, 2, 3].map(
                        (item) => (

                            <div
                                key={item}
                                className="
                                    h-48
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
                experiences.length === 0 && (

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
                            border-pink-400/20
                            bg-pink-500/[0.08]
                            text-2xl
                            text-pink-300
                        ">
                            ◉
                        </div>


                        <h3 className="
                            mt-5
                            text-xl
                            font-bold
                            text-white
                        ">
                            No experience added
                        </h3>


                        <p className="
                            mx-auto
                            mt-2
                            max-w-md
                            text-sm
                            leading-6
                            text-zinc-600
                        ">
                            Add your internship,
                            employment or freelance
                            experience.
                        </p>


                        <button
                            type="button"
                            onClick={handleAdd}
                            className="
                                mt-6
                                rounded-xl
                                bg-gradient-to-r
                                from-purple-600
                                to-pink-500
                                px-6
                                py-3
                                text-sm
                                font-semibold
                                text-white
                                transition
                                hover:-translate-y-0.5
                            "
                        >
                            + Add Experience
                        </button>

                    </div>

                )}


            {/* =================================================
                EXPERIENCE TIMELINE
            ================================================= */}

            {!loading &&
                experiences.length > 0 && (

                    <div className="
                        relative
                        space-y-6
                    ">


                        {/* TIMELINE LINE */}

                        <div className="
                            absolute
                            left-[18px]
                            top-8
                            bottom-8
                            hidden
                            w-px
                            bg-gradient-to-b
                            from-purple-500
                            via-pink-500/50
                            to-transparent
                            sm:block
                        " />


                        {experiences.map(
                            (experience) => (

                                <article
                                    key={
                                        experience._id
                                    }
                                    className="
                                        group
                                        relative
                                        rounded-2xl
                                        border
                                        border-white/[0.07]
                                        bg-white/[0.025]
                                        p-6
                                        pl-6
                                        backdrop-blur-xl
                                        transition-all
                                        duration-300
                                        hover:-translate-y-1
                                        hover:border-purple-400/20
                                        hover:bg-white/[0.04]
                                        hover:shadow-[0_20px_60px_rgba(0,0,0,0.30)]
                                        sm:pl-16
                                    "
                                >


                                    {/* TIMELINE DOT */}

                                    <div className="
                                        absolute
                                        left-[10px]
                                        top-8
                                        hidden
                                        h-[17px]
                                        w-[17px]
                                        rounded-full
                                        border
                                        border-purple-300/50
                                        bg-[#09090b]
                                        shadow-[0_0_18px_rgba(139,92,246,0.50)]
                                        sm:block
                                    ">

                                        <div className="
                                            absolute
                                            inset-[4px]
                                            rounded-full
                                            bg-gradient-to-r
                                            from-purple-400
                                            to-cyan-400
                                        " />

                                    </div>


                                    {/* TOP */}

                                    <div className="
                                        flex
                                        flex-col
                                        gap-4
                                        md:flex-row
                                        md:items-start
                                        md:justify-between
                                    ">

                                        <div>

                                            <span className="
                                                inline-flex
                                                rounded-full
                                                border
                                                border-purple-400/15
                                                bg-purple-500/[0.07]
                                                px-3
                                                py-1
                                                text-[11px]
                                                font-semibold
                                                text-purple-300
                                            ">
                                                {
                                                    experience.employmentType ||
                                                    "Experience"
                                                }
                                            </span>


                                            <h3 className="
                                                mt-3
                                                text-xl
                                                font-bold
                                                text-white
                                                sm:text-2xl
                                            ">
                                                {
                                                    experience.position
                                                }
                                            </h3>


                                            <p className="
                                                mt-1
                                                text-base
                                                font-medium
                                                text-cyan-300
                                            ">
                                                {
                                                    experience.company
                                                }
                                            </p>


                                            {experience.location && (

                                                <p className="
                                                    mt-1
                                                    text-sm
                                                    text-zinc-600
                                                ">
                                                    📍 {
                                                        experience.location
                                                    }
                                                </p>

                                            )}

                                        </div>


                                        {/* DATE */}

                                        <div className="
                                            shrink-0
                                            rounded-xl
                                            border
                                            border-white/[0.07]
                                            bg-black/20
                                            px-4
                                            py-3
                                            text-sm
                                            text-zinc-400
                                        ">

                                            {formatDate(
                                                experience.startDate
                                            )}

                                            {" — "}

                                            {experience.currentlyWorking
                                                ? "Present"
                                                : formatDate(
                                                    experience.endDate
                                                )}

                                        </div>

                                    </div>


                                    {/* DESCRIPTION */}

                                    <p className="
                                        mt-6
                                        max-w-4xl
                                        text-sm
                                        leading-7
                                        text-zinc-500
                                    ">
                                        {
                                            experience.description
                                        }
                                    </p>


                                    {/* TECHNOLOGIES */}

                                    {experience.technologies?.length >
                                        0 && (

                                        <div className="
                                            mt-6
                                            flex
                                            flex-wrap
                                            gap-2
                                        ">

                                            {experience.technologies.map(
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
                                                            border-cyan-400/10
                                                            bg-cyan-400/[0.05]
                                                            px-3
                                                            py-1
                                                            text-[11px]
                                                            font-medium
                                                            text-cyan-300
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


                                    {/* ACTIONS */}

                                    <div className="
                                        mt-6
                                        flex
                                        gap-2
                                        border-t
                                        border-white/[0.06]
                                        pt-5
                                    ">

                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleEdit(
                                                    experience
                                                )
                                            }
                                            className="
                                                rounded-lg
                                                border
                                                border-white/[0.07]
                                                bg-white/[0.02]
                                                px-4
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
                                                    experience._id
                                                )
                                            }
                                            disabled={
                                                deletingId ===
                                                experience._id
                                            }
                                            className="
                                                rounded-lg
                                                border
                                                border-red-400/10
                                                bg-red-500/[0.04]
                                                px-4
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
                                            experience._id
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

export default ExperienceManager;