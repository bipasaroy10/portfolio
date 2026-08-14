import { useEffect, useRef, useState } from "react";
import { getProjects } from "../services/api";


const Projects = () => {

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const sectionRef = useRef(null);

    const [visible, setVisible] = useState(false);


    /* =========================================
       LOAD PROJECTS
    ========================================= */

    useEffect(() => {

        const loadProjects = async () => {

            try {

                setLoading(true);
                setError("");

                const response =
                    await getProjects();


                if (response.success) {

                    setProjects(
                        response.data || []
                    );

                } else {

                    setError(
                        "Failed to load projects"
                    );

                }

            } catch (error) {

                console.error(
                    "Projects error:",
                    error
                );

                setError(
                    "Unable to connect to server"
                );

            } finally {

                setLoading(false);

            }

        };


        loadProjects();

    }, []);


    /* =========================================
       SCROLL REVEAL
    ========================================= */

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
                    threshold: 0.08
                }
            );


        observer.observe(element);


        return () => {
            observer.disconnect();
        };

    }, []);


    /* =========================================
       FEATURED FIRST
    ========================================= */

    const sortedProjects = [
        ...projects
    ].sort(
        (a, b) =>
            Number(b.featured) -
            Number(a.featured)
    );


    return (

        <section
            ref={sectionRef}
            id="projects"
            className="
                premium-section
                relative
                overflow-hidden
            "
        >

            {/* =========================================
                BACKGROUND GLOWS
            ========================================= */}

            <div
                className="
                    pointer-events-none
                    absolute
                    left-[-180px]
                    top-1/4
                    h-[420px]
                    w-[420px]
                    rounded-full
                    bg-purple-600/[0.08]
                    blur-[130px]
                "
            />


            <div
                className="
                    pointer-events-none
                    absolute
                    right-[-180px]
                    top-1/3
                    h-[420px]
                    w-[420px]
                    rounded-full
                    bg-cyan-500/[0.07]
                    blur-[130px]
                "
            />


            <div
                className="
                    pointer-events-none
                    absolute
                    bottom-20
                    left-1/2
                    h-[280px]
                    w-[280px]
                    -translate-x-1/2
                    rounded-full
                    bg-pink-500/[0.035]
                    blur-[110px]
                "
            />


            <div
                className="
                    premium-container
                    relative
                    z-10
                "
            >

                {/* =====================================
                    SECTION HEADER
                ===================================== */}

                <div
                    className={`
                        mb-14
                        flex
                        flex-col
                        justify-between
                        gap-6
                        transition-all
                        duration-1000
                        lg:flex-row
                        lg:items-end
                        ${
                            visible
                                ? "translate-y-0 opacity-100"
                                : "translate-y-8 opacity-0"
                        }
                    `}
                >

                    <div>

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
                                    to-pink-400
                                "
                            />

                            <span
                                className="
                                    text-xs
                                    font-bold
                                    uppercase
                                    tracking-[0.22em]
                                    text-pink-300
                                "
                            >
                                Selected Work
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

                            Things I've
                            <span className="accent-text">
                                {" "}built.
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
                            A selection of projects where I
                            turned ideas into functional,
                            scalable web experiences.
                        </p>

                    </div>


                    {/* Project count */}

                    {!loading &&
                        !error &&
                        projects.length > 0 && (

                            <div
                                className="
                                    hidden
                                    shrink-0
                                    rounded-2xl
                                    border
                                    border-white/[0.08]
                                    bg-white/[0.025]
                                    px-5
                                    py-4
                                    backdrop-blur-xl
                                    sm:block
                                "
                            >

                                <p
                                    className="
                                        text-2xl
                                        font-bold
                                        text-white
                                    "
                                >
                                    {projects.length}
                                </p>

                                <p
                                    className="
                                        mt-1
                                        text-xs
                                        uppercase
                                        tracking-wider
                                        text-zinc-600
                                    "
                                >
                                    Projects
                                </p>

                            </div>

                        )}

                </div>


                {/* =====================================
                    LOADING
                ===================================== */}

                {loading && (

                    <div
                        className="
                            grid
                            gap-6
                            md:grid-cols-2
                            lg:grid-cols-3
                        "
                    >

                        {Array.from({
                            length: 3
                        }).map((_, index) => (

                            <div
                                key={index}
                                className="
                                    h-[500px]
                                    animate-pulse
                                    rounded-3xl
                                    border
                                    border-white/[0.06]
                                    bg-white/[0.025]
                                "
                            />

                        ))}

                    </div>

                )}


                {/* =====================================
                    ERROR
                ===================================== */}

                {!loading && error && (

                    <div
                        className="
                            glass-panel
                            flex
                            flex-col
                            items-center
                            justify-center
                            px-6
                            py-16
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
                                border-red-400/20
                                bg-red-500/10
                                text-red-300
                            "
                        >
                            !
                        </div>


                        <h3
                            className="
                                text-lg
                                font-semibold
                                text-white
                            "
                        >
                            Unable to load projects
                        </h3>


                        <p
                            className="
                                mt-2
                                text-sm
                                text-zinc-500
                            "
                        >
                            {error}
                        </p>

                    </div>

                )}


                {/* =====================================
                    EMPTY
                ===================================== */}

                {!loading &&
                    !error &&
                    projects.length === 0 && (

                        <div
                            className="
                                glass-panel
                                flex
                                flex-col
                                items-center
                                justify-center
                                px-6
                                py-20
                                text-center
                            "
                        >

                            <div
                                className="
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
                                "
                            >
                                ◇
                            </div>


                            <h3
                                className="
                                    text-xl
                                    font-semibold
                                    text-white
                                "
                            >
                                Projects coming soon
                            </h3>


                            <p
                                className="
                                    mt-2
                                    max-w-md
                                    text-sm
                                    leading-6
                                    text-zinc-500
                                "
                            >
                                I'm currently working on some
                                exciting projects. Check back
                                soon.
                            </p>

                        </div>

                    )}


                {/* =====================================
                    PROJECT GRID
                ===================================== */}

                {!loading &&
                    !error &&
                    sortedProjects.length > 0 && (

                        <div
                            className="
                                grid
                                gap-6
                                md:grid-cols-2
                                lg:grid-cols-3
                            "
                        >

                            {sortedProjects.map(
                                (project, index) => (

                                    <article
                                        key={project._id}
                                        className={`
                                            project-card
                                            group
                                            relative
                                            overflow-hidden
                                            rounded-3xl
                                            border
                                            border-white/[0.08]
                                            bg-white/[0.025]
                                            backdrop-blur-xl
                                            transition-all
                                            duration-700
                                            hover:-translate-y-2
                                            hover:border-purple-400/25
                                            hover:shadow-2xl
                                            hover:shadow-purple-950/20
                                            ${
                                                visible
                                                    ? "translate-y-0 opacity-100"
                                                    : "translate-y-12 opacity-0"
                                            }
                                        `}
                                        style={{
                                            transitionDelay:
                                                `${150 + index * 120}ms`
                                        }}
                                    >

                                        {/* =================================
                                            PROJECT IMAGE
                                        ================================= */}

                                        <div
                                            className="
                                                project-image
                                                relative
                                                h-56
                                                overflow-hidden
                                                bg-zinc-900
                                            "
                                        >

                                            {project.image &&
                                            project.image.trim() !== "" ? (

                                                <img
                                                    src={
                                                        project.image
                                                    }
                                                    alt={
                                                        project.title
                                                    }
                                                    loading="lazy"
                                                    className="
                                                        h-full
                                                        w-full
                                                        object-cover
                                                        transition-transform
                                                        duration-700
                                                        group-hover:scale-110
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
                                                        bg-gradient-to-br
                                                        from-purple-950
                                                        via-zinc-950
                                                        to-cyan-950
                                                    "
                                                >

                                                    <div
                                                        className="
                                                            text-center
                                                        "
                                                    >

                                                        <div
                                                            className="
                                                                mx-auto
                                                                mb-3
                                                                flex
                                                                h-14
                                                                w-14
                                                                items-center
                                                                justify-center
                                                                rounded-2xl
                                                                border
                                                                border-purple-400/20
                                                                bg-purple-500/10
                                                                text-xl
                                                                text-purple-300
                                                            "
                                                        >
                                                            ◇
                                                        </div>


                                                        <p
                                                            className="
                                                                text-xs
                                                                uppercase
                                                                tracking-[0.15em]
                                                                text-zinc-600
                                                            "
                                                        >
                                                            Project
                                                        </p>

                                                    </div>

                                                </div>

                                            )}


                                            {/* Image gradient */}

                                            <div
                                                className="
                                                    pointer-events-none
                                                    absolute
                                                    inset-0
                                                    bg-gradient-to-t
                                                    from-black/80
                                                    via-black/10
                                                    to-transparent
                                                "
                                            />


                                            {/* Hover image glow */}

                                            <div
                                                className="
                                                    pointer-events-none
                                                    absolute
                                                    inset-0
                                                    bg-gradient-to-tr
                                                    from-purple-500/0
                                                    via-transparent
                                                    to-cyan-400/0
                                                    transition
                                                    duration-500
                                                    group-hover:from-purple-500/10
                                                    group-hover:to-cyan-400/10
                                                "
                                            />


                                            {/* Featured badge */}

                                            {project.featured && (

                                                <div
                                                    className="
                                                        absolute
                                                        left-4
                                                        top-4
                                                        flex
                                                        items-center
                                                        gap-2
                                                        rounded-full
                                                        border
                                                        border-purple-300/20
                                                        bg-black/50
                                                        px-3
                                                        py-1.5
                                                        text-[10px]
                                                        font-bold
                                                        uppercase
                                                        tracking-wider
                                                        text-purple-200
                                                        backdrop-blur-xl
                                                    "
                                                >

                                                    <span
                                                        className="
                                                            h-1.5
                                                            w-1.5
                                                            rounded-full
                                                            bg-purple-400
                                                            shadow-[0_0_8px_rgba(167,139,250,0.9)]
                                                        "
                                                    />

                                                    Featured

                                                </div>

                                            )}


                                            {/* Open project icon */}

                                            <div
                                                className="
                                                    absolute
                                                    right-4
                                                    top-4
                                                    flex
                                                    h-9
                                                    w-9
                                                    translate-y-2
                                                    items-center
                                                    justify-center
                                                    rounded-xl
                                                    border
                                                    border-white/10
                                                    bg-black/40
                                                    text-white
                                                    opacity-0
                                                    backdrop-blur-xl
                                                    transition-all
                                                    duration-300
                                                    group-hover:translate-y-0
                                                    group-hover:opacity-100
                                                "
                                            >

                                                ↗

                                            </div>

                                        </div>


                                        {/* =================================
                                            CONTENT
                                        ================================= */}

                                        <div
                                            className="
                                                flex
                                                min-h-[310px]
                                                flex-col
                                                p-6
                                            "
                                        >

                                            <div
                                                className="
                                                    flex
                                                    items-start
                                                    justify-between
                                                    gap-4
                                                "
                                            >

                                                <h3
                                                    className="
                                                        text-xl
                                                        font-bold
                                                        leading-tight
                                                        text-white
                                                        transition
                                                        duration-300
                                                        group-hover:text-purple-200
                                                    "
                                                >
                                                    {
                                                        project.title
                                                    }
                                                </h3>

                                            </div>


                                            <p
                                                className="
                                                    mt-4
                                                    line-clamp-3
                                                    text-sm
                                                    leading-7
                                                    text-zinc-500
                                                "
                                            >
                                                {
                                                    project.description
                                                }
                                            </p>


                                            {/* =================================
                                                TECHNOLOGIES
                                            ================================= */}

                                            {project.technologies?.length >
                                                0 && (

                                                <div
                                                    className="
                                                        mt-6
                                                        flex
                                                        flex-wrap
                                                        gap-2
                                                    "
                                                >

                                                    {project.technologies
                                                        .slice(0, 5)
                                                        .map(
                                                            (
                                                                technology,
                                                                technologyIndex
                                                            ) => (

                                                                <span
                                                                    key={
                                                                        `${technology}-${technologyIndex}`
                                                                    }
                                                                    className="
                                                                        rounded-lg
                                                                        border
                                                                        border-white/[0.07]
                                                                        bg-white/[0.025]
                                                                        px-2.5
                                                                        py-1.5
                                                                        text-[10px]
                                                                        font-medium
                                                                        text-zinc-500
                                                                        transition
                                                                        duration-300
                                                                        group-hover:border-purple-400/15
                                                                        group-hover:text-zinc-300
                                                                    "
                                                                >
                                                                    {
                                                                        technology
                                                                    }
                                                                </span>

                                                            )
                                                        )}

                                                    {project.technologies.length >
                                                        5 && (

                                                        <span
                                                            className="
                                                                rounded-lg
                                                                border
                                                                border-white/[0.07]
                                                                bg-white/[0.025]
                                                                px-2.5
                                                                py-1.5
                                                                text-[10px]
                                                                font-medium
                                                                text-zinc-600
                                                            "
                                                        >
                                                            +
                                                            {project
                                                                .technologies
                                                                .length -
                                                                5}
                                                        </span>

                                                    )}

                                                </div>

                                            )}


                                            {/* =================================
                                                LINKS
                                            ================================= */}

                                            <div
                                                className="
                                                    mt-auto
                                                    flex
                                                    gap-3
                                                    pt-7
                                                "
                                            >

                                                {project.github &&
                                                    project.github.trim() !==
                                                        "" && (

                                                        <a
                                                            href={
                                                                project.github
                                                            }
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="
                                                                project-button
                                                                group/github
                                                                flex
                                                                flex-1
                                                                items-center
                                                                justify-center
                                                                gap-2
                                                                rounded-xl
                                                                border
                                                                border-white/[0.08]
                                                                bg-white/[0.03]
                                                                px-4
                                                                py-3
                                                                text-xs
                                                                font-semibold
                                                                text-zinc-300
                                                                transition-all
                                                                duration-300
                                                                hover:border-purple-400/25
                                                                hover:bg-purple-500/[0.07]
                                                                hover:text-white
                                                            "
                                                        >

                                                            <svg
                                                                width="16"
                                                                height="16"
                                                                viewBox="0 0 24 24"
                                                                fill="currentColor"
                                                            >
                                                                <path
                                                                    d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.04c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.74.08-.74 1.2.08 1.84 1.23 1.84 1.23 1.07 1.83 2.81 1.3 3.5.99.11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.4 11.4 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z"
                                                                />
                                                            </svg>

                                                            GitHub

                                                            <span
                                                                className="
                                                                    transition-transform
                                                                    duration-300
                                                                    group-hover/github:translate-x-0.5
                                                                "
                                                            >
                                                                ↗
                                                            </span>

                                                        </a>

                                                    )}


                                                {project.liveDemo &&
                                                    project.liveDemo.trim() !==
                                                        "" && (

                                                        <a
                                                            href={
                                                                project.liveDemo
                                                            }
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="
                                                                project-button
                                                                group/live
                                                                flex
                                                                flex-1
                                                                items-center
                                                                justify-center
                                                                gap-2
                                                                rounded-xl
                                                                bg-gradient-to-r
                                                                from-purple-600
                                                                to-violet-600
                                                                px-4
                                                                py-3
                                                                text-xs
                                                                font-semibold
                                                                text-white
                                                                shadow-lg
                                                                shadow-purple-950/20
                                                                transition-all
                                                                duration-300
                                                                hover:-translate-y-0.5
                                                                hover:from-purple-500
                                                                hover:to-cyan-500
                                                                hover:shadow-purple-500/20
                                                            "
                                                        >

                                                            <svg
                                                                width="15"
                                                                height="15"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                strokeWidth="2"
                                                            >

                                                                <circle
                                                                    cx="12"
                                                                    cy="12"
                                                                    r="9"
                                                                />

                                                                <line
                                                                    x1="3"
                                                                    y1="12"
                                                                    x2="21"
                                                                    y2="12"
                                                                />

                                                                <path
                                                                    d="M12 3a14 14 0 0 1 0 18"
                                                                />

                                                            </svg>

                                                            Live Demo

                                                            <span
                                                                className="
                                                                    transition-transform
                                                                    duration-300
                                                                    group-hover/live:translate-x-0.5
                                                                "
                                                            >
                                                                ↗
                                                            </span>

                                                        </a>

                                                    )}

                                            </div>

                                        </div>

                                    </article>

                                )
                            )}

                        </div>

                    )}


                {/* =====================================
                    BOTTOM CTA
                ===================================== */}

                {!loading &&
                    !error &&
                    projects.length > 0 && (

                        <div
                            className={`
                                mt-14
                                text-center
                                transition-all
                                duration-1000
                                delay-700
                                ${
                                    visible
                                        ? "translate-y-0 opacity-100"
                                        : "translate-y-6 opacity-0"
                                }
                            `}
                        >

                            <p
                                className="
                                    text-sm
                                    text-zinc-600
                                "
                            >
                                More projects and experiments
                                are always in progress.
                            </p>

                        </div>

                    )}

            </div>

        </section>
    );
};


export default Projects;