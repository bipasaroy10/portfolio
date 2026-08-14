import { useEffect, useRef, useState } from "react";
import { getSkills } from "../services/api";


// ============================================================
// CATEGORY CONFIGURATION
// ============================================================

const categoryConfig = {
    Frontend: {
        id: "frontend",
        title: "Frontend",
        description: "Modern interfaces and responsive experiences",
        icon: "◇",
        color: "pink",
    },

    Backend: {
        id: "backend",
        title: "Backend",
        description: "Server-side development and API architecture",
        icon: "⚙",
        color: "purple",
    },

    Database: {
        id: "database",
        title: "Database",
        description: "Data modeling and database management",
        icon: "◈",
        color: "cyan",
    },

    Tools: {
        id: "tools",
        title: "Tools",
        description: "Development tools and engineering workflow",
        icon: "✦",
        color: "purple",
    },

    Other: {
        id: "other",
        title: "Other",
        description: "Additional technologies and capabilities",
        icon: "✧",
        color: "pink",
    },
};


// ============================================================
// LEVEL → VISUAL PERCENTAGE
// ============================================================

const levelToPercentage = (level) => {

    switch (level) {

        case "Beginner":
            return 55;

        case "Intermediate":
            return 75;

        case "Advanced":
            return 90;

        default:
            return 70;
    }
};


// ============================================================
// SHORT LABEL
// ============================================================

const getShortName = (name) => {

    if (!name) {
        return "?";
    }

    const words = name
        .trim()
        .split(/\s+/);

    if (words.length === 1) {

        return name
            .slice(0, 4)
            .toUpperCase();
    }

    return words
        .slice(0, 3)
        .map((word) => word[0])
        .join("")
        .toUpperCase();
};


// ============================================================
// COMPONENT
// ============================================================

