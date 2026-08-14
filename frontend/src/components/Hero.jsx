import { useEffect, useState } from "react";
import { useSettings } from "../context/SettingsContext";


const Hero = () => {

    const {
        settings
    } = useSettings();


    const [mounted, setMounted] = useState(false);


    useEffect(() => {

        const timer = setTimeout(() => {
            setMounted(true);
        }, 100);


        return () => clearTimeout(timer);

    }, []);


    const name =
        settings?.name ||
        "Bipasa Roy";


    const title =
        settings?.title ||
        "Backend Developer";


    const about =
        settings?.about ||
        "I build scalable web applications, REST APIs and database-driven systems using modern technologies.";


    const profileImage =
        settings?.profileImage ||
        "";


    const resumeUrl =
        settings?.resumeUrl ||
        "";


    const github =
        settings?.github ||
        "";


    const linkedin =
        settings?.linkedin ||
        "";


    return (

        <section
            id="home"
            className="
                relative
                min-h-screen
                overflow-hidden
                px-5
                pt-28
                pb-20
                sm:px-6
                md:pt-32
            "
        >

            {/* =================================================
                HERO BACKGROUND EFFECTS
            ================================================= */}

            <div
                className="
                    pointer-events-none
                    absolute
                    left-1/2
                    top-[12%]
                    h-[420px]
                    w-[420px]
                    -translate-x-1/2
                    rounded-full
                    bg-purple-600/10
                    blur-[120px]
                "
            />


            <div
                className="
                    pointer-events-none
                    absolute
                    -left-32
                    top-1/3
                    h-72
                    w-72
                    rounded-full
                    bg-pink-500/10
                    blur-[110px]
                "
            />


            <div
                className="
                    pointer-events-none
                    absolute
                    -right-32
                    top-1/4
                    h-80
                    w-80
                    rounded-full
                    bg-cyan-500/10
                    blur-[120px]
                "
            />


            {/* =================================================
                DECORATIVE ORBIT
            ================================================= */}

            <div
                className="
                    hero-orbit
                    pointer-events-none
                    absolute
                    left-1/2
                    top-[44%]
                    hidden
                    h-[520px]
                    w-[520px]
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                    border
                    border-purple-400/[0.07]
                    lg:block
                "
            />


            <div
                className="
                    hero-orbit hero-orbit-delay
                    pointer-events-none
                    absolute
                    left-1/2
                    top-[44%]
                    hidden
                    h-[680px]
                    w-[680px]
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                    border
                    border-cyan-400/[0.045]
                    lg:block
                "
            />


            {/* =================================================
                MAIN CONTAINER
            ================================================= */}

            <div
                className="
                    relative
                    z-10
                    mx-auto
                    flex
                    min-h-[calc(100vh-160px)]
                    max-w-6xl
                    items-center
                "
            >

                <div
                    className="
                        grid
                        w-full
                        items-center
                        gap-14
                        lg:grid-cols-[1.15fr_0.85fr]
                        lg:gap-8
                    "
                >

                    {/* =================================================
                        LEFT CONTENT
                    ================================================= */}

                    <div
                        className={`
                            max-w-3xl
                            transition-all
                            duration-1000
                            ${
                                mounted
                                    ? "translate-y-0 opacity-100"
                                    : "translate-y-8 opacity-0"
                            }
                        `}
                    >

                        {/* Availability badge */}

                        <div
                            className="
                                mb-7
                                inline-flex
                                items-center
                                gap-2
                                rounded-full
                                border
                                border-emerald-400/20
                                bg-emerald-400/[0.06]
                                px-3.5
                                py-2
                                text-xs
                                font-medium
                                text-emerald-300
                                backdrop-blur-md
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
                                        opacity-60
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

                            Available for opportunities

                        </div>


                        {/* Small introduction */}

                        <p
                            className="
                                mb-4
                                text-sm
                                font-semibold
                                uppercase
                                tracking-[0.18em]
                                text-zinc-500
                                sm:text-base
                            "
                        >
                            Hello, I'm
                        </p>


                        {/* Name */}

                        <h1
                            className="
                                max-w-4xl
                                text-5xl
                                font-bold
                                leading-[0.95]
                                tracking-[-0.055em]
                                sm:text-6xl
                                md:text-7xl
                                lg:text-[5.8rem]
                            "
                        >

                            <span className="text-white">
                                {name.split(" ")[0]}
                            </span>

                            <br />

                            <span className="hero-gradient-text">
                                {name
                                    .split(" ")
                                    .slice(1)
                                    .join(" ") ||
                                    name}
                            </span>

                        </h1>


                        {/* Role */}

                        <div
                            className="
                                mt-7
                                flex
                                flex-wrap
                                items-center
                                gap-3
                            "
                        >

                            <span
                                className="
                                    inline-flex
                                    items-center
                                    gap-2
                                    rounded-xl
                                    border
                                    border-purple-400/20
                                    bg-purple-500/[0.07]
                                    px-4
                                    py-2.5
                                    text-sm
                                    font-semibold
                                    text-purple-200
                                    backdrop-blur-md
                                "
                            >

                                <span
                                    className="
                                        h-1.5
                                        w-1.5
                                        rounded-full
                                        bg-purple-400
                                        shadow-[0_0_10px_rgba(167,139,250,0.9)]
                                    "
                                />

                                {title}

                            </span>


                            <span
                                className="
                                    hidden
                                    h-px
                                    w-8
                                    bg-gradient-to-r
                                    from-purple-400/60
                                    to-cyan-400/60
                                    sm:block
                                "
                            />


                            <span
                                className="
                                    text-sm
                                    text-zinc-500
                                "
                            >
                                Full Stack Web Development
                            </span>

                        </div>


                        {/* Description */}

                        <p
                            className="
                                mt-7
                                max-w-2xl
                                text-base
                                leading-8
                                text-zinc-400
                                sm:text-lg
                                sm:leading-8
                            "
                        >
                            {about}
                        </p>


                        {/* CTA buttons */}

                        <div
                            className="
                                mt-9
                                flex
                                flex-col
                                gap-3
                                sm:flex-row
                            "
                        >

                            <a
                                href="#projects"
                                className="
                                    btn-primary
                                    group
                                    w-full
                                    sm:w-auto
                                "
                            >

                                <span>
                                    View Projects
                                </span>


                                <svg
                                    className="
                                        transition-transform
                                        duration-300
                                        group-hover:translate-x-1
                                    "
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >

                                    <path
                                        d="M5 12h14"
                                    />

                                    <path
                                        d="m12 5 7 7-7 7"
                                    />

                                </svg>

                            </a>


                            {resumeUrl && (

                                <a
                                    href={resumeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="
                                        btn-secondary
                                        group
                                        w-full
                                        sm:w-auto
                                    "
                                >

                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >

                                        <path
                                            d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                                        />

                                        <polyline
                                            points="14 2 14 8 20 8"
                                        />

                                        <line
                                            x1="12"
                                            y1="18"
                                            x2="12"
                                            y2="11"
                                        />

                                        <polyline
                                            points="9 14 12 11 15 14"
                                        />

                                    </svg>

                                    View Resume

                                </a>

                            )}

                        </div>


                        {/* Social links */}

                        <div
                            className="
                                mt-9
                                flex
                                items-center
                                gap-5
                            "
                        >

                            <span
                                className="
                                    text-xs
                                    uppercase
                                    tracking-[0.15em]
                                    text-zinc-600
                                "
                            >
                                Find me
                            </span>


                            {github && (

                                <a
                                    href={github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="GitHub"
                                    className="
                                        hero-social
                                    "
                                >

                                    <svg
                                        width="19"
                                        height="19"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path
                                            d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.04c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.74.08-.74 1.2.08 1.84 1.23 1.84 1.23 1.07 1.83 2.81 1.3 3.5.99.11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.4 11.4 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z"
                                        />
                                    </svg>

                                </a>

                            )}


                            {linkedin && (

                                <a
                                    href={linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="LinkedIn"
                                    className="
                                        hero-social
                                    "
                                >

                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >

                                        <path
                                            d="M20.45 20.45h-3.56v-5.58c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.68H9.35V8.99h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.48v6.27ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM3.56 20.45h3.56V8.99H3.56v11.46Z"
                                        />

                                    </svg>

                                </a>

                            )}

                        </div>

                    </div>


                    {/* =================================================
                        RIGHT PROFILE VISUAL
                    ================================================= */}

                    <div
                        className={`
                            relative
                            flex
                            items-center
                            justify-center
                            transition-all
                            duration-1000
                            delay-200
                            ${
                                mounted
                                    ? "translate-y-0 opacity-100"
                                    : "translate-y-10 opacity-0"
                            }
                        `}
                    >

                        {/* Outer glow */}

                        <div
                            className="
                                absolute
                                h-[300px]
                                w-[300px]
                                rounded-full
                                bg-purple-600/15
                                blur-[80px]
                                sm:h-[390px]
                                sm:w-[390px]
                            "
                        />


                        {/* Rotating ring */}

                        <div
                            className="
                                hero-ring
                                absolute
                                h-[300px]
                                w-[300px]
                                rounded-full
                                border
                                border-dashed
                                border-purple-400/20
                                sm:h-[390px]
                                sm:w-[390px]
                            "
                        />


                        {/* Cyan ring */}

                        <div
                            className="
                                hero-ring-reverse
                                absolute
                                h-[255px]
                                w-[255px]
                                rounded-full
                                border
                                border-cyan-400/15
                                sm:h-[335px]
                                sm:w-[335px]
                            "
                        />


                        {/* Profile image */}

                        <div
                            className="
                                hero-profile
                                relative
                                z-10
                                h-56
                                w-56
                                overflow-hidden
                                rounded-[2rem]
                                border
                                border-white/15
                                bg-zinc-900
                                shadow-2xl
                                shadow-purple-950/40
                                sm:h-72
                                sm:w-72
                            "
                        >

                            {profileImage ? (

                                <img
                                    src={profileImage}
                                    alt={`${name} profile`}
                                    className="
                                        h-full
                                        w-full
                                        object-cover
                                        transition-transform
                                        duration-700
                                        hover:scale-105
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
                                        from-purple-900
                                        via-zinc-900
                                        to-cyan-950
                                    "
                                >

                                    <span
                                        className="
                                            text-6xl
                                            font-bold
                                            text-white/80
                                        "
                                    >
                                        {name
                                            .split(" ")
                                            .map(
                                                (word) =>
                                                    word[0]
                                            )
                                            .join("")
                                            .slice(0, 2)
                                        }
                                    </span>

                                </div>

                            )}


                            {/* Image overlay */}

                            <div
                                className="
                                    pointer-events-none
                                    absolute
                                    inset-0
                                    bg-gradient-to-t
                                    from-purple-950/40
                                    via-transparent
                                    to-cyan-400/10
                                "
                            />

                        </div>


                        {/* Floating badge 1 */}

                        <div
                            className="
                                hero-floating
                                absolute
                                -left-2
                                top-8
                                z-20
                                rounded-2xl
                                border
                                border-white/10
                                bg-black/60
                                px-4
                                py-3
                                shadow-2xl
                                backdrop-blur-xl
                                sm:-left-6
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
                                        h-9
                                        w-9
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-purple-500/10
                                        text-purple-300
                                    "
                                >

                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                    >
                                        <polyline points="16 18 22 12 16 6" />
                                        <polyline points="8 6 2 12 8 18" />
                                    </svg>

                                </div>

                                <div>

                                    <p className="
                                        text-xs
                                        font-semibold
                                        text-white
                                    ">
                                        Developer
                                    </p>

                                    <p className="
                                        text-[10px]
                                        text-zinc-500
                                    ">
                                        Build • Learn • Create
                                    </p>

                                </div>

                            </div>

                        </div>


                        {/* Floating badge 2 */}

                        <div
                            className="
                                hero-floating hero-floating-delay
                                absolute
                                -right-2
                                bottom-8
                                z-20
                                rounded-2xl
                                border
                                border-white/10
                                bg-black/60
                                px-4
                                py-3
                                shadow-2xl
                                backdrop-blur-xl
                                sm:-right-6
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
                                        h-9
                                        w-9
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-cyan-500/10
                                        text-cyan-300
                                    "
                                >

                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                    >

                                        <circle
                                            cx="12"
                                            cy="12"
                                            r="9"
                                        />

                                        <polyline
                                            points="12 7 12 12 15 15"
                                        />

                                    </svg>

                                </div>

                                <div>

                                    <p className="
                                        text-xs
                                        font-semibold
                                        text-white
                                    ">
                                        Always learning
                                    </p>

                                    <p className="
                                        text-[10px]
                                        text-zinc-500
                                    ">
                                        One project at a time
                                    </p>

                                </div>

                            </div>

                        </div>


                        {/* Decorative dots */}

                        <div
                            className="
                                absolute
                                right-5
                                top-10
                                grid
                                grid-cols-3
                                gap-1.5
                                opacity-50
                            "
                        >

                            {Array.from({
                                length: 9
                            }).map(
                                (_, index) => (

                                    <span
                                        key={index}
                                        className="
                                            h-1
                                            w-1
                                            rounded-full
                                            bg-purple-300
                                        "
                                    />

                                )
                            )}

                        </div>

                    </div>

                </div>

            </div>


            {/* =================================================
                SCROLL INDICATOR
            ================================================= */}

            <a
                href="#about"
                onClick={(e) =>
                    handleNavigation(
                        e,
                        "#about"
                    )
                }
                className="
                    absolute
                    bottom-8
                    left-1/2
                    z-20
                    hidden
                    -translate-x-1/2
                    flex-col
                    items-center
                    gap-2
                    text-[10px]
                    uppercase
                    tracking-[0.2em]
                    text-zinc-600
                    transition
                    hover:text-zinc-300
                    md:flex
                "
            >

                <span>
                    Scroll to explore
                </span>

                <span
                    className="
                        flex
                        h-9
                        w-5
                        items-start
                        justify-center
                        rounded-full
                        border
                        border-white/10
                        p-1
                    "
                >

                    <span
                        className="
                            h-1.5
                            w-1
                            animate-bounce
                            rounded-full
                            bg-gradient-to-b
                            from-purple-400
                            to-cyan-400
                        "
                    />

                </span>

            </a>

        </section>
    );
};


export default Hero;