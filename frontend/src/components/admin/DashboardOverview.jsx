import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api";

const DashboardOverview = () => {
    const [stats, setStats] = useState({
        projects: 0,
        skills: 0,
        experiences: 0,
        messages: 0
    });

    const [recentMessages, setRecentMessages] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const getToken = () => {
        return localStorage.getItem("adminToken");
    };

    const loadDashboard = async () => {
        try {
            setLoading(true);
            setError("");

            const token = getToken();

            const headers = {
                Authorization: `Bearer ${token}`
            };

            // Projects
            const projectsResponse = await fetch(
                `${API_URL}/projects`
            );

            const projectsData =
                await projectsResponse.json();

            // Skills
            const skillsResponse = await fetch(
                `${API_URL}/skills`
            );

            const skillsData =
                await skillsResponse.json();

            // Experiences
            const experiencesResponse =
                await fetch(
                    `${API_URL}/experiences`
                );

            const experiencesData =
                await experiencesResponse.json();

            // Contacts
            const contactsResponse =
                await fetch(
                    `${API_URL}/contacts`,
                    {
                        headers
                    }
                );

            const contactsData =
                await contactsResponse.json();

            if (!projectsResponse.ok) {
                throw new Error(
                    projectsData.message ||
                    "Failed to load projects"
                );
            }

            if (!skillsResponse.ok) {
                throw new Error(
                    skillsData.message ||
                    "Failed to load skills"
                );
            }

            if (!experiencesResponse.ok) {
                throw new Error(
                    experiencesData.message ||
                    "Failed to load experiences"
                );
            }

            if (!contactsResponse.ok) {
                throw new Error(
                    contactsData.message ||
                    "Failed to load contacts"
                );
            }

            const projects =
                projectsData.data || [];

            const skills =
                skillsData.data || [];

            const experiences =
                experiencesData.data || [];

            const contacts =
                contactsData.data || [];

            setStats({
                projects: projects.length,
                skills: skills.length,
                experiences: experiences.length,
                messages: contacts.length
            });

            setRecentMessages(
                contacts.slice(0, 5)
            );

        } catch (error) {
            console.error(
                "Dashboard error:",
                error
            );

            setError(error.message);

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDashboard();
    }, []);

    const formatDate = (date) => {
        if (!date) {
            return "";
        }

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "numeric",
                month: "short",
                year: "numeric"
            }
        );
    };

    const statCards = [
        {
            title: "Projects",
            value: stats.projects,
            icon: "💼"
        },
        {
            title: "Skills",
            value: stats.skills,
            icon: "⚡"
        },
        {
            title: "Experiences",
            value: stats.experiences,
            icon: "🚀"
        },
        {
            title: "Messages",
            value: stats.messages,
            icon: "✉️"
        }
    ];

    return (
        <div>

            {/* Header */}

            <div className="mb-8">

                <h2 className="text-3xl font-bold">
                    Dashboard
                </h2>

                <p className="text-gray-500 mt-1">
                    Overview of your portfolio
                </p>

            </div>


            {/* Error */}

            {error && (
                <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg">
                    {error}
                </div>
            )}


            {/* Loading */}

            {loading ? (

                <p className="text-gray-500">
                    Loading dashboard...
                </p>

            ) : (

                <>

                    {/* Statistics */}

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">

                        {statCards.map((card) => (

                            <div
                                key={card.title}
                                className="bg-white border rounded-2xl p-6"
                            >

                                <div className="flex items-center justify-between">

                                    <div>

                                        <p className="text-gray-500">
                                            {card.title}
                                        </p>

                                        <p className="text-4xl font-bold mt-2">
                                            {card.value}
                                        </p>

                                    </div>

                                    <div className="text-3xl">
                                        {card.icon}
                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>


                    {/* Recent Messages */}

                    <div className="bg-white border rounded-2xl">

                        <div className="p-6 border-b">

                            <h3 className="text-xl font-bold">
                                Recent Messages
                            </h3>

                            <p className="text-gray-500 text-sm mt-1">
                                Latest messages received from visitors
                            </p>

                        </div>


                        {recentMessages.length === 0 ? (

                            <div className="p-8 text-center text-gray-500">
                                No messages yet.
                            </div>

                        ) : (

                            <div>

                                {recentMessages.map(
                                    (message) => (

                                        <div
                                            key={message._id}
                                            className="p-6 border-b last:border-b-0"
                                        >

                                            <div className="flex flex-col md:flex-row md:justify-between gap-2">

                                                <div>

                                                    <h4 className="font-semibold">
                                                        {message.subject}
                                                    </h4>

                                                    <p className="text-sm text-gray-500 mt-1">
                                                        {message.name}
                                                        {" • "}
                                                        {message.email}
                                                    </p>

                                                </div>

                                                <span className="text-sm text-gray-400">
                                                    {formatDate(
                                                        message.createdAt
                                                    )}
                                                </span>

                                            </div>

                                            <p className="text-gray-600 mt-3 line-clamp-2">
                                                {message.message}
                                            </p>

                                        </div>

                                    )
                                )}

                            </div>

                        )}

                    </div>

                </>

            )}

        </div>
    );
};

export default DashboardOverview;