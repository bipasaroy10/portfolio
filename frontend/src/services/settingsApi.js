const API_URL = "http://localhost:5000/api";

// ============================================================
// GET ADMIN TOKEN
// ============================================================

const getToken = () => {

    return (
        localStorage.getItem("adminToken") ||
        localStorage.getItem("token")
    );

};


// ============================================================
// COMMON REQUEST FUNCTION
// ============================================================

const request = async (
    url,
    options = {}
) => {

    const response = await fetch(
        url,
        options
    );

    const text =
        await response.text();

    let data;

    try {

        data = JSON.parse(text);

    } catch {

        console.error(
            "Server returned non-JSON:",
            text
        );

        throw new Error(
            `Server returned ${response.status} instead of JSON`
        );

    }


    if (!response.ok) {

        throw new Error(
            data.message ||
            "Something went wrong"
        );

    }


    return data;

};


// ============================================================
// GET SETTINGS
// PUBLIC
// ============================================================

export const getSettings = async () => {

    return request(
        `${API_URL}/settings`
    );

};


// ============================================================
// UPDATE SETTINGS
// ADMIN
// ============================================================

export const updateSettings = async (
    settings
) => {

    const token = getToken();


    if (!token) {

        throw new Error(
            "Admin authentication token not found."
        );

    }


    return request(
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
                    settings
                )
        }
    );

};


// ============================================================
// UPLOAD PROFILE IMAGE
// ============================================================

export const uploadProfileImage = async (
    file
) => {

    const token = getToken();


    if (!token) {

        throw new Error(
            "Admin authentication token not found."
        );

    }


    const formData =
        new FormData();


    formData.append(
        "profileImage",
        file
    );


    return request(
        `${API_URL}/uploads/profile-image`,
        {
            method: "POST",

            headers: {
                Authorization:
                    `Bearer ${token}`
            },

            body: formData
        }
    );

};


// ============================================================
// UPLOAD RESUME
// ============================================================

export const uploadResume = async (
    file
) => {

    const token = getToken();


    if (!token) {

        throw new Error(
            "Admin authentication token not found."
        );

    }


    const formData =
        new FormData();


    formData.append(
        "resume",
        file
    );


    return request(
        `${API_URL}/uploads/resume`,
        {
            method: "POST",

            headers: {
                Authorization:
                    `Bearer ${token}`
            },

            body: formData
        }
    );

};