import {
    useEffect,
    useState
} from "react";

import {
    getSettings,
    updateSettings,
    uploadProfileImage,
    uploadResume
} from "../../services/settingsApi";


// ============================================================
// SETTINGS MANAGER
// ============================================================

const SettingsManager = () => {


    // ========================================================
    // FORM DATA
    // ========================================================

    const [
        formData,
        setFormData
    ] = useState({

        name: "",
        title: "",
        about: "",
        email: "",
        phone: "",
        location: "",

        github: "",
        linkedin: "",
        twitter: "",
        website: "",

        resumeUrl: "",
        resumePublicId: "",

        profileImage: "",
        profileImagePublicId: ""

    });


    // ========================================================
    // FILE STATES
    // ========================================================

    const [
        profileImageFile,
        setProfileImageFile
    ] = useState(null);


    const [
        resumeFile,
        setResumeFile
    ] = useState(null);


    // ========================================================
    // LOADING STATES
    // ========================================================

    const [
        loading,
        setLoading
    ] = useState(true);


    const [
        saving,
        setSaving
    ] = useState(false);


    const [
        uploadingImage,
        setUploadingImage
    ] = useState(false);


    const [
        uploadingResume,
        setUploadingResume
    ] = useState(false);


    // ========================================================
    // MESSAGES
    // ========================================================

    const [
        message,
        setMessage
    ] = useState("");


    const [
        error,
        setError
    ] = useState("");


    // ========================================================
    // LOAD SETTINGS
    // ========================================================

    const loadSettings = async () => {

        try {

            setLoading(true);
            setError("");


            const response =
                await getSettings();


            if (
                response.success &&
                response.data
            ) {

                setFormData({
                    name:
                        response.data.name || "",

                    title:
                        response.data.title || "",

                    about:
                        response.data.about || "",

                    email:
                        response.data.email || "",

                    phone:
                        response.data.phone || "",

                    location:
                        response.data.location || "",

                    github:
                        response.data.github || "",

                    linkedin:
                        response.data.linkedin || "",

                    twitter:
                        response.data.twitter || "",

                    website:
                        response.data.website || "",

                    resumeUrl:
                        response.data.resumeUrl || "",

                    resumePublicId:
                        response.data.resumePublicId || "",

                    profileImage:
                        response.data.profileImage || "",

                    profileImagePublicId:
                        response.data.profileImagePublicId || ""
                });

            }

        } catch (error) {

            console.error(
                "Load settings error:",
                error
            );


            setError(
                error.message ||
                "Failed to load settings"
            );

        } finally {

            setLoading(false);

        }

    };


    // ========================================================
    // INITIAL LOAD
    // ========================================================

    useEffect(() => {

        loadSettings();

    }, []);


    // ========================================================
    // HANDLE INPUT
    // ========================================================

    const handleChange = (event) => {

        const {
            name,
            value
        } = event.target;


        setFormData(
            (previous) => ({
                ...previous,
                [name]: value
            })
        );

    };


    // ========================================================
    // PROFILE IMAGE SELECT
    // ========================================================

    const handleProfileImageChange = (
        event
    ) => {

        const file =
            event.target.files?.[0];


        if (!file) {
            return;
        }


        if (
            !file.type.startsWith(
                "image/"
            )
        ) {

            setError(
                "Please select a valid image file."
            );

            return;

        }


        if (
            file.size >
            5 * 1024 * 1024
        ) {

            setError(
                "Profile image must be smaller than 5MB."
            );

            return;

        }


        setProfileImageFile(file);

        setError("");
        setMessage("");

    };


    // ========================================================
    // RESUME SELECT
    // ========================================================

    const handleResumeChange = (
        event
    ) => {

        const file =
            event.target.files?.[0];


        if (!file) {
            return;
        }


        if (
            file.type !==
            "application/pdf"
        ) {

            setError(
                "Resume must be a PDF file."
            );

            return;

        }


        if (
            file.size >
            5 * 1024 * 1024
        ) {

            setError(
                "Resume must be smaller than 5MB."
            );

            return;

        }


        setResumeFile(file);

        setError("");
        setMessage("");

    };


    // ========================================================
    // UPLOAD PROFILE IMAGE
    // ========================================================

    const handleProfileImageUpload =
        async () => {

            if (!profileImageFile) {

                setError(
                    "Please select a profile image first."
                );

                return;

            }


            try {

                setUploadingImage(true);

                setError("");
                setMessage("");


                const response =
                    await uploadProfileImage(
                        profileImageFile
                    );


                if (
                    !response.success ||
                    !response.data
                ) {

                    throw new Error(
                        response.message ||
                        "Failed to upload profile image"
                    );

                }


                setFormData(
                    (previous) => ({
                        ...previous,

                        profileImage:
                            response.data.url,

                        profileImagePublicId:
                            response.data.publicId
                    })
                );


                setProfileImageFile(null);


                setMessage(
                    "Profile image uploaded successfully. Click Save Settings to save it."
                );

            } catch (error) {

                console.error(
                    "Profile image upload error:",
                    error
                );


                setError(
                    error.message ||
                    "Failed to upload profile image"
                );

            } finally {

                setUploadingImage(false);

            }

        };


    // ========================================================
    // UPLOAD RESUME
    // ========================================================

    const handleResumeUpload =
        async () => {

            if (!resumeFile) {

                setError(
                    "Please select a resume PDF first."
                );

                return;

            }


            try {

                setUploadingResume(true);

                setError("");
                setMessage("");


                const response =
                    await uploadResume(
                        resumeFile
                    );


                if (
                    !response.success ||
                    !response.data
                ) {

                    throw new Error(
                        response.message ||
                        "Failed to upload resume"
                    );

                }


                setFormData(
                    (previous) => ({
                        ...previous,

                        resumeUrl:
                            response.data.url,

                        resumePublicId:
                            response.data.publicId
                    })
                );


                setResumeFile(null);


                setMessage(
                    "Resume uploaded successfully. Click Save Settings to save it."
                );

            } catch (error) {

                console.error(
                    "Resume upload error:",
                    error
                );


                setError(
                    error.message ||
                    "Failed to upload resume"
                );

            } finally {

                setUploadingResume(false);

            }

        };


    // ========================================================
    // SAVE SETTINGS
    // ========================================================

    const handleSubmit = async (
        event
    ) => {

        event.preventDefault();


        try {

            setSaving(true);

            setError("");
            setMessage("");


            const response =
                await updateSettings(
                    formData
                );


            if (
                !response.success
            ) {

                throw new Error(
                    response.message ||
                    "Failed to update settings"
                );

            }


            if (response.data) {

                setFormData({

                    name:
                        response.data.name || "",

                    title:
                        response.data.title || "",

                    about:
                        response.data.about || "",

                    email:
                        response.data.email || "",

                    phone:
                        response.data.phone || "",

                    location:
                        response.data.location || "",

                    github:
                        response.data.github || "",

                    linkedin:
                        response.data.linkedin || "",

                    twitter:
                        response.data.twitter || "",

                    website:
                        response.data.website || "",

                    resumeUrl:
                        response.data.resumeUrl || "",

                    resumePublicId:
                        response.data.resumePublicId || "",

                    profileImage:
                        response.data.profileImage || "",

                    profileImagePublicId:
                        response.data.profileImagePublicId || ""

                });

            }


            setMessage(
                "Settings updated successfully!"
            );

        } catch (error) {

            console.error(
                "Update settings error:",
                error
            );


            setError(
                error.message ||
                "Failed to update settings"
            );

        } finally {

            setSaving(false);

        }

    };


    // ========================================================
    // LOADING
    // ========================================================

    if (loading) {

        return (

            <div
                className="
                    min-h-[60vh]
                    flex
                    items-center
                    justify-center
                "
            >

                <div
                    className="
                        text-center
                    "
                >

                    <div
                        className="
                            w-12
                            h-12
                            mx-auto
                            rounded-full
                            border-2
                            border-white/10
                            border-t-purple-400
                            border-r-cyan-400
                            animate-spin
                        "
                    />

                    <p
                        className="
                            mt-5
                            text-sm
                            text-white/50
                        "
                    >
                        Loading settings...
                    </p>

                </div>

            </div>

        );

    }


    // ========================================================
    // UI
    // ========================================================

    return (

        <div
            className="
                relative
                min-h-full
                overflow-hidden
            "
        >

            {/* ==================================================
                BACKGROUND GLOWS
            ================================================== */}

            <div
                className="
                    pointer-events-none
                    absolute
                    -top-40
                    left-1/4
                    w-[500px]
                    h-[400px]
                    rounded-full
                    bg-purple-600/10
                    blur-[120px]
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute
                    top-1/2
                    right-[-180px]
                    w-[400px]
                    h-[400px]
                    rounded-full
                    bg-cyan-500/10
                    blur-[120px]
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute
                    bottom-[-180px]
                    left-1/4
                    w-[400px]
                    h-[350px]
                    rounded-full
                    bg-pink-500/10
                    blur-[120px]
                "
            />


            <div
                className="
                    relative
                    z-10
                    p-6
                    md:p-8
                    lg:p-10
                "
            >

                {/* ==================================================
                    HEADER
                ================================================== */}

                <div
                    className="
                        mb-8
                        flex
                        flex-col
                        md:flex-row
                        md:items-end
                        md:justify-between
                        gap-5
                    "
                >

                    <div>

                        <div
                            className="
                                flex
                                items-center
                                gap-2
                                mb-3
                            "
                        >

                            <span
                                className="
                                    w-8
                                    h-px
                                    bg-gradient-to-r
                                    from-purple-400
                                    to-cyan-400
                                "
                            />

                            <span
                                className="
                                    text-xs
                                    font-semibold
                                    uppercase
                                    tracking-[0.25em]
                                    text-purple-300
                                "
                            >
                                Configuration
                            </span>

                        </div>


                        <h1
                            className="
                                text-3xl
                                md:text-4xl
                                font-bold
                                tracking-tight
                                text-white
                            "
                        >
                            Portfolio Settings
                        </h1>


                        <p
                            className="
                                mt-2
                                text-sm
                                text-white/45
                            "
                        >
                            Manage your portfolio
                            information, social links,
                            resume and profile image.
                        </p>

                    </div>


                    <button
                        type="button"
                        onClick={loadSettings}
                        className="
                            group
                            inline-flex
                            items-center
                            justify-center
                            gap-2
                            px-5
                            py-3
                            rounded-xl
                            border
                            border-white/10
                            bg-white/[0.03]
                            text-sm
                            font-medium
                            text-white/70
                            backdrop-blur-xl
                            transition-all
                            duration-300
                            hover:border-cyan-400/30
                            hover:bg-cyan-400/[0.06]
                            hover:text-cyan-300
                        "
                    >

                        <span
                            className="
                                text-lg
                                transition-transform
                                duration-500
                                group-hover:rotate-180
                            "
                        >
                            ↻
                        </span>

                        Reload

                    </button>

                </div>


                {/* ==================================================
                    SUCCESS
                ================================================== */}

                {message && (

                    <div
                        className="
                            mb-6
                            rounded-2xl
                            border
                            border-emerald-400/20
                            bg-emerald-400/[0.06]
                            px-5
                            py-4
                            text-sm
                            text-emerald-300
                        "
                    >
                        {message}
                    </div>

                )}


                {/* ==================================================
                    ERROR
                ================================================== */}

                {error && (

                    <div
                        className="
                            mb-6
                            rounded-2xl
                            border
                            border-red-400/20
                            bg-red-400/[0.06]
                            px-5
                            py-4
                            text-sm
                            text-red-300
                        "
                    >
                        {error}
                    </div>

                )}


                {/* ==================================================
                    FORM
                ================================================== */}

                <form
                    onSubmit={handleSubmit}
                    className="
                        space-y-6
                    "
                >


                    {/* ==================================================
                        PERSONAL INFORMATION
                    ================================================== */}

                    <SettingsCard
                        title="Personal Information"
                        description="Basic information displayed throughout your portfolio."
                    >

                        <div
                            className="
                                grid
                                md:grid-cols-2
                                gap-5
                            "
                        >

                            <InputField
                                label="Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Bipasa Roy"
                                required
                            />


                            <InputField
                                label="Professional Title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Backend Developer"
                                required
                            />


                            <InputField
                                label="Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="your@email.com"
                            />


                            <InputField
                                label="Phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+91 XXXXX XXXXX"
                            />


                            <div
                                className="
                                    md:col-span-2
                                "
                            >

                                <InputField
                                    label="Location"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="India"
                                />

                            </div>

                        </div>

                    </SettingsCard>


                    {/* ==================================================
                        ABOUT
                    ================================================== */}

                    <SettingsCard
                        title="About"
                        description="Write the introduction visitors will see on your portfolio."
                    >

                        <textarea
                            name="about"
                            value={formData.about}
                            onChange={handleChange}
                            rows="7"
                            placeholder="Write something about yourself..."
                            className="
                                w-full
                                rounded-xl
                                border
                                border-white/10
                                bg-white/[0.035]
                                px-4
                                py-3
                                text-sm
                                text-white
                                placeholder:text-white/25
                                outline-none
                                resize-none
                                transition
                                focus:border-purple-400/40
                                focus:bg-white/[0.05]
                                focus:ring-2
                                focus:ring-purple-500/10
                            "
                        />

                    </SettingsCard>


                    {/* ==================================================
                        SOCIAL LINKS
                    ================================================== */}

                    <SettingsCard
                        title="Social Links"
                        description="Connect your professional profiles and website."
                    >

                        <div
                            className="
                                grid
                                md:grid-cols-2
                                gap-5
                            "
                        >

                            <InputField
                                label="GitHub"
                                name="github"
                                type="url"
                                value={formData.github}
                                onChange={handleChange}
                                placeholder="https://github.com/username"
                            />


                            <InputField
                                label="LinkedIn"
                                name="linkedin"
                                type="url"
                                value={formData.linkedin}
                                onChange={handleChange}
                                placeholder="https://linkedin.com/in/username"
                            />


                            <InputField
                                label="Twitter / X"
                                name="twitter"
                                type="url"
                                value={formData.twitter}
                                onChange={handleChange}
                                placeholder="https://x.com/username"
                            />


                            <InputField
                                label="Website"
                                name="website"
                                type="url"
                                value={formData.website}
                                onChange={handleChange}
                                placeholder="https://yourwebsite.com"
                            />

                        </div>

                    </SettingsCard>


                    {/* ==================================================
                        RESUME
                    ================================================== */}

                    <SettingsCard
                        title="Resume"
                        description="Upload your latest PDF resume."
                    >

                        {formData.resumeUrl && (

                            <div
                                className="
                                    mb-5
                                    rounded-xl
                                    border
                                    border-white/10
                                    bg-white/[0.025]
                                    p-4
                                "
                            >

                                <p
                                    className="
                                        text-xs
                                        uppercase
                                        tracking-wider
                                        text-white/35
                                        mb-2
                                    "
                                >
                                    Current Resume
                                </p>


                                <a
                                    href={
                                        formData.resumeUrl
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="
                                        text-sm
                                        text-cyan-300
                                        hover:text-cyan-200
                                        transition
                                    "
                                >
                                    View Current Resume →
                                </a>

                            </div>

                        )}


                        <input
                            type="file"
                            accept="application/pdf"
                            onChange={
                                handleResumeChange
                            }
                            className="
                                block
                                w-full
                                rounded-xl
                                border
                                border-white/10
                                bg-white/[0.035]
                                px-4
                                py-3
                                text-sm
                                text-white/60
                                file:mr-4
                                file:rounded-lg
                                file:border-0
                                file:bg-purple-500/15
                                file:px-4
                                file:py-2
                                file:text-sm
                                file:font-medium
                                file:text-purple-300
                            "
                        />


                        {resumeFile && (

                            <p
                                className="
                                    mt-3
                                    text-xs
                                    text-white/40
                                "
                            >
                                Selected:{" "}
                                <span className="text-white/70">
                                    {resumeFile.name}
                                </span>
                            </p>

                        )}


                        <button
                            type="button"
                            onClick={
                                handleResumeUpload
                            }
                            disabled={
                                uploadingResume ||
                                !resumeFile
                            }
                            className="
                                mt-4
                                rounded-xl
                                border
                                border-purple-400/20
                                bg-purple-400/[0.08]
                                px-5
                                py-2.5
                                text-sm
                                font-medium
                                text-purple-300
                                transition
                                hover:border-purple-400/40
                                hover:bg-purple-400/[0.14]
                                disabled:cursor-not-allowed
                                disabled:opacity-40
                            "
                        >
                            {uploadingResume
                                ? "Uploading Resume..."
                                : "Upload Resume"}
                        </button>


                        <p
                            className="
                                mt-3
                                text-xs
                                text-white/30
                            "
                        >
                            PDF only. Maximum size:
                            5MB.
                        </p>

                    </SettingsCard>


                    {/* ==================================================
                        PROFILE IMAGE
                    ================================================== */}

                    <SettingsCard
                        title="Profile Image"
                        description="Upload the image used on your public portfolio."
                    >

                        {formData.profileImage && (

                            <div className="mb-6">

                                <p
                                    className="
                                        mb-3
                                        text-xs
                                        uppercase
                                        tracking-wider
                                        text-white/35
                                    "
                                >
                                    Current Profile Image
                                </p>


                                <div
                                    className="
                                        w-32
                                        h-32
                                        rounded-2xl
                                        overflow-hidden
                                        border
                                        border-white/10
                                        bg-white/[0.03]
                                        shadow-[0_15px_50px_rgba(0,0,0,0.35)]
                                    "
                                >

                                    <img
                                        src={
                                            formData.profileImage
                                        }
                                        alt="Profile"
                                        className="
                                            w-full
                                            h-full
                                            object-cover
                                        "
                                    />

                                </div>

                            </div>

                        )}


                        <input
                            type="file"
                            accept="image/*"
                            onChange={
                                handleProfileImageChange
                            }
                            className="
                                block
                                w-full
                                rounded-xl
                                border
                                border-white/10
                                bg-white/[0.035]
                                px-4
                                py-3
                                text-sm
                                text-white/60
                                file:mr-4
                                file:rounded-lg
                                file:border-0
                                file:bg-cyan-400/10
                                file:px-4
                                file:py-2
                                file:text-sm
                                file:font-medium
                                file:text-cyan-300
                            "
                        />


                        {profileImageFile && (

                            <p
                                className="
                                    mt-3
                                    text-xs
                                    text-white/40
                                "
                            >
                                Selected:{" "}
                                <span className="text-white/70">
                                    {profileImageFile.name}
                                </span>
                            </p>

                        )}


                        <button
                            type="button"
                            onClick={
                                handleProfileImageUpload
                            }
                            disabled={
                                uploadingImage ||
                                !profileImageFile
                            }
                            className="
                                mt-4
                                rounded-xl
                                border
                                border-cyan-400/20
                                bg-cyan-400/[0.08]
                                px-5
                                py-2.5
                                text-sm
                                font-medium
                                text-cyan-300
                                transition
                                hover:border-cyan-400/40
                                hover:bg-cyan-400/[0.14]
                                disabled:cursor-not-allowed
                                disabled:opacity-40
                            "
                        >
                            {uploadingImage
                                ? "Uploading Image..."
                                : "Upload Profile Image"}
                        </button>


                        <p
                            className="
                                mt-3
                                text-xs
                                text-white/30
                            "
                        >
                            JPG, JPEG, PNG, WEBP and
                            other supported image
                            formats. Maximum size: 5MB.
                        </p>

                    </SettingsCard>


                    {/* ==================================================
                        SAVE
                    ================================================== */}

                    <div
                        className="
                            sticky
                            bottom-4
                            z-20
                            flex
                            justify-end
                        "
                    >

                        <button
                            type="submit"
                            disabled={saving}
                            className="
                                inline-flex
                                items-center
                                justify-center
                                gap-2
                                rounded-xl
                                bg-gradient-to-r
                                from-purple-600
                                via-purple-500
                                to-cyan-500
                                px-7
                                py-3.5
                                text-sm
                                font-semibold
                                text-white
                                shadow-[0_15px_45px_rgba(139,92,246,0.2)]
                                transition-all
                                duration-300
                                hover:-translate-y-0.5
                                hover:shadow-[0_20px_55px_rgba(139,92,246,0.3)]
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                            "
                        >

                            {saving ? (
                                <>
                                    <span
                                        className="
                                            w-4
                                            h-4
                                            rounded-full
                                            border-2
                                            border-white/30
                                            border-t-white
                                            animate-spin
                                        "
                                    />

                                    Saving...

                                </>
                            ) : (
                                <>
                                    Save Settings
                                    <span>→</span>
                                </>
                            )}

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

};


// ============================================================
// SETTINGS CARD
// ============================================================

const SettingsCard = ({
    title,
    description,
    children
}) => {

    return (

        <section
            className="
                relative
                overflow-hidden
                rounded-2xl
                border
                border-white/[0.09]
                bg-white/[0.025]
                p-5
                md:p-7
                backdrop-blur-xl
                shadow-[0_20px_60px_rgba(0,0,0,0.2)]
            "
        >

            <div
                className="
                    pointer-events-none
                    absolute
                    top-0
                    left-0
                    right-0
                    h-px
                    bg-gradient-to-r
                    from-transparent
                    via-purple-400/40
                    to-transparent
                "
            />


            <div className="mb-6">

                <h2
                    className="
                        text-lg
                        md:text-xl
                        font-semibold
                        text-white
                    "
                >
                    {title}
                </h2>


                <p
                    className="
                        mt-1
                        text-sm
                        text-white/35
                    "
                >
                    {description}
                </p>

            </div>


            {children}

        </section>

    );

};


// ============================================================
// INPUT FIELD
// ============================================================

const InputField = ({
    label,
    name,
    type = "text",
    value,
    onChange,
    placeholder,
    required = false
}) => {

    return (

        <div>

            <label
                htmlFor={name}
                className="
                    mb-2
                    block
                    text-xs
                    font-medium
                    uppercase
                    tracking-wider
                    text-white/45
                "
            >
                {label}
            </label>


            <input
                id={name}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className="
                    w-full
                    rounded-xl
                    border
                    border-white/10
                    bg-white/[0.035]
                    px-4
                    py-3
                    text-sm
                    text-white
                    placeholder:text-white/20
                    outline-none
                    transition-all
                    duration-200
                    focus:border-purple-400/40
                    focus:bg-white/[0.05]
                    focus:ring-2
                    focus:ring-purple-500/10
                "
            />

        </div>

    );

};


export default SettingsManager;