const Skills = () => {

    const sectionRef = useRef(null);

    const [visible, setVisible] =
        useState(false);

    const [skills, setSkills] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [activeCategory, setActiveCategory] =
        useState("Backend");


    // ========================================================
    // LOAD SKILLS FROM BACKEND
    // ========================================================

    useEffect(() => {

        const loadSkills = async () => {

            try {

                setLoading(true);
                setError("");

                const response =
                    await getSkills();

                console.log(
                    "Skills API response:",
                    response
                );

                if (response.success) {

                    setSkills(
                        response.data || []
                    );

                } else {

                    setError(
                        "Failed to load skills"
                    );
                }

            } catch (error) {

                console.error(
                    "Skills loading error:",
                    error
                );

                setError(
                    error.message ||
                    "Unable to load skills"
                );

            } finally {

                setLoading(false);

            }
        };


        loadSkills();

    }, []);


    // ========================================================
    // SCROLL REVEAL
    // ========================================================

    useEffect(() => {

        const element =
            sectionRef.current;

        if (!element) {
            return;
        }

        const observer =
            new IntersectionObserver(
                ([entry]) => {

                    if (entry.isIntersecting) {

                        setVisible(true);

                        observer.disconnect();
                    }

                },
                {
                    threshold: 0.12
                }
            );

        observer.observe(element);


        return () => {

            observer.disconnect();

        };

    }, []);


    // ========================================================
    // CREATE CATEGORY DATA FROM API
    // ========================================================

    const skillCategories =
        Object.keys(categoryConfig)
            .map((categoryName) => {

                const config =
                    categoryConfig[
                        categoryName
                    ];

                const categorySkills =
                    skills.filter(
                        (skill) =>
                            skill.category ===
                            categoryName
                    );


                return {
                    ...config,
                    categoryName,
                    skills: categorySkills
                };

            })
            .filter(
                (category) =>
                    category.skills.length > 0
            );


    // ========================================================
    // ACTIVE CATEGORY
    // ========================================================

    const active =
        skillCategories.find(
            (category) =>
                category.categoryName ===
                activeCategory
        );


    // ========================================================
    // FALLBACK ACTIVE CATEGORY
    // ========================================================

    useEffect(() => {

        if (
            skillCategories.length > 0 &&
            !skillCategories.some(
                (category) =>
                    category.categoryName ===
                    activeCategory
            )
        ) {

            setActiveCategory(
                skillCategories[0].categoryName
            );
        }

    }, [skills]);


    // ========================================================
    // TOOLS
    // ========================================================

    const tools =
        skills.filter(
            (skill) =>
                skill.category === "Tools"
        );


    // ========================================================
    // RENDER
    // ========================================================

    return (

        <section
            ref={sectionRef}
            id="skills"
            className="
                premium-section
                relative
                overflow-hidden
            "
        >

            {/* =================================================
                BACKGROUND GLOWS
            ================================================= */}

            <div
                className="
                    pointer-events-none
                    absolute
                    -right-40
                    top-20
                    h-[400px]
                    w-[400px]
                    rounded-full
                    bg-cyan-500/[0.07]
                    blur-[130px]
                "
            />


            <div
                className="
                    pointer-events-none
                    absolute
                    -left-40
                    bottom-20
                    h-[400px]
                    w-[400px]
                    rounded-full
                    bg-purple-600/[0.09]
                    blur-[130px]
                "
            />


            <div
                className="
                    pointer-events-none
                    absolute
                    left-1/2
                    top-1/2
                    h-[250px]
                    w-[250px]
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                    bg-pink-500/[0.035]
                    blur-[100px]
                "
            />


            {/* =================================================
                MAIN CONTAINER
            ================================================= */}

            <div
                className="
                    premium-container
                    relative
                    z-10
                "
            >


                {/* =================================================
                    HEADER
                ================================================= */}

                <div
                    className={`
                        mb-14
                        max-w-3xl
                        transition-all
                        duration-1000
                        ${
                            visible
                                ? "translate-y-0 opacity-100"
                                : "translate-y-8 opacity-0"
                        }
                    `}
                >

                    <div
                        className="
                            mb-5
                            flex
                            items-center
                            gap-3
                        "
                    >

                        <span
                            className="
                                h-px
                                w-10
                                bg-gradient-to-r
                                from-purple-400
                                to-cyan-400
                            "
                        />

                        <span
                            className="
                                text-xs
                                font-bold
                                uppercase
                                tracking-[0.22em]
                                text-cyan-300
                            "
                        >
                            Skills & Expertise
                        </span>

                    </div>


                    <h2
                        className="
                            text-4xl
                            font-bold
                            leading-tight
                            tracking-tight
                            text-white
                            sm:text-5xl
                            md:text-6xl
                        "
                    >

                        The tools behind

                        <span className="accent-text">
                            {" "}my work.
                        </span>

                    </h2>


                    <p
                        className="
                            mt-5
                            max-w-2xl
                            text-base
                            leading-8
                            text-zinc-400
                            sm:text-lg
                        "
                    >
                        A collection of technologies and tools
                        I use to design, build and maintain
                        modern web applications.
                    </p>

                </div>


                {/* =================================================
                    LOADING
                ================================================= */}

                {loading && (

                    <div
                        className="
                            glass-panel
                            flex
                            min-h-[220px]
                            items-center
                            justify-center
                            text-zinc-400
                        "
                    >

                        <div className="text-center">

                            <div
                                className="
                                    mx-auto
                                    mb-4
                                    h-8
                                    w-8
                                    animate-spin
                                    rounded-full
                                    border-2
                                    border-purple-400/20
                                    border-t-purple-400
                                "
                            />

                            <p>
                                Loading skills...
                            </p>

                        </div>

                    </div>

                )}


                {/* =================================================
                    ERROR
                ================================================= */}

                {!loading && error && (

                    <div
                        className="
                            rounded-2xl
                            border
                            border-red-500/20
                            bg-red-500/[0.05]
                            p-6
                            text-red-300
                        "
                    >

                        <p className="font-semibold">
                            Unable to load skills
                        </p>

                        <p className="mt-2 text-sm text-red-300/70">
                            {error}
                        </p>

                    </div>

                )}


                {/* =================================================
                    EMPTY STATE
                ================================================= */}

                {!loading &&
                    !error &&
                    skills.length === 0 && (

                        <div
                            className="
                                glass-panel
                                p-10
                                text-center
                            "
                        >

                            <div
                                className="
                                    mx-auto
                                    mb-5
                                    flex
                                    h-16
                                    w-16
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    border
                                    border-purple-400/20
                                    bg-purple-500/10
                                    text-2xl
                                    text-purple-300
                                "
                            >
                                ✦
                            </div>

                            <h3
                                className="
                                    text-xl
                                    font-semibold
                                    text-white
                                "
                            >
                                No skills added yet
                            </h3>

                            <p
                                className="
                                    mt-2
                                    text-sm
                                    text-zinc-500
                                "
                            >
                                Add skills from the admin dashboard.
                            </p>

                        </div>

                    )}


                {/* =================================================
                    SKILLS CONTENT
                ================================================= */}

                {!loading &&
                    !error &&
                    skills.length > 0 && (

                        <>


                            {/* =====================================
                                CATEGORY SELECTOR
                            ===================================== */}

                            <div
                                className={`
                                    mb-6
                                    grid
                                    gap-3
                                    sm:grid-cols-2
                                    md:grid-cols-3
                                    lg:grid-cols-4
                                    transition-all
                                    duration-1000
                                    delay-100
                                    ${
                                        visible
                                            ? "translate-y-0 opacity-100"
                                            : "translate-y-8 opacity-0"
                                    }
                                `}
                            >

                                {skillCategories.map(
                                    (category) => {

                                        const isActive =
                                            activeCategory ===
                                            category.categoryName;


                                        return (

                                            <button
                                                key={
                                                    category.categoryName
                                                }
                                                type="button"
                                                onClick={() =>
                                                    setActiveCategory(
                                                        category.categoryName
                                                    )
                                                }
                                                className={`
                                                    skill-category-button
                                                    group
                                                    relative
                                                    overflow-hidden
                                                    rounded-2xl
                                                    border
                                                    p-5
                                                    text-left
                                                    transition-all
                                                    duration-300
                                                    ${
                                                        isActive
                                                            ? `
                                                                border-purple-400/25
                                                                bg-purple-500/[0.08]
                                                                shadow-lg
                                                                shadow-purple-950/20
                                                            `
                                                            : `
                                                                border-white/[0.07]
                                                                bg-white/[0.025]
                                                                hover:border-white/[0.14]
                                                                hover:bg-white/[0.045]
                                                            `
                                                    }
                                                `}
                                            >

                                                {isActive && (

                                                    <span
                                                        className="
                                                            absolute
                                                            right-0
                                                            top-0
                                                            h-24
                                                            w-24
                                                            rounded-full
                                                            bg-purple-500/10
                                                            blur-2xl
                                                        "
                                                    />

                                                )}


                                                <div
                                                    className="
                                                        relative
                                                        z-10
                                                        flex
                                                        items-start
                                                        justify-between
                                                        gap-4
                                                    "
                                                >

                                                    <div
                                                        className="
                                                            flex
                                                            gap-4
                                                        "
                                                    >

                                                        <div
                                                            className={`
                                                                flex
                                                                h-11
                                                                w-11
                                                                shrink-0
                                                                items-center
                                                                justify-center
                                                                rounded-xl
                                                                border
                                                                text-lg
                                                                transition-all
                                                                duration-300
                                                                ${
                                                                    isActive
                                                                        ? `
                                                                            border-purple-400/20
                                                                            bg-purple-500/10
                                                                            text-purple-300
                                                                        `
                                                                        : `
                                                                            border-white/10
                                                                            bg-white/5
                                                                            text-zinc-400
                                                                        `
                                                                }
                                                            `}
                                                        >
                                                            {category.icon}
                                                        </div>


                                                        <div>

                                                            <h3
                                                                className={`
                                                                    font-semibold
                                                                    transition
                                                                    ${
                                                                        isActive
                                                                            ? "text-white"
                                                                            : "text-zinc-300"
                                                                    }
                                                                `}
                                                            >
                                                                {
                                                                    category.title
                                                                }
                                                            </h3>


                                                            <p
                                                                className="
                                                                    mt-1
                                                                    text-xs
                                                                    leading-5
                                                                    text-zinc-600
                                                                "
                                                            >
                                                                {
                                                                    category.description
                                                                }
                                                            </p>

                                                        </div>

                                                    </div>


                                                    <span
                                                        className={`
                                                            mt-1
                                                            h-2
                                                            w-2
                                                            shrink-0
                                                            rounded-full
                                                            bg-gradient-to-r
                                                            from-purple-400
                                                            to-cyan-400
                                                            transition
                                                            ${
                                                                isActive
                                                                    ? "scale-100 opacity-100"
                                                                    : "scale-0 opacity-0"
                                                            }
                                                        `}
                                                    />

                                                </div>

                                            </button>

                                        );

                                    }
                                )}

                            </div>


                            {/* =====================================
                                ACTIVE SKILL PANEL
                            ===================================== */}

                            {active && (

                                <div
                                    className={`
                                        glass-panel
                                        relative
                                        overflow-hidden
                                        p-6
                                        transition-all
                                        duration-1000
                                        delay-200
                                        sm:p-8
                                        ${
                                            visible
                                                ? "translate-y-0 opacity-100"
                                                : "translate-y-10 opacity-0"
                                        }
                                    `}
                                >

                                    {/* Top gradient */}

                                    <div
                                        className="
                                            pointer-events-none
                                            absolute
                                            left-1/2
                                            top-0
                                            h-px
                                            w-2/3
                                            -translate-x-1/2
                                            bg-gradient-to-r
                                            from-transparent
                                            via-purple-400/60
                                            to-transparent
                                        "
                                    />


                                    <div
                                        className="
                                            mb-8
                                            flex
                                            flex-col
                                            justify-between
                                            gap-4
                                            sm:flex-row
                                            sm:items-end
                                        "
                                    >

                                        <div>

                                            <p
                                                className="
                                                    text-xs
                                                    uppercase
                                                    tracking-[0.18em]
                                                    text-zinc-600
                                                "
                                            >
                                                Expertise
                                            </p>


                                            <h3
                                                className="
                                                    mt-1
                                                    text-2xl
                                                    font-bold
                                                    text-white
                                                "
                                            >
                                                {active.title}
                                            </h3>

                                        </div>


                                        <p
                                            className="
                                                text-sm
                                                text-zinc-500
                                            "
                                        >
                                            {
                                                active.skills.length
                                            }{" "}
                                            core skills
                                        </p>

                                    </div>


                                    {/* =================================
                                        SKILL LIST
                                    ================================= */}

                                    <div
                                        className="
                                            grid
                                            gap-x-10
                                            gap-y-7
                                            md:grid-cols-2
                                        "
                                    >

                                        {active.skills.map(
                                            (skill, index) => {

                                                const percentage =
                                                    levelToPercentage(
                                                        skill.level
                                                    );


                                                return (

                                                    <div
                                                        key={
                                                            skill._id
                                                        }
                                                        className="
                                                            group
                                                        "
                                                    >

                                                        <div
                                                            className="
                                                                mb-3
                                                                flex
                                                                items-center
                                                                justify-between
                                                            "
                                                        >

                                                            <div
                                                                className="
                                                                    flex
                                                                    items-center
                                                                    gap-3
                                                                "
                                                            >

                                                                <span
                                                                    className="
                                                                        flex
                                                                        h-9
                                                                        min-w-9
                                                                        items-center
                                                                        justify-center
                                                                        rounded-lg
                                                                        border
                                                                        border-white/10
                                                                        bg-white/[0.04]
                                                                        px-2
                                                                        text-[10px]
                                                                        font-bold
                                                                        text-zinc-300
                                                                    "
                                                                >
                                                                    {
                                                                        skill.icon ||
                                                                        getShortName(
                                                                            skill.name
                                                                        )
                                                                    }
                                                                </span>


                                                                <span
                                                                    className="
                                                                        text-sm
                                                                        font-medium
                                                                        text-zinc-300
                                                                        transition
                                                                        group-hover:text-white
                                                                    "
                                                                >
                                                                    {
                                                                        skill.name
                                                                    }
                                                                </span>

                                                            </div>


                                                            <span
                                                                className="
                                                                    text-xs
                                                                    font-semibold
                                                                    text-zinc-500
                                                                "
                                                            >
                                                                {
                                                                    percentage
                                                                }%
                                                            </span>

                                                        </div>


                                                        {/* Progress */}

                                                        <div
                                                            className="
                                                                h-2
                                                                overflow-hidden
                                                                rounded-full
                                                                bg-white/[0.05]
                                                            "
                                                        >

                                                            <div
                                                                className="
                                                                    skill-progress
                                                                    relative
                                                                    h-full
                                                                    rounded-full
                                                                    bg-gradient-to-r
                                                                    from-purple-500
                                                                    via-fuchsia-500
                                                                    to-cyan-400
                                                                "
                                                                style={{
                                                                    width:
                                                                        visible
                                                                            ? `${percentage}%`
                                                                            : "0%",

                                                                    transition:
                                                                        "width 1s ease",

                                                                    transitionDelay:
                                                                        `${500 + index * 120}ms`
                                                                }}
                                                            >

                                                                <span
                                                                    className="
                                                                        absolute
                                                                        right-0
                                                                        top-0
                                                                        h-full
                                                                        w-16
                                                                        bg-gradient-to-r
                                                                        from-transparent
                                                                        to-white/30
                                                                        blur-sm
                                                                    "
                                                                />

                                                            </div>

                                                        </div>


                                                        {/* Level label */}

                                                        <p
                                                            className="
                                                                mt-2
                                                                text-[10px]
                                                                uppercase
                                                                tracking-wider
                                                                text-zinc-600
                                                            "
                                                        >
                                                            {
                                                                skill.level
                                                            }
                                                        </p>

                                                    </div>

                                                );

                                            }
                                        )}

                                    </div>

                                </div>

                            )}


                            {/* =====================================
                                TOOLS & WORKFLOW
                            ===================================== */}

                            {tools.length > 0 && (

                                <div
                                    className={`
                                        mt-6
                                        transition-all
                                        duration-1000
                                        delay-500
                                        ${
                                            visible
                                                ? "translate-y-0 opacity-100"
                                                : "translate-y-8 opacity-0"
                                        }
                                    `}
                                >

                                    <div
                                        className="
                                            mb-5
                                            flex
                                            items-center
                                            gap-3
                                        "
                                    >

                                        <span
                                            className="
                                                h-px
                                                w-7
                                                bg-gradient-to-r
                                                from-pink-400
                                                to-purple-400
                                            "
                                        />

                                        <p
                                            className="
                                                text-xs
                                                font-bold
                                                uppercase
                                                tracking-[0.2em]
                                                text-zinc-500
                                            "
                                        >
                                            Tools & Workflow
                                        </p>

                                    </div>


                                    <div
                                        className="
                                            flex
                                            flex-wrap
                                            gap-3
                                        "
                                    >

                                        {tools.map(
                                            (tool, index) => (

                                                <span
                                                    key={tool._id}
                                                    className="
                                                        group
                                                        cursor-default
                                                        rounded-full
                                                        border
                                                        border-white/[0.08]
                                                        bg-white/[0.025]
                                                        px-4
                                                        py-2.5
                                                        text-xs
                                                        font-medium
                                                        text-zinc-500
                                                        transition-all
                                                        duration-300
                                                        hover:-translate-y-1
                                                        hover:border-purple-400/25
                                                        hover:bg-purple-500/[0.06]
                                                        hover:text-purple-200
                                                    "
                                                    style={{
                                                        transitionDelay:
                                                            `${index * 30}ms`
                                                    }}
                                                >
                                                    {tool.name}
                                                </span>

                                            )
                                        )}

                                    </div>

                                </div>

                            )}

                        </>

                    )}


                {/* =================================================
                    BOTTOM STATEMENT
                ================================================= */}

                {!loading &&
                    !error &&
                    skills.length > 0 && (

                        <div
                            className="
                                mt-14
                                flex
                                items-center
                                justify-center
                                gap-4
                            "
                        >

                            <span
                                className="
                                    hidden
                                    h-px
                                    w-12
                                    bg-gradient-to-r
                                    from-transparent
                                    to-purple-500/30
                                    sm:block
                                "
                            />

                            <p
                                className="
                                    text-center
                                    text-xs
                                    text-zinc-600
                                "
                            >
                                Always learning. Always building.
                            </p>

                            <span
                                className="
                                    hidden
                                    h-px
                                    w-12
                                    bg-gradient-to-l
                                    from-transparent
                                    to-cyan-500/30
                                    sm:block
                                "
                            />

                        </div>

                    )}

            </div>

        </section>
    );
};


export default Skills;