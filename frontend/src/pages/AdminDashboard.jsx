import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getProjects,
    getSkills,
    getExperience,
    getContacts
} from "../services/api";

// Existing admin managers
import ProjectManager from "../components/admin/ProjectManager";
import SkillManager from "../components/admin/SkillManager";
import ExperienceManager from "../components/admin/ExperienceManager";
import MessageManager from "../components/admin/MessageManager";
import SettingsManager from "../components/admin/SettingsManager";


const AdminDashboard = () => {

    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [activePage, setActivePage] =
        useState("Dashboard");

    const [loading, setLoading] =
        useState(true);

    const [stats, setStats] = useState({
        projects: 0,
        skills: 0,
        experience: 0,
        messages: 0
    });

    const [recentProjects, setRecentProjects] =
        useState([]);

    const [error, setError] =
        useState("");


    // =====================================================
    // NAVIGATION
    // =====================================================

    const navigation = [
        {
            name: "Dashboard",
            icon: "⌂"
        },
        {
            name: "Projects",
            icon: "◇"
        },
        {
            name: "Skills",
            icon: "✦"
        },
        {
            name: "Experience",
            icon: "◫"
        },
        {
            name: "Messages",
            icon: "✉"
        },
        {
            name: "Settings",
            icon: "⚙"
        }
    ];


    // =====================================================
    // LOAD DASHBOARD DATA
    // =====================================================

    useEffect(() => {

        const loadDashboard = async () => {

            try {

                setLoading(true);
                setError("");

                const [
                    projectsResponse,
                    skillsResponse,
                    experienceResponse,
                    contactsResponse
                ] = await Promise.all([
                    getProjects(),
                    getSkills(),
                    getExperience(),
                    getContacts()
                ]);


                const projects =
                    projectsResponse?.data || [];

                const skills =
                    skillsResponse?.data || [];

                const experiences =
                    experienceResponse?.data || [];

                const contacts =
                    contactsResponse?.data || [];


                setStats({
                    projects: projects.length,
                    skills: skills.length,
                    experience: experiences.length,
                    messages: contacts.length
                });


                setRecentProjects(
                    projects.slice(0, 5)
                );


            } catch (error) {

                console.error(
                    "Dashboard loading error:",
                    error
                );

                setError(
                    error.message ||
                    "Failed to load dashboard data"
                );

            } finally {

                setLoading(false);

            }

        };


        loadDashboard();

    }, []);


    // =====================================================
    // LOGOUT
    // =====================================================

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("adminToken");

        navigate("/admin/login");

    };


    // =====================================================
    // SIDEBAR NAVIGATION
    // =====================================================

    const handleNavigation = (name) => {

        setActivePage(name);

        setSidebarOpen(false);

    };


    // =====================================================
    // RENDER
    // =====================================================

    return (

        <div
            className="
                min-h-screen
                bg-[#050505]
                text-white
            "
        >

            {/* =================================================
                MOBILE OVERLAY
            ================================================= */}

            {sidebarOpen && (

                <button
                    type="button"
                    aria-label="Close sidebar"
                    onClick={() =>
                        setSidebarOpen(false)
                    }
                    className="
                        fixed
                        inset-0
                        z-40
                        bg-black/70
                        backdrop-blur-sm
                        lg:hidden
                    "
                />

            )}


            {/* =================================================
                SIDEBAR
            ================================================= */}

            <aside
                className={`
                    fixed
                    left-0
                    top-0
                    bottom-0
                    z-50
                    flex
                    w-[270px]
                    flex-col
                    border-r
                    border-white/[0.07]
                    bg-[#08080b]/95
                    backdrop-blur-2xl
                    transition-transform
                    duration-300
                    lg:translate-x-0

                    ${
                        sidebarOpen
                            ? "translate-x-0"
                            : "-translate-x-full"
                    }
                `}
            >

                {/* =================================================
                    LOGO
                ================================================= */}

                <div
                    className="
                        flex
                        h-[82px]
                        items-center
                        border-b
                        border-white/[0.06]
                        px-6
                    "
                >

                    <div
                        className="
                            flex
                            items-center
                            gap-3
                        "
                    >

                        <div
                            className="
                                flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                rounded-xl
                                bg-gradient-to-br
                                from-purple-500
                                via-fuchsia-500
                                to-cyan-400
                                text-sm
                                font-black
                                text-white
                                shadow-lg
                                shadow-purple-900/30
                            "
                        >
                            BR
                        </div>


                        <div>

                            <p
                                className="
                                    text-sm
                                    font-bold
                                    text-white
                                "
                            >
                                Bipasa
                            </p>

                            <p
                                className="
                                    text-[10px]
                                    uppercase
                                    tracking-[0.18em]
                                    text-zinc-600
                                "
                            >
                                Admin Panel
                            </p>

                        </div>

                    </div>


                    {/* Mobile close */}

                    <button
                        type="button"
                        onClick={() =>
                            setSidebarOpen(false)
                        }
                        className="
                            ml-auto
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            rounded-lg
                            text-zinc-500
                            hover:bg-white/[0.05]
                            hover:text-white
                            lg:hidden
                        "
                    >
                        ×
                    </button>

                </div>


                {/* =================================================
                    NAVIGATION
                ================================================= */}

                <nav
                    className="
                        flex-1
                        space-y-1
                        overflow-y-auto
                        px-4
                        py-6
                    "
                >

                    <p
                        className="
                            mb-4
                            px-3
                            text-[9px]
                            font-bold
                            uppercase
                            tracking-[0.2em]
                            text-zinc-700
                        "
                    >
                        Management
                    </p>


                    {navigation.map((item) => {

                        const active =
                            activePage === item.name;


                        return (

                            <button
                                key={item.name}
                                type="button"
                                onClick={() =>
                                    handleNavigation(
                                        item.name
                                    )
                                }
                                className={`
                                    group
                                    relative
                                    flex
                                    w-full
                                    items-center
                                    gap-3
                                    rounded-xl
                                    px-3
                                    py-3
                                    text-left
                                    text-sm
                                    transition-all
                                    duration-300

                                    ${
                                        active
                                            ? "bg-white/[0.05] text-white"
                                            : "text-zinc-500 hover:bg-white/[0.035] hover:text-zinc-200"
                                    }
                                `}
                            >

                                {/* Active indicator */}

                                {active && (

                                    <span
                                        className="
                                            absolute
                                            left-0
                                            h-6
                                            w-[2px]
                                            rounded-full
                                            bg-gradient-to-b
                                            from-purple-400
                                            via-pink-400
                                            to-cyan-400
                                        "
                                    />

                                )}


                                {/* Icon */}

                                <span
                                    className={`
                                        flex
                                        h-9
                                        w-9
                                        items-center
                                        justify-center
                                        rounded-lg
                                        text-base

                                        ${
                                            active
                                                ? "bg-purple-500/[0.12] text-purple-300"
                                                : "bg-white/[0.025] text-zinc-600 group-hover:text-zinc-300"
                                        }
                                    `}
                                >
                                    {item.icon}
                                </span>


                                {/* Name */}

                                <span>
                                    {item.name}
                                </span>


                                {/* Active dot */}

                                {active && (

                                    <span
                                        className="
                                            ml-auto
                                            h-1.5
                                            w-1.5
                                            rounded-full
                                            bg-cyan-400
                                            shadow-[0_0_8px_rgba(34,211,238,0.8)]
                                        "
                                    />

                                )}

                            </button>

                        );

                    })}

                </nav>


                {/* =================================================
                    PROFILE
                ================================================= */}

                <div
                    className="
                        border-t
                        border-white/[0.06]
                        p-4
                    "
                >

                    <div
                        className="
                            mb-3
                            flex
                            items-center
                            gap-3
                            rounded-xl
                            border
                            border-white/[0.05]
                            bg-white/[0.02]
                            p-3
                        "
                    >

                        <div
                            className="
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-full
                                bg-gradient-to-br
                                from-purple-500/20
                                to-cyan-400/20
                                text-xs
                                font-bold
                                text-purple-200
                            "
                        >
                            BR
                        </div>


                        <div>

                            <p
                                className="
                                    text-xs
                                    font-semibold
                                    text-zinc-300
                                "
                            >
                                Bipasa Roy
                            </p>

                            <p
                                className="
                                    mt-0.5
                                    text-[10px]
                                    text-zinc-600
                                "
                            >
                                Administrator
                            </p>

                        </div>

                    </div>


                    <button
                        type="button"
                        onClick={handleLogout}
                        className="
                            group
                            flex
                            w-full
                            items-center
                            gap-3
                            rounded-xl
                            px-3
                            py-3
                            text-sm
                            text-zinc-500
                            transition
                            hover:bg-red-500/[0.06]
                            hover:text-red-300
                        "
                    >

                        <span
                            className="
                                flex
                                h-8
                                w-8
                                items-center
                                justify-center
                                rounded-lg
                                bg-white/[0.025]
                            "
                        >
                            ↪
                        </span>

                        Logout

                    </button>

                </div>

            </aside>


            {/* =================================================
                MAIN CONTENT
            ================================================= */}

            <main
                className="
                    min-h-screen
                    lg:ml-[270px]
                "
            >

                {/* =================================================
                    TOP BAR
                ================================================= */}

                <header
                    className="
                        sticky
                        top-0
                        z-30
                        flex
                        h-[82px]
                        items-center
                        justify-between
                        border-b
                        border-white/[0.06]
                        bg-[#050505]/80
                        px-5
                        backdrop-blur-xl
                        sm:px-8
                        lg:px-10
                    "
                >

                    <div
                        className="
                            flex
                            items-center
                            gap-4
                        "
                    >

                        {/* Mobile menu */}

                        <button
                            type="button"
                            onClick={() =>
                                setSidebarOpen(true)
                            }
                            className="
                                flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                rounded-xl
                                border
                                border-white/[0.07]
                                bg-white/[0.025]
                                text-zinc-400
                                hover:text-white
                                lg:hidden
                            "
                        >
                            ☰
                        </button>


                        <div>

                            <p
                                className="
                                    text-xs
                                    text-zinc-600
                                "
                            >
                                Portfolio Admin
                            </p>

                            <h1
                                className="
                                    text-lg
                                    font-bold
                                    text-white
                                "
                            >
                                {activePage}
                            </h1>

                        </div>

                    </div>


                    {/* Website */}

                    <a
                        href="/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                            hidden
                            items-center
                            gap-2
                            rounded-xl
                            border
                            border-white/[0.07]
                            bg-white/[0.025]
                            px-4
                            py-2.5
                            text-xs
                            font-medium
                            text-zinc-400
                            transition
                            hover:border-cyan-400/20
                            hover:text-cyan-200
                            sm:flex
                        "
                    >
                        View Website ↗
                    </a>

                </header>


                {/* =================================================
                    PAGE CONTENT
                ================================================= */}

                <div
                    className="
                        relative
                        min-h-[calc(100vh-82px)]
                        overflow-hidden
                        px-5
                        py-8
                        sm:px-8
                        lg:px-10
                    "
                >

                    {/* Background purple glow */}

                    <div
                        className="
                            pointer-events-none
                            absolute
                            left-1/3
                            top-[-180px]
                            h-[400px]
                            w-[400px]
                            rounded-full
                            bg-purple-600/[0.07]
                            blur-[130px]
                        "
                    />


                    {/* Cyan glow */}

                    <div
                        className="
                            pointer-events-none
                            absolute
                            right-[-120px]
                            top-1/3
                            h-[350px]
                            w-[350px]
                            rounded-full
                            bg-cyan-500/[0.05]
                            blur-[120px]
                        "
                    />


                    {/* Pink glow */}

                    <div
                        className="
                            pointer-events-none
                            absolute
                            bottom-[-150px]
                            left-1/4
                            h-[300px]
                            w-[300px]
                            rounded-full
                            bg-pink-500/[0.04]
                            blur-[120px]
                        "
                    />


                    <div className="relative z-10">


                        {/* =================================================
                            DASHBOARD PAGE
                        ================================================= */}

                        {activePage === "Dashboard" && (

                            <div>

                                {/* Welcome */}

                                <div className="mb-8">

                                    <p
                                        className="
                                            text-xs
                                            font-semibold
                                            uppercase
                                            tracking-[0.18em]
                                            text-purple-300
                                        "
                                    >
                                        Overview
                                    </p>


                                    <h2
                                        className="
                                            mt-2
                                            text-3xl
                                            font-bold
                                            tracking-tight
                                            text-white
                                            sm:text-4xl
                                        "
                                    >
                                        Welcome back, Bipasa.
                                    </h2>


                                    <p
                                        className="
                                            mt-3
                                            max-w-2xl
                                            text-sm
                                            leading-7
                                            text-zinc-500
                                        "
                                    >
                                        Manage your portfolio,
                                        projects, experience and
                                        messages from one place.
                                    </p>

                                </div>


                                {/* Error */}

                                {error && (

                                    <div
                                        className="
                                            mb-6
                                            rounded-2xl
                                            border
                                            border-red-400/10
                                            bg-red-500/[0.05]
                                            p-4
                                            text-sm
                                            text-red-300
                                        "
                                    >
                                        {error}
                                    </div>

                                )}


                                {/* =================================================
                                    STATISTICS
                                ================================================= */}

                                <div
                                    className="
                                        grid
                                        gap-4
                                        sm:grid-cols-2
                                        xl:grid-cols-4
                                    "
                                >

                                    <StatCard
                                        label="Projects"
                                        value={
                                            loading
                                                ? "..."
                                                : stats.projects
                                        }
                                        icon="◇"
                                        accent="purple"
                                    />


                                    <StatCard
                                        label="Skills"
                                        value={
                                            loading
                                                ? "..."
                                                : stats.skills
                                        }
                                        icon="✦"
                                        accent="cyan"
                                    />


                                    <StatCard
                                        label="Experience"
                                        value={
                                            loading
                                                ? "..."
                                                : stats.experience
                                        }
                                        icon="◫"
                                        accent="pink"
                                    />


                                    <StatCard
                                        label="Messages"
                                        value={
                                            loading
                                                ? "..."
                                                : stats.messages
                                        }
                                        icon="✉"
                                        accent="purple"
                                    />

                                </div>


                                {/* =================================================
                                    DASHBOARD CONTENT
                                ================================================= */}

                                <div
                                    className="
                                        mt-6
                                        grid
                                        gap-6
                                        xl:grid-cols-[1.3fr_0.7fr]
                                    "
                                >

                                    {/* Recent projects */}

                                    <div
                                        className="
                                            rounded-2xl
                                            border
                                            border-white/[0.07]
                                            bg-white/[0.025]
                                            p-6
                                            backdrop-blur-xl
                                        "
                                    >

                                        <div
                                            className="
                                                mb-6
                                                flex
                                                items-center
                                                justify-between
                                            "
                                        >

                                            <div>

                                                <h3
                                                    className="
                                                        text-base
                                                        font-semibold
                                                        text-white
                                                    "
                                                >
                                                    Recent Projects
                                                </h3>

                                                <p
                                                    className="
                                                        mt-1
                                                        text-xs
                                                        text-zinc-600
                                                    "
                                                >
                                                    Latest projects
                                                    added to portfolio
                                                </p>

                                            </div>


                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleNavigation(
                                                        "Projects"
                                                    )
                                                }
                                                className="
                                                    text-xs
                                                    text-purple-300
                                                    transition
                                                    hover:text-cyan-300
                                                "
                                            >
                                                View all →
                                            </button>

                                        </div>


                                        {loading ? (

                                            <div
                                                className="
                                                    flex
                                                    min-h-[220px]
                                                    items-center
                                                    justify-center
                                                    text-sm
                                                    text-zinc-600
                                                "
                                            >
                                                Loading projects...
                                            </div>

                                        ) : recentProjects.length === 0 ? (

                                            <EmptyState
                                                icon="◇"
                                                title="No projects yet"
                                                text="Add your first project."
                                            />

                                        ) : (

                                            <div
                                                className="
                                                    space-y-3
                                                "
                                            >

                                                {recentProjects.map(
                                                    (project) => (

                                                        <div
                                                            key={
                                                                project._id
                                                            }
                                                            className="
                                                                group
                                                                flex
                                                                items-center
                                                                gap-4
                                                                rounded-xl
                                                                border
                                                                border-white/[0.05]
                                                                bg-white/[0.018]
                                                                p-3
                                                                transition
                                                                hover:border-purple-400/15
                                                                hover:bg-purple-500/[0.025]
                                                            "
                                                        >

                                                            <div
                                                                className="
                                                                    h-14
                                                                    w-14
                                                                    shrink-0
                                                                    overflow-hidden
                                                                    rounded-xl
                                                                    border
                                                                    border-white/[0.06]
                                                                    bg-white/[0.03]
                                                                "
                                                            >

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
                                                                        "
                                                                    />

                                                                ) : (

                                                                    <div
                                                                        className="
                                                                            flex
                                                                            h-full
                                                                            w-full
                                                                            items-center
                                                                            justify-center
                                                                            text-purple-300
                                                                        "
                                                                    >
                                                                        ◇
                                                                    </div>

                                                                )}

                                                            </div>


                                                            <div
                                                                className="
                                                                    min-w-0
                                                                    flex-1
                                                                "
                                                            >

                                                                <p
                                                                    className="
                                                                        truncate
                                                                        text-sm
                                                                        font-semibold
                                                                        text-zinc-300
                                                                        group-hover:text-white
                                                                    "
                                                                >
                                                                    {
                                                                        project.title
                                                                    }
                                                                </p>


                                                                <p
                                                                    className="
                                                                        mt-1
                                                                        truncate
                                                                        text-xs
                                                                        text-zinc-600
                                                                    "
                                                                >
                                                                    {
                                                                        project.description
                                                                    }
                                                                </p>

                                                            </div>


                                                            {project.featured && (

                                                                <span
                                                                    className="
                                                                        hidden
                                                                        rounded-full
                                                                        border
                                                                        border-purple-400/15
                                                                        bg-purple-500/[0.06]
                                                                        px-2.5
                                                                        py-1
                                                                        text-[9px]
                                                                        text-purple-300
                                                                        sm:block
                                                                    "
                                                                >
                                                                    Featured
                                                                </span>

                                                            )}

                                                        </div>

                                                    )
                                                )}

                                            </div>

                                        )}

                                    </div>


                                    {/* Quick actions */}

                                    <div
                                        className="
                                            rounded-2xl
                                            border
                                            border-white/[0.07]
                                            bg-white/[0.025]
                                            p-6
                                            backdrop-blur-xl
                                        "
                                    >

                                        <h3
                                            className="
                                                text-base
                                                font-semibold
                                                text-white
                                            "
                                        >
                                            Quick Actions
                                        </h3>


                                        <p
                                            className="
                                                mt-1
                                                text-xs
                                                text-zinc-600
                                            "
                                        >
                                            Manage your portfolio
                                            quickly.
                                        </p>


                                        <div
                                            className="
                                                mt-6
                                                space-y-3
                                            "
                                        >

                                            <QuickAction
                                                icon="◇"
                                                label="Manage Projects"
                                                onClick={() =>
                                                    handleNavigation(
                                                        "Projects"
                                                    )
                                                }
                                            />


                                            <QuickAction
                                                icon="✦"
                                                label="Manage Skills"
                                                onClick={() =>
                                                    handleNavigation(
                                                        "Skills"
                                                    )
                                                }
                                            />


                                            <QuickAction
                                                icon="◫"
                                                label="Manage Experience"
                                                onClick={() =>
                                                    handleNavigation(
                                                        "Experience"
                                                    )
                                                }
                                            />


                                            <QuickAction
                                                icon="✉"
                                                label="View Messages"
                                                onClick={() =>
                                                    handleNavigation(
                                                        "Messages"
                                                    )
                                                }
                                            />

                                        </div>

                                    </div>

                                </div>

                            </div>

                        )}


                        {/* =================================================
                            PROJECTS
                        ================================================= */}

                        {activePage === "Projects" && (

                            <ProjectManager />

                        )}


                        {/* =================================================
                            SKILLS
                        ================================================= */}

                        {activePage === "Skills" && (

                            <SkillManager />

                        )}


                        {/* =================================================
                            EXPERIENCE
                        ================================================= */}

                        {activePage === "Experience" && (

                            <ExperienceManager />

                        )}


                        {/* =================================================
                            MESSAGES
                        ================================================= */}

                        {activePage === "Messages" && (

                            <MessageManager />

                        )}


                        {/* =================================================
                            SETTINGS
                        ================================================= */}

                        {activePage === "Settings" && (

                            <SettingsManager />

                        )}

                    </div>

                </div>

            </main>

        </div>

    );
};


