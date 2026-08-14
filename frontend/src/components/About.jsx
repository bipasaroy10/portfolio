import { useEffect, useRef, useState } from "react";
import { useSettings } from "../context/SettingsContext";


const About = () => {

    const {
        settings
    } = useSettings();


    const sectionRef = useRef(null);

    const [visible, setVisible] =
        useState(false);


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
                    threshold: 0.15
                }
            );


        observer.observe(element);


        return () => {
            observer.disconnect();
        };

    }, []);


    /* =========================================
       SETTINGS
    ========================================= */

    const name =
        settings?.name ||
        "Bipasa Roy";


    const title =
        settings?.title ||
        "Backend Developer";


    const about =
        settings?.about ||
        "I'm a Computer Science Engineering student and developer interested in building modern web applications, REST APIs and database-driven systems.";


    const location =
        settings?.location ||
        "India";


    /* =========================================
       TECHNOLOGIES
    ========================================= */

    const technologies = [
        {
            name: "JavaScript",
            short: "JS",
            className:
                "from-yellow-400/20 to-orange-500/10 text-yellow-300 border-yellow-400/20"
        },
        {
            name: "Node.js",
            short: "N",
            className:
                "from-green-400/20 to-emerald-500/10 text-green-300 border-green-400/20"
        },
        {
            name: "Express.js",
            short: "EX",
            className:
                "from-zinc-400/20 to-zinc-600/10 text-zinc-200 border-white/10"
        },
        {
            name: "MongoDB",
            short: "DB",
            className:
                "from-emerald-400/20 to-green-500/10 text-emerald-300 border-emerald-400/20"
        },
        {
            name: "React",
            short: "R",
            className:
                "from-cyan-400/20 to-blue-500/10 text-cyan-300 border-cyan-400/20"
        },
        {
            name: "REST APIs",
            short: "API",
            className:
                "from-purple-400/20 to-violet-500/10 text-purple-300 border-purple-400/20"
        }
    ];


    /* =========================================
       STATS
    ========================================= */

    const stats = [
        {
            value: "BTech",
            label: "Computer Science",
            icon: "🎓"
        },
        {
            value: "Backend",
            label: "Development",
            icon: "⚙️"
        },
        {
            value: "REST",
            label: "API Development",
            icon: "🔗"
        },
        {
            value: "Full Stack",
            label: "Web Applications",
            icon: "🚀"
        }
    ];


    return (

        <section
            ref={sectionRef}
            id="about"
            className="
                premium-section
                relative
                overflow-hidden
            "
        >

            {/* =========================================
                BACKGROUND GLOW
            ========================================= */}

            <div
                className="
                    pointer-events-none
                    absolute
                    left-[-150px]
                    top-1/3
                    h-[350px]
                    w-[350px]
                    rounded-full
                    bg-purple-600/10
                    blur-[120px]
                "
            />


            <div
                className="
                    pointer-events-none
                    absolute
                    right-[-180px]
                    bottom-10
                    h-[350px]
                    w-[350px]
                    rounded-full
                    bg-cyan-500/10
                    blur-[120px]
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
                                text-purple-300
                            "
                        >
                            About Me
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

                        Building things with
                        <span className="accent-text">
                            {" "}purpose.
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
                        A little about who I am, what I build,
                        and the technologies I enjoy working with.
                    </p>

                </div>


                {/* =====================================
                    MAIN ABOUT GRID
                ===================================== */}

                <div
                    className="
                        grid
                        gap-6
                        lg:grid-cols-[1.35fr_0.65fr]
                    "
                >

                    {/* =================================
                        ABOUT CARD
                    ================================= */}

                    <div
                        className={`
                            glass-panel
                            relative
                            overflow-hidden
                            p-7
                            transition-all
                            duration-1000
                            sm:p-9
                            ${
                                visible
                                    ? "translate-y-0 opacity-100"
                                    : "translate-y-10 opacity-0"
                            }
                        `}
                    >

                        {/* Decorative gradient */}

                        <div
                            className="
                                pointer-events-none
                                absolute
                                right-0
                                top-0
                                h-48
                                w-48
                                rounded-full
                                bg-purple-500/10
                                blur-[80px]
                            "
                        />


                        <div
                            className="
                                relative
                                z-10
                            "
                        >

                            <div
                                className="
                                    mb-7
                                    flex
                                    items-center
                                    justify-between
                                "
                            >

                                <div>

                                    <p
                                        className="
                                            text-xs
                                            uppercase
                                            tracking-[0.18em]
                                            text-zinc-500
                                        "
                                    >
                                        Who I am
                                    </p>

                                    <h3
                                        className="
                                            mt-1
                                            text-2xl
                                            font-bold
                                            text-white
                                        "
                                    >
                                        {name}
                                    </h3>

                                </div>


                                <div
                                    className="
                                        flex
                                        h-12
                                        w-12
                                        items-center
                                        justify-center
                                        rounded-2xl
                                        border
                                        border-purple-400/20
                                        bg-purple-500/10
                                        text-xl
                                    "
                                >
                                    ✦
                                </div>

                            </div>


                            <p
                                className="
                                    max-w-3xl
                                    text-base
                                    leading-8
                                    text-zinc-400
                                    sm:text-lg
                                "
                            >
                                {about}
                            </p>


                            <div
                                className="
                                    my-8
                                    h-px
                                    bg-gradient-to-r
                                    from-purple-500/20
                                    via-white/10
                                    to-transparent
                                "
                            />


                            {/* Information */}

                            <div
                                className="
                                    grid
                                    gap-5
                                    sm:grid-cols-2
                                "
                            >

                                <div
                                    className="
                                        group
                                        rounded-2xl
                                        border
                                        border-white/[0.07]
                                        bg-white/[0.025]
                                        p-5
                                        transition
                                        duration-300
                                        hover:border-purple-400/20
                                        hover:bg-purple-500/[0.04]
                                    "
                                >

                                    <div
                                        className="
                                            mb-3
                                            flex
                                            h-10
                                            w-10
                                            items-center
                                            justify-center
                                            rounded-xl
                                            bg-purple-500/10
                                            text-purple-300
                                        "
                                    >
                                        ⚙
                                    </div>

                                    <p
                                        className="
                                            text-xs
                                            uppercase
                                            tracking-wider
                                            text-zinc-600
                                        "
                                    >
                                        Current focus
                                    </p>

                                    <p
                                        className="
                                            mt-1
                                            font-semibold
                                            text-white
                                        "
                                    >
                                        {title}
                                    </p>

                                </div>


                                <div
                                    className="
                                        group
                                        rounded-2xl
                                        border
                                        border-white/[0.07]
                                        bg-white/[0.025]
                                        p-5
                                        transition
                                        duration-300
                                        hover:border-cyan-400/20
                                        hover:bg-cyan-500/[0.04]
                                    "
                                >

                                    <div
                                        className="
                                            mb-3
                                            flex
                                            h-10
                                            w-10
                                            items-center
                                            justify-center
                                            rounded-xl
                                            bg-cyan-500/10
                                            text-cyan-300
                                        "
                                    >
                                        📍
                                    </div>

                                    <p
                                        className="
                                            text-xs
                                            uppercase
                                            tracking-wider
                                            text-zinc-600
                                        "
                                    >
                                        Location
                                    </p>

                                    <p
                                        className="
                                            mt-1
                                            font-semibold
                                            text-white
                                        "
                                    >
                                        {location}
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* =================================
                        STATS
                    ================================= */}

                    <div
                        className="
                            grid
                            grid-cols-2
                            gap-4
                        "
                    >

                        {stats.map(
                            (stat, index) => (

                                <div
                                    key={stat.label}
                                    className={`
                                        premium-card
                                        group
                                        p-5
                                        transition-all
                                        duration-700
                                        ${
                                            visible
                                                ? "translate-y-0 opacity-100"
                                                : "translate-y-10 opacity-0"
                                        }
                                    `}
                                    style={{
                                        transitionDelay:
                                            `${150 + index * 100}ms`
                                    }}
                                >

                                    <div
                                        className="
                                            mb-7
                                            text-xl
                                            transition-transform
                                            duration-300
                                            group-hover:scale-110
                                        "
                                    >
                                        {stat.icon}
                                    </div>


                                    <p
                                        className="
                                            text-xl
                                            font-bold
                                            text-white
                                            sm:text-2xl
                                        "
                                    >
                                        {stat.value}
                                    </p>


                                    <p
                                        className="
                                            mt-1
                                            text-xs
                                            leading-5
                                            text-zinc-500
                                        "
                                    >
                                        {stat.label}
                                    </p>


                                    <div
                                        className="
                                            mt-5
                                            h-px
                                            w-8
                                            bg-gradient-to-r
                                            from-purple-400
                                            to-cyan-400
                                            transition-all
                                            duration-300
                                            group-hover:w-14
                                        "
                                    />

                                </div>

                            )
                        )}

                    </div>

                </div>


                {/* =====================================
                    TECHNOLOGIES
                ===================================== */}

                <div
                    className={`
                        mt-6
                        glass-panel
                        p-7
                        transition-all
                        duration-1000
                        delay-300
                        sm:p-9
                        ${
                            visible
                                ? "translate-y-0 opacity-100"
                                : "translate-y-10 opacity-0"
                        }
                    `}
                >

                    <div
                        className="
                            mb-7
                            flex
                            flex-col
                            justify-between
                            gap-3
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
                                Tech stack
                            </p>

                            <h3
                                className="
                                    mt-1
                                    text-2xl
                                    font-bold
                                    text-white
                                "
                            >
                                Tools I work with
                            </h3>

                        </div>


                        <p
                            className="
                                max-w-md
                                text-sm
                                leading-6
                                text-zinc-500
                            "
                        >
                            Technologies I use to turn ideas
                            into reliable, scalable applications.
                        </p>

                    </div>


                    <div
                        className="
                            grid
                            grid-cols-2
                            gap-3
                            sm:grid-cols-3
                            lg:grid-cols-6
                        "
                    >

                        {technologies.map(
                            (technology) => (

                                <div
                                    key={
                                        technology.name
                                    }
                                    className="
                                        group
                                        flex
                                        items-center
                                        gap-3
                                        rounded-2xl
                                        border
                                        border-white/[0.07]
                                        bg-white/[0.02]
                                        p-3
                                        transition-all
                                        duration-300
                                        hover:-translate-y-1
                                        hover:bg-white/[0.05]
                                    "
                                >

                                    <div
                                        className={`
                                            flex
                                            h-9
                                            w-9
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-xl
                                            border
                                            bg-gradient-to-br
                                            text-[10px]
                                            font-bold
                                            ${technology.className}
                                        `}
                                    >
                                        {
                                            technology.short
                                        }
                                    </div>


                                    <span
                                        className="
                                            truncate
                                            text-xs
                                            font-medium
                                            text-zinc-400
                                            transition
                                            group-hover:text-white
                                        "
                                    >
                                        {
                                            technology.name
                                        }
                                    </span>

                                </div>

                            )
                        )}

                    </div>

                </div>


                {/* =====================================
                    BOTTOM STATEMENT
                ===================================== */}

                <div
                    className="
                        mt-12
                        flex
                        items-center
                        justify-center
                        gap-4
                        text-center
                    "
                >

                    <span
                        className="
                            hidden
                            h-px
                            w-16
                            bg-gradient-to-r
                            from-transparent
                            to-purple-500/30
                            sm:block
                        "
                    />

                    <p
                        className="
                            text-sm
                            italic
                            text-zinc-600
                        "
                    >
                        "Build with curiosity. Improve with every iteration."
                    </p>

                    <span
                        className="
                            hidden
                            h-px
                            w-16
                            bg-gradient-to-l
                            from-transparent
                            to-cyan-500/30
                            sm:block
                        "
                    />

                </div>

            </div>

        </section>
    );
};


export default About;