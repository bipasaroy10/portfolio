const API_URL = "http://localhost:5000/api";

const request = async (url, options = {}) => {
    const response = await fetch(url, options);

    const text = await response.text();

    let data;

    try {
        data = JSON.parse(text);
    } catch {
        console.error("Server returned non-JSON:", text);

        throw new Error(
            `Server returned ${response.status} instead of JSON`
        );
    }

    if (!response.ok) {
        throw new Error(
            data.message || "Something went wrong"
        );
    }

    return data;
};


// Projects
export const getProjects = async () => {
    return request(`${API_URL}/projects`);
};


// Skills
export const getSkills = async () => {
    return request(`${API_URL}/skills`);
};


// Experience
export const getExperience = async () => {
    return request(`${API_URL}/experiences`);
};


// Contact
export const sendContactMessage = async (data) => {
    return request(`${API_URL}/contacts`, {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(data)
    });
};