// =========================================================
// STAT CARD
// =========================================================

const StatCard = ({
    label,
    value,
    icon,
    accent
}) => {

    const accentClasses = {

        purple:
            "text-purple-300 bg-purple-500/[0.08] border-purple-400/10",

        cyan:
            "text-cyan-300 bg-cyan-500/[0.08] border-cyan-400/10",

        pink:
            "text-pink-300 bg-pink-500/[0.08] border-pink-400/10"

    };


    return (

        <div
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
            "
        >

            {/* Glow */}

            <div
                className="
                    pointer-events-none
                    absolute
                    -right-8
                    -top-8
                    h-20
                    w-20
                    rounded-full
                    bg-purple-500/[0.08]
                    blur-2xl
                    transition
                    group-hover:bg-cyan-400/[0.08]
                "
            />


            <div
                className="
                    relative
                    flex
                    items-start
                    justify-between
                "
            >

                <div>

                    <p
                        className="
                            text-xs
                            text-zinc-600
                        "
                    >
                        {label}
                    </p>


                    <p
                        className="
                            mt-3
                            text-3xl
                            font-bold
                            text-white
                        "
                    >
                        {value}
                    </p>

                </div>


                <div
                    className={`
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        border
                        ${accentClasses[accent]}
                    `}
                >
                    {icon}
                </div>

            </div>

        </div>

    );

};


