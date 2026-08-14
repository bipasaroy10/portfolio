const API_URL = "http://localhost:5000/api";


// ============================================================
// COMMON REQUEST FUNCTION
// ============================================================

const request = async (url, options = {}) => {

    const response = await fetch(url, options);

    const text = await response.text();

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
// PROJECTS
// ============================================================

export const getProjects = async () => {

    return request(
        `${API_URL}/projects`
    );

};


// ============================================================
// SKILLS
// ============================================================

export const getSkills = async () => {

    return request(
        `${API_URL}/skills`
    );

};


// ============================================================
// EXPERIENCE
// ============================================================

export const getExperience = async () => {

    return request(
        `${API_URL}/experiences`
    );

};


// ============================================================
// CONTACT - PUBLIC
// ============================================================

export const sendContactMessage = async (data) => {

    return request(
        `${API_URL}/contacts`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(data)
        }
    );

};


// ============================================================
// CONTACT - ADMIN
// ============================================================

export const getContacts = async () => {

    const token =
        localStorage.getItem("adminToken") ||
        localStorage.getItem("token");

    return request(
        `${API_URL}/contacts`,
        {
            method: "GET",

            headers: {
                Authorization:
                    `Bearer ${token}`
            }
        }
    );

};


// ============================================================
// UPDATE CONTACT STATUS
// ============================================================

export const updateContactStatus = async (
    id,
    status
) => {

    const token =
        localStorage.getItem("adminToken") ||
        localStorage.getItem("token");

    return request(
        `${API_URL}/contacts/${id}/status`,
        {
            method: "PATCH",

            headers: {
                "Content-Type":
                    "application/json",

                Authorization:
                    `Bearer ${token}`
            },

            body: JSON.stringify({
                status
            })
        }
    );

};


// ============================================================
// DELETE CONTACT
// ============================================================

export const deleteContact = async (id) => {

    const token =
        localStorage.getItem("adminToken") ||
        localStorage.getItem("token");

    return request(
        `${API_URL}/contacts/${id}`,
        {
            method: "DELETE",

            headers: {
                Authorization:
                    `Bearer ${token}`
            }
        }
    );

};