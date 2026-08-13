import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api";

const SettingsManager = () => {

    // --------------------------------
    // Settings Form
    // --------------------------------

    const [formData, setFormData] = useState({
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


    // --------------------------------
    // Files
    // --------------------------------

    const [profileImageFile, setProfileImageFile] =
        useState(null);

    const [resumeFile, setResumeFile] =
        useState(null);


    // --------------------------------
    // Loading States
    // --------------------------------

    const [loading, setLoading] =
        useState(true);

    const [saving, setSaving] =
        useState(false);

    const [uploadingImage, setUploadingImage] =
        useState(false);

    const [uploadingResume, setUploadingResume] =
        useState(false);


    // --------------------------------
    // Messages
    // --------------------------------

    const [message, setMessage] =
        useState("");

    const [error, setError] =
        useState("");


    // --------------------------------
    // Get Admin Token
    // --------------------------------

    const getToken = () => {
        return localStorage.getItem(
            "adminToken"
        );
    };


    // --------------------------------
    // Load Settings
    // --------------------------------

    const loadSettings = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await fetch(
                `${API_URL}/settings`
            );

            const data =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Failed to load settings"
                );
            }


            if (data.data) {

                setFormData({
                    name:
                        data.data.name || "",

                    title:
                        data.data.title || "",

                    about:
                        data.data.about || "",

                    email:
                        data.data.email || "",

                    phone:
                        data.data.phone || "",

                    location:
                        data.data.location || "",

                    github:
                        data.data.github || "",

                    linkedin:
                        data.data.linkedin || "",

                    twitter:
                        data.data.twitter || "",

                    website:
                        data.data.website || "",

                    resumeUrl:
                        data.data.resumeUrl || "",

                    resumePublicId:
                        data.data.resumePublicId || "",

                    profileImage:
                        data.data.profileImage || "",

                    profileImagePublicId:
                        data.data.profileImagePublicId || ""
                });

            }

        } catch (error) {

            console.error(
                "Load settings error:",
                error
            );

            setError(
                error.message
            );

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {
        loadSettings();
    }, []);


    // --------------------------------
    // Handle Input
    // --------------------------------

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


    // --------------------------------
    // Profile Image Selection
    // --------------------------------

    const handleProfileImageChange = (e) => {

        const file =
            e.target.files?.[0];

        if (!file) {
            return;
        }


        // Validate image

        if (!file.type.startsWith("image/")) {

            setError(
                "Please select a valid image file."
            );

            return;
        }


        // Validate size - 5MB

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


    // --------------------------------
    // Resume Selection
    // --------------------------------

    const handleResumeChange = (e) => {

        const file =
            e.target.files?.[0];

        if (!file) {
            return;
        }


        // Validate PDF

        if (
            file.type !==
            "application/pdf"
        ) {

            setError(
                "Resume must be a PDF file."
            );

            return;
        }


        // Validate size - 5MB

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


    // --------------------------------
    // Upload Profile Image
    // --------------------------------

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


                const token =
                    getToken();


                if (!token) {

                    throw new Error(
                        "Admin authentication token not found."
                    );
                }


                const uploadData =
                    new FormData();


                uploadData.append(
                    "profileImage",
                    profileImageFile
                );


                const response =
                    await fetch(
                        `${API_URL}/uploads/profile-image`,
                        {
                            method: "POST",

                            headers: {
                                Authorization:
                                    `Bearer ${token}`
                            },

                            body: uploadData
                        }
                    );


                const data =
                    await response.json();


                if (!response.ok) {

                    throw new Error(
                        data.message ||
                        "Failed to upload profile image"
                    );
                }


                // Save Cloudinary URL + Public ID
                // into local form state

                setFormData((previous) => ({
                    ...previous,

                    profileImage:
                        data.data.url,

                    profileImagePublicId:
                        data.data.publicId
                }));


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


    // --------------------------------
    // Upload Resume
    // --------------------------------

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


                const token =
                    getToken();


                if (!token) {

                    throw new Error(
                        "Admin authentication token not found."
                    );
                }


                const uploadData =
                    new FormData();


                uploadData.append(
                    "resume",
                    resumeFile
                );


                const response =
                    await fetch(
                        `${API_URL}/uploads/resume`,
                        {
                            method: "POST",

                            headers: {
                                Authorization:
                                    `Bearer ${token}`
                            },

                            body: uploadData
                        }
                    );


                const data =
                    await response.json();


                if (!response.ok) {

                    throw new Error(
                        data.message ||
                        "Failed to upload resume"
                    );
                }


                // Save Cloudinary URL + Public ID
                // into local form state

                setFormData((previous) => ({
                    ...previous,

                    resumeUrl:
                        data.data.url,

                    resumePublicId:
                        data.data.publicId
                }));


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


    // --------------------------------
    // Save Settings
    // --------------------------------

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setSaving(true);

            setError("");
            setMessage("");


            const token =
                getToken();


            if (!token) {

                throw new Error(
                    "Admin authentication token not found."
                );
            }


            const response =
                await fetch(
                    `${API_URL}/settings`,
                    {
                        method: "PUT",

                        headers: {
                            "Content-Type":
                                "application/json",

                            Authorization:
                                `Bearer ${token}`
                        },

                        body:
                            JSON.stringify(
                                formData
                            )
                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Failed to update settings"
                );
            }


            // Update state with backend response

            if (data.data) {

                setFormData({
                    name:
                        data.data.name || "",

                    title:
                        data.data.title || "",

                    about:
                        data.data.about || "",

                    email:
                        data.data.email || "",

                    phone:
                        data.data.phone || "",

                    location:
                        data.data.location || "",

                    github:
                        data.data.github || "",

                    linkedin:
                        data.data.linkedin || "",

                    twitter:
                        data.data.twitter || "",

                    website:
                        data.data.website || "",

                    resumeUrl:
                        data.data.resumeUrl || "",

                    resumePublicId:
                        data.data.resumePublicId || "",

                    profileImage:
                        data.data.profileImage || "",

                    profileImagePublicId:
                        data.data.profileImagePublicId || ""
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
                error.message
            );

        } finally {

            setSaving(false);

        }
    };


    // --------------------------------
    // Loading
    // --------------------------------

    if (loading) {

        return (
            <div>

                <p className="text-gray-500">
                    Loading settings...
                </p>

            </div>
        );
    }


    // --------------------------------
    // UI
    // --------------------------------

    return (
        <div>

            {/* Header */}

            <div className="mb-8">

                <h2 className="text-3xl font-bold">
                    Portfolio Settings
                </h2>

                <p className="text-gray-500 mt-1">
                    Manage your portfolio information
                </p>

            </div>


            {/* Success */}

            {message && (

                <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg">
                    {message}
                </div>

            )}


            {/* Error */}

            {error && (

                <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg">
                    {error}
                </div>

            )}


            {/* Form */}

            <form
                onSubmit={handleSubmit}
                className="bg-white border rounded-2xl p-6 space-y-6"
            >

                {/* -------------------------------- */}
                {/* Personal Information */}
                {/* -------------------------------- */}

                <div>

                    <h3 className="text-xl font-bold mb-5">
                        Personal Information
                    </h3>


                    <div className="grid md:grid-cols-2 gap-5">

                        {/* Name */}

                        <div>

                            <label className="block text-sm font-medium mb-2">
                                Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Bipasa Roy"
                                required
                                className="w-full border rounded-lg px-4 py-3"
                            />

                        </div>


                        {/* Title */}

                        <div>

                            <label className="block text-sm font-medium mb-2">
                                Professional Title
                            </label>

                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Backend Developer"
                                required
                                className="w-full border rounded-lg px-4 py-3"
                            />

                        </div>


                        {/* Email */}

                        <div>

                            <label className="block text-sm font-medium mb-2">
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="your@email.com"
                                className="w-full border rounded-lg px-4 py-3"
                            />

                        </div>


                        {/* Phone */}

                        <div>

                            <label className="block text-sm font-medium mb-2">
                                Phone
                            </label>

                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+91 XXXXX XXXXX"
                                className="w-full border rounded-lg px-4 py-3"
                            />

                        </div>


                        {/* Location */}

                        <div className="md:col-span-2">

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

                    </div>

                </div>


                {/* -------------------------------- */}
                {/* About */}
                {/* -------------------------------- */}

                <div>

                    <h3 className="text-xl font-bold mb-5">
                        About
                    </h3>

                    <textarea
                        name="about"
                        value={formData.about}
                        onChange={handleChange}
                        rows="7"
                        placeholder="Write something about yourself..."
                        className="w-full border rounded-lg px-4 py-3 resize-none"
                    />

                </div>


                {/* -------------------------------- */}
                {/* Social Links */}
                {/* -------------------------------- */}

                <div>

                    <h3 className="text-xl font-bold mb-5">
                        Social Links
                    </h3>


                    <div className="space-y-5">

                        {/* GitHub */}

                        <div>

                            <label className="block text-sm font-medium mb-2">
                                GitHub
                            </label>

                            <input
                                type="url"
                                name="github"
                                value={formData.github}
                                onChange={handleChange}
                                placeholder="https://github.com/username"
                                className="w-full border rounded-lg px-4 py-3"
                            />

                        </div>


                        {/* LinkedIn */}

                        <div>

                            <label className="block text-sm font-medium mb-2">
                                LinkedIn
                            </label>

                            <input
                                type="url"
                                name="linkedin"
                                value={formData.linkedin}
                                onChange={handleChange}
                                placeholder="https://linkedin.com/in/username"
                                className="w-full border rounded-lg px-4 py-3"
                            />

                        </div>


                        {/* Twitter */}

                        <div>

                            <label className="block text-sm font-medium mb-2">
                                Twitter / X
                            </label>

                            <input
                                type="url"
                                name="twitter"
                                value={formData.twitter}
                                onChange={handleChange}
                                placeholder="https://x.com/username"
                                className="w-full border rounded-lg px-4 py-3"
                            />

                        </div>


                        {/* Website */}

                        <div>

                            <label className="block text-sm font-medium mb-2">
                                Website
                            </label>

                            <input
                                type="url"
                                name="website"
                                value={formData.website}
                                onChange={handleChange}
                                placeholder="https://yourwebsite.com"
                                className="w-full border rounded-lg px-4 py-3"
                            />

                        </div>

                    </div>

                </div>


                {/* -------------------------------- */}
                {/* Resume */}
                {/* -------------------------------- */}

                <div>

                    <h3 className="text-xl font-bold mb-5">
                        Resume
                    </h3>


                    {/* Current Resume */}

                    {formData.resumeUrl && (

                        <div className="mb-4 p-4 bg-gray-50 border rounded-lg">

                            <p className="text-sm text-gray-500 mb-2">
                                Current Resume
                            </p>

                            <a
                                href={formData.resumeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                            >
                                View Current Resume
                            </a>

                        </div>

                    )}


                    {/* File Input */}

                    <label className="block text-sm font-medium mb-2">
                        Upload Resume
                    </label>

                    <input
                        type="file"
                        accept="application/pdf"
                        onChange={handleResumeChange}
                        className="w-full border rounded-lg px-4 py-3"
                    />


                    {/* Selected File */}

                    {resumeFile && (

                        <p className="text-sm text-gray-500 mt-2">
                            Selected:{" "}
                            {resumeFile.name}
                        </p>

                    )}


                    {/* Upload Button */}

                    <button
                        type="button"
                        onClick={handleResumeUpload}
                        disabled={
                            uploadingResume ||
                            !resumeFile
                        }
                        className="mt-4 px-5 py-2.5 bg-gray-800 text-white rounded-lg disabled:opacity-50"
                    >
                        {uploadingResume
                            ? "Uploading Resume..."
                            : "Upload Resume"}
                    </button>


                    <p className="text-xs text-gray-500 mt-2">
                        PDF only. Maximum size: 5MB.
                    </p>

                </div>


                {/* -------------------------------- */}
                {/* Profile Image */}
                {/* -------------------------------- */}

                <div>

                    <h3 className="text-xl font-bold mb-5">
                        Profile Image
                    </h3>


                    {/* Current Image */}

                    {formData.profileImage && (

                        <div className="mb-5">

                            <p className="text-sm text-gray-500 mb-3">
                                Current Profile Image
                            </p>

                            <img
                                src={formData.profileImage}
                                alt="Profile"
                                className="w-32 h-32 object-cover rounded-full border"
                            />

                        </div>

                    )}


                    {/* File Input */}

                    <label className="block text-sm font-medium mb-2">
                        Upload Profile Image
                    </label>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={
                            handleProfileImageChange
                        }
                        className="w-full border rounded-lg px-4 py-3"
                    />


                    {/* Selected File */}

                    {profileImageFile && (

                        <p className="text-sm text-gray-500 mt-2">
                            Selected:{" "}
                            {profileImageFile.name}
                        </p>

                    )}


                    {/* Upload Button */}

                    <button
                        type="button"
                        onClick={
                            handleProfileImageUpload
                        }
                        disabled={
                            uploadingImage ||
                            !profileImageFile
                        }
                        className="mt-4 px-5 py-2.5 bg-gray-800 text-white rounded-lg disabled:opacity-50"
                    >
                        {uploadingImage
                            ? "Uploading Image..."
                            : "Upload Profile Image"}
                    </button>


                    <p className="text-xs text-gray-500 mt-2">
                        JPG, JPEG, PNG, WEBP and other image formats. Maximum size: 5MB.
                    </p>

                </div>


                {/* -------------------------------- */}
                {/* Submit */}
                {/* -------------------------------- */}

                <div className="pt-4 border-t">

                    <button
                        type="submit"
                        disabled={saving}
                        className="px-6 py-3 bg-black text-white rounded-lg disabled:opacity-50"
                    >
                        {saving
                            ? "Saving..."
                            : "Save Settings"}
                    </button>

                </div>

            </form>

        </div>
    );
};

export default SettingsManager;