import { useEffect, useRef, useState } from "react";
import { getExperience } from "../services/api";


const Experience = () => {

    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const sectionRef = useRef(null);

    const [visible, setVisible] = useState(false);


    /* =========================================
       LOAD EXPERIENCE
    ========================================= */

    useEffect(() => {

        const loadExperience = async () => {

            try {

                setLoading(true);
                setError("");

                const response =
                    await getExperience();


                console.log(
                    "Experience API response:",
                    response
                );


                if (response.success) {

                    setExperiences(
                        response.data || []
                    );

                } else {

                    setError(
                        "Failed to load experience"
                    );

                }

            } catch (error) {

                console.error(
                    "Experience error:",
                    error
                );

                setError(
                    "Unable to connect to server"
                );

            } finally {

                setLoading(false);

            }

        };


        loadExperience();

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
       DATE FORMATTER
    ========================================= */

    const formatDate = (date) => {

        if (!date) {
            return "";
        }


        return new Date(
            date
        ).toLocaleDateString(
            "en-US",
            {
                month: "short",
                year: "numeric"
            }
        );

    };


    /* =========================================
       EXPERIENCE DURATION
    ========================================= */

    const getDuration = (
        startDate,
        endDate,
        currentlyWorking
    ) => {

        if (!startDate) {
            return "";
        }


        const start =
            new Date(startDate);


        const end =
            currentlyWorking || !endDate
                ? new Date()
                : new Date(endDate);


        const months = Math.max(
            0,
            (
                (end.getFullYear() -
                    start.getFullYear()) *
                    12
            ) +
            (
                end.getMonth() -
                start.getMonth()
            )
        );


        const years =
            Math.floor(
                months / 12
            );


        const remainingMonths =
            months % 12;


        if (years > 0) {

            return remainingMonths > 0
                ? `${years} yr ${remainingMonths} mo`
                : `${years} yr`;

        }


        if (months > 0) {
            return `${months} mo`;
        }


        return "New";

    };


    return (

        <section
            ref={sectionRef}
            id="experience"
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
                    top-1/2
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
                    HEADER
                ===================================== */}

                <div
                    className={`
                        mb-16
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
                                from-cyan-400
                                to-purple-400
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
                            Career Journey
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

                        Where I've
                        <span className="accent-text">
                            {" "}been.
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
                        My professional journey, experiences,
                        and the opportunities that have shaped
                        the way I build software.
                    </p>

                </div>


                {/* =====================================
                    LOADING
                ===================================== */}

                {loading && (

                    <div
                        className="
                            space-y-8
                        "
                    >

                        {Array.from({
                            length: 2
                        }).map((_, index) => (

                            <div
                                key={index}
                                className="
                                    h-56
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
                            Unable to load experience
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
                    EMPTY STATE
                ===================================== */}

                {!loading &&
                    !error &&
                    experiences.length === 0 && (

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
                                    border-cyan-400/20
                                    bg-cyan-500/10
                                    text-2xl
                                    text-cyan-300
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
                                Experience coming soon
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
                                Professional experience will
                                appear here as it is added.
                            </p>

                        </div>

                    )}


                {/* =====================================
                    TIMELINE
                ===================================== */}

                {!loading &&
                    !error &&
                    experiences.length > 0 && (

                        <div
                            className="
                                relative
                            "
                        >

                            {/* Main timeline line */}

                            <div
                                className="
                                    experience-line
                                    absolute
                                    bottom-0
                                    left-[20px]
                                    top-0
                                    w-px
                                    bg-gradient-to-b
                                    from-purple-400/50
                                    via-cyan-400/30
                                    to-transparent
                                    md:left-1/2
                                    md:-translate-x-1/2
                                "
                            />


                            <div
                                className="
                                    space-y-10
                                "
                            >

                                {experiences.map(
                                    (
                                        experience,
                                        index
                                    ) => {

                                        const isEven =
                                            index % 2 === 0;


                                        const duration =
                                            getDuration(
                                                experience.startDate,
                                                experience.endDate,
                                                experience.currentlyWorking
                                            );


                                        return (

                                            <article
                                                key={
                                                    experience._id
                                                }
                                                className={`
                                                    experience-item
                                                    relative
                                                    transition-all
                                                    duration-1000
                                                    ${
                                                        visible
                                                            ? "translate-y-0 opacity-100"
                                                            : "translate-y-12 opacity-0"
                                                    }
                                                `}
                                                style={{
                                                    transitionDelay:
                                                        `${150 + index * 180}ms`
                                                }}
                                            >

                                                {/* =================================
                                                    TIMELINE NODE
                                                ================================= */}

                                                <div
                                                    className="
                                                        experience-node
                                                        absolute
                                                        left-[20px]
                                                        top-8
                                                        z-20
                                                        flex
                                                        h-4
                                                        w-4
                                                        -translate-x-1/2
                                                        items-center
                                                        justify-center
                                                        rounded-full
                                                        border-2
                                                        border-[#09090b]
                                                        bg-gradient-to-r
                                                        from-purple-400
                                                        to-cyan-400
                                                        shadow-[0_0_18px_rgba(139,92,246,0.7)]
                                                        md:left-1/2
                                                    "
                                                >

                                                    <span
                                                        className="
                                                            h-1.5
                                                            w-1.5
                                                            rounded-full
                                                            bg-white
                                                        "
                                                    />

                                                </div>


                                                {/* =================================
                                                    CARD
                                                ================================= */}

                                                <div
                                                    className={`
                                                        experience-card
                                                        ml-10
                                                        rounded-3xl
                                                        border
                                                        border-white/[0.08]
                                                        bg-white/[0.025]
                                                        p-6
                                                        backdrop-blur-xl
                                                        transition-all
                                                        duration-400
                                                        hover:-translate-y-1
                                                        hover:border-purple-400/25
                                                        hover:bg-white/[0.045]
                                                        md:ml-0
                                                        md:w-[calc(50%-42px)]
                                                        md:p-8
                                                        ${
                                                            isEven
                                                                ? "md:mr-auto"
                                                                : "md:ml-auto"
                                                        }
                                                    `}
                                                >

                                                    {/* =================================
                                                        CARD HEADER
                                                    ================================= */}

                                                    <div
                                                        className="
                                                            flex
                                                            flex-col
                                                            gap-5
                                                        "
                                                    >

                                                        <div
                                                            className="
                                                                flex
                                                                flex-col
                                                                gap-4
                                                                sm:flex-row
                                                                sm:items-start
                                                                sm:justify-between
                                                            "
                                                        >

                                                            <div>

                                                                {/* Position */}

                                                                <h3
                                                                    className="
                                                                        text-xl
                                                                        font-bold
                                                                        leading-tight
                                                                        text-white
                                                                        sm:text-2xl
                                                                    "
                                                                >
                                                                    {
                                                                        experience.position
                                                                    }
                                                                </h3>


                                                                {/* Company */}

                                                                <p
                                                                    className="
                                                                        mt-2
                                                                        text-base
                                                                        font-medium
                                                                        text-purple-300
                                                                    "
                                                                >
                                                                    {
                                                                        experience.company
                                                                    }
                                                                </p>

                                                            </div>


                                                            {/* Employment type */}

                                                            <span
                                                                className="
                                                                    w-fit
                                                                    rounded-full
                                                                    border
                                                                    border-purple-400/15
                                                                    bg-purple-500/[0.07]
                                                                    px-3
                                                                    py-1.5
                                                                    text-[10px]
                                                                    font-semibold
                                                                    uppercase
                                                                    tracking-wider
                                                                    text-purple-200
                                                                "
                                                            >
                                                                {
                                                                    experience.employmentType ||
                                                                    "Experience"
                                                                }
                                                            </span>

                                                        </div>


                                                        {/* =================================
                                                            DATE
                                                        ================================= */}

                                                        <div
                                                            className="
                                                                flex
                                                                flex-wrap
                                                                items-center
                                                                gap-3
                                                            "
                                                        >

                                                            <div
                                                                className="
                                                                    flex
                                                                    items-center
                                                                    gap-2
                                                                    rounded-xl
                                                                    border
                                                                    border-white/[0.07]
                                                                    bg-white/[0.025]
                                                                    px-3
                                                                    py-2
                                                                "
                                                            >

                                                                <span
                                                                    className="
                                                                        text-xs
                                                                        text-cyan-300
                                                                    "
                                                                >
                                                                    ◷
                                                                </span>


                                                                <span
                                                                    className="
                                                                        text-xs
                                                                        font-medium
                                                                        text-zinc-400
                                                                    "
                                                                >

                                                                    {
                                                                        formatDate(
                                                                            experience.startDate
                                                                        )
                                                                    }

                                                                    <span
                                                                        className="
                                                                            mx-2
                                                                            text-zinc-700
                                                                        "
                                                                    >
                                                                        —
                                                                    </span>

                                                                    {
                                                                        experience.currentlyWorking
                                                                            ? "Present"
                                                                            : formatDate(
                                                                                experience.endDate
                                                                            )
                                                                    }

                                                                </span>

                                                            </div>


                                                            {duration && (

                                                                <span
                                                                    className="
                                                                        text-xs
                                                                        text-zinc-600
                                                                    "
                                                                >
                                                                    {duration}
                                                                </span>

                                                            )}

                                                        </div>


                                                        {/* Location */}

                                                        {experience.location && (

                                                            <div
                                                                className="
                                                                    flex
                                                                    items-center
                                                                    gap-2
                                                                    text-xs
                                                                    text-zinc-500
                                                                "
                                                            >

                                                                <span
                                                                    className="
                                                                        text-pink-300
                                                                    "
                                                                >
                                                                    ●
                                                                </span>

                                                                {
                                                                    experience.location
                                                                }

                                                            </div>

                                                        )}

                                                    </div>


                                                    {/* =================================
                                                        DIVIDER
                                                    ================================= */}

                                                    <div
                                                        className="
                                                            my-6
                                                            h-px
                                                            bg-gradient-to-r
                                                            from-purple-400/15
                                                            via-white/[0.06]
                                                            to-transparent
                                                        "
                                                    />


                                                    {/* =================================
                                                        DESCRIPTION
                                                    ================================= */}

                                                    <p
                                                        className="
                                                            text-sm
                                                            leading-7
                                                            text-zinc-400
                                                        "
                                                    >
                                                        {
                                                            experience.description
                                                        }
                                                    </p>


                                                    {/* =================================
                                                        TECHNOLOGIES
                                                    ================================= */}

                                                    {experience.technologies?.length >
                                                        0 && (

                                                        <div
                                                            className="
                                                                mt-6
                                                                flex
                                                                flex-wrap
                                                                gap-2
                                                            "
                                                        >

                                                            {experience.technologies.map(
                                                                (
                                                                    technology,
                                                                    technologyIndex
                                                                ) => (

                                                                    <span
                                                                        key={
                                                                            `${technology}-${technologyIndex}`
                                                                        }
                                                                        className="
                                                                            experience-tech
                                                                            rounded-lg
                                                                            border
                                                                            border-white/[0.07]
                                                                            bg-white/[0.025]
                                                                            px-3
                                                                            py-1.5
                                                                            text-[10px]
                                                                            font-medium
                                                                            text-zinc-500
                                                                            transition-all
                                                                            duration-300
                                                                            hover:border-cyan-400/20
                                                                            hover:bg-cyan-500/[0.05]
                                                                            hover:text-cyan-200
                                                                        "
                                                                    >
                                                                        {
                                                                            technology
                                                                        }
                                                                    </span>

                                                                )
                                                            )}

                                                        </div>

                                                    )}


                                                    {/* =================================
                                                        CURRENT ROLE INDICATOR
                                                    ================================= */}

                                                    {experience.currentlyWorking && (

                                                        <div
                                                            className="
                                                                mt-7
                                                                flex
                                                                items-center
                                                                gap-2
                                                                text-xs
                                                                text-emerald-300
                                                            "
                                                        >

                                                            <span
                                                                className="
                                                                    relative
                                                                    flex
                                                                    h-2
                                                                    w-2
                                                                "
                                                            >

                                                                <span
                                                                    className="
                                                                        absolute
                                                                        inline-flex
                                                                        h-full
                                                                        w-full
                                                                        animate-ping
                                                                        rounded-full
                                                                        bg-emerald-400
                                                                        opacity-50
                                                                    "
                                                                />

                                                                <span
                                                                    className="
                                                                        relative
                                                                        inline-flex
                                                                        h-2
                                                                        w-2
                                                                        rounded-full
                                                                        bg-emerald-400
                                                                    "
                                                                />

                                                            </span>

                                                            Currently working here

                                                        </div>

                                                    )}

                                                </div>

                                            </article>

                                        );

                                    }
                                )}

                            </div>

                        </div>

                    )}


                {/* =====================================
                    BOTTOM STATEMENT
                ===================================== */}

                {!loading &&
                    !error &&
                    experiences.length > 0 && (

                        <div
                            className="
                                mt-16
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
                                Every experience is another
                                step forward.
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


export default Experience;