// =========================================================
// QUICK ACTION
// =========================================================

const QuickAction = ({
    icon,
    label,
    onClick
}) => {

    return (

        <button
            type="button"
            onClick={onClick}
            className="
                group
                flex
                w-full
                items-center
                gap-3
                rounded-xl
                border
                border-white/[0.06]
                bg-white/[0.02]
                p-3
                text-left
                transition-all
                duration-300
                hover:border-purple-400/20
                hover:bg-purple-500/[0.04]
            "
        >

            <span
                className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-lg
                    bg-white/[0.035]
                    text-sm
                    text-zinc-500
                    transition
                    group-hover:text-purple-300
                "
            >
                {icon}
            </span>


            <span
                className="
                    flex-1
                    text-xs
                    font-medium
                    text-zinc-400
                    group-hover:text-white
                "
            >
                {label}
            </span>


            <span
                className="
                    text-zinc-700
                    transition
                    group-hover:translate-x-1
                    group-hover:text-cyan-300
                "
            >
                →
            </span>

        </button>

    );

};


// =========================================================
// EMPTY STATE
// =========================================================

const EmptyState = ({
    icon,
    title,
    text
}) => {

    return (

        <div
            className="
                flex
                min-h-[220px]
                flex-col
                items-center
                justify-center
                text-center
            "
        >

            <div
                className="
                    mb-4
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-purple-400/10
                    bg-purple-500/[0.05]
                    text-xl
                    text-purple-300
                "
            >
                {icon}
            </div>


            <p
                className="
                    text-sm
                    font-medium
                    text-zinc-400
                "
            >
                {title}
            </p>


            <p
                className="
                    mt-1
                    text-xs
                    text-zinc-700
                "
            >
                {text}
            </p>

        </div>

    );

};


export default AdminDashboard;