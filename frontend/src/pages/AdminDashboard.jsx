import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardOverview from "../components/admin/DashboardOverview";
import ProjectManager from "../components/admin/ProjectManager";
import SkillManager from "../components/admin/SkillManager";
import ExperienceManager from "../components/admin/ExperienceManager";
import MessageManager from "../components/admin/MessageManager";
import SettingsManager from "../components/admin/SettingsManager";

const AdminDashboard = () => {

    const navigate = useNavigate();

    const [activeSection, setActiveSection] =
        useState("dashboard");

    const [sidebarOpen, setSidebarOpen] =
        useState(false);

    const admin = JSON.parse(
        localStorage.getItem("admin")
    );

    const handleLogout = () => {

        localStorage.removeItem("adminToken");

        localStorage.removeItem("admin");

        navigate("/admin/login");
    };

    const menuItems = [
        {
            id: "dashboard",
            label: "Dashboard",
            icon: "📊"
        },
        {
            id: "projects",
            label: "Projects",
            icon: "💼"
        },
        {
            id: "skills",
            label: "Skills",
            icon: "⚡"
        },
        {
            id: "experience",
            label: "Experiences",
            icon: "🚀"
        },
        {
            id: "messages",
            label: "Messages",
            icon: "✉️"
        },
        {
            id: "settings",
            label: "Settings",
            icon: "⚙️"
        }
    ];

    const handleNavigation = (section) => {

        setActiveSection(section);

        setSidebarOpen(false);
    };

    return (
        <div className="min-h-screen bg-gray-100">

            {/* Mobile Header */}

            <header className="lg:hidden bg-white border-b">

                <div className="px-5 py-4 flex items-center justify-between">

                    <button
                        onClick={() =>
                            setSidebarOpen(!sidebarOpen)
                        }
                        className="text-2xl"
                    >
                        ☰
                    </button>

                    <h1 className="font-bold">
                        Portfolio Admin
                    </h1>

                    <button
                        onClick={handleLogout}
                        className="text-sm"
                    >
                        Logout
                    </button>

                </div>

            </header>


            <div className="flex min-h-screen">


                {/* Sidebar */}

                <aside
                    className={`
                        fixed lg:static
                        inset-y-0 left-0
                        z-40
                        w-64
                        bg-black
                        text-white
                        transform
                        transition-transform
                        duration-200
                        ${
                            sidebarOpen
                                ? "translate-x-0"
                                : "-translate-x-full"
                        }
                        lg:translate-x-0
                    `}
                >

                    <div className="h-full flex flex-col">

                        {/* Logo */}

                        <div className="p-6 border-b border-gray-800">

                            <h1 className="text-xl font-bold">
                                Portfolio Admin
                            </h1>

                            <p className="text-gray-400 text-sm mt-1">
                                {admin?.name || "Admin"}
                            </p>

                        </div>


                        {/* Navigation */}

                        <nav className="flex-1 p-4">

                            <div className="space-y-2">

                                {menuItems.map(
                                    (item) => (

                                        <button
                                            key={item.id}
                                            onClick={() =>
                                                handleNavigation(
                                                    item.id
                                                )
                                            }
                                            className={`
                                                w-full
                                                flex
                                                items-center
                                                gap-3
                                                px-4
                                                py-3
                                                rounded-lg
                                                text-left
                                                transition
                                                ${
                                                    activeSection ===
                                                    item.id
                                                        ? "bg-white text-black"
                                                        : "text-gray-300 hover:bg-gray-800"
                                                }
                                            `}
                                        >

                                            <span>
                                                {item.icon}
                                            </span>

                                            <span>
                                                {item.label}
                                            </span>

                                        </button>

                                    )
                                )}

                            </div>

                        </nav>


                        {/* Logout */}

                        <div className="p-4 border-t border-gray-800">

                            <button
                                onClick={handleLogout}
                                className="w-full px-4 py-3 rounded-lg text-left text-gray-300 hover:bg-gray-800"
                            >
                                🚪 Logout
                            </button>

                        </div>

                    </div>

                </aside>


                {/* Mobile Overlay */}

                {sidebarOpen && (

                    <div
                        onClick={() =>
                            setSidebarOpen(false)
                        }
                        className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    />

                )}


                {/* Main */}

                <main className="flex-1 min-w-0">

                    {/* Desktop Header */}

                    <header className="hidden lg:block bg-white border-b">

                        <div className="px-8 py-5 flex justify-between items-center">

                            <div>

                                <h1 className="text-2xl font-bold">
                                    Admin Dashboard
                                </h1>

                                <p className="text-sm text-gray-500">
                                    Welcome,{" "}
                                    {admin?.name || "Admin"}
                                </p>

                            </div>

                            <button
                                onClick={handleLogout}
                                className="px-5 py-2 bg-black text-white rounded-lg"
                            >
                                Logout
                            </button>

                        </div>

                    </header>


                    {/* Content */}

                    <div className="p-5 md:p-8">

                        {activeSection === "dashboard" && (
                            <DashboardOverview />
                        )}

                        {activeSection === "projects" && (
                            <ProjectManager />
                        )}

                        {activeSection === "skills" && (
                            <SkillManager />
                        )}

                        {activeSection === "experience" && (
                            <ExperienceManager />
                        )}

                        {activeSection === "messages" && (
                            <MessageManager />
                        )}

                        {activeSection === "settings" && (
                            <SettingsManager />
                        )}

                    </div>

                </main>

            </div>

        </div>
    );
};

export default AdminDashboard;