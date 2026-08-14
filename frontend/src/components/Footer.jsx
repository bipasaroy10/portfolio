import { useEffect, useState } from "react";
import { useSettings } from "../context/SettingsContext";


const Footer = () => {

    const { settings } = useSettings();

    const [showTopButton, setShowTopButton] =
        useState(false);


    /* =========================================
       SHOW / HIDE BACK TO TOP
    ========================================= */

    useEffect(() => {

        const handleScroll = () => {

            setShowTopButton(
                window.scrollY > 500
            );

        };


        window.addEventListener(
            "scroll",
            handleScroll
        );


        return () => {

            window.removeEventListener(
                "scroll",
                handleScroll
            );

        };

    }, []);


    /* =========================================
       BACK TO TOP
    ========================================= */

    const scrollToTop = () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };


    const currentYear =
        new Date().getFullYear();


    return (

        <footer
            className="
                relative
                overflow-hidden
                border-t
                border-white/[0.06]
                bg-[#050505]
            "
        >

            {/* =====================================
                BACKGROUND GLOWS
            ===================================== */}

            <div
                className="
                    pointer-events-none
                    absolute
                    left-[-150px]
                    bottom-[-180px]
                    h-[400px]
                    w-[400px]
                    rounded-full
                    bg-purple-600/[0.08]
                    blur-[130px]
                "
            />


            <div
                className="
                    pointer-events-none
                    absolute
                    right-[-150px]
                    bottom-[-180px]
                    h-[400px]
                    w-[400px]
                    rounded-full
                    bg-cyan-500/[0.06]
                    blur-[130px]
                "
            />


            {/* =====================================
                TOP GRADIENT LINE
            ===================================== */}

            <div
                className="
                    footer-gradient-line
                    absolute
                    left-0
                    right-0
                    top-0
                    h-px
                "
            />


            <div
                className="
                    premium-container
                    relative
                    z-10
                    py-16
                    sm:py-20
                "
            >

                {/* =================================
                    MAIN FOOTER
                ================================= */}

                <div
                    className="
                        grid
                        gap-12
                        md:grid-cols-[1.3fr_0.7fr]
                        md:items-start
                    "
                >

                    {/* =================================
                        BRAND
                    ================================= */}

                    <div>

                        <a
                            href="#home"
                            className="
                                footer-brand
                                inline-block
                                text-2xl
                                font-bold
                                tracking-tight
                                text-white
                            "
                        >

                            {settings?.name ||
                                "Bipasa Roy"}

                        </a>


                        <p
                            className="
                                mt-4
                                max-w-md
                                text-sm
                                leading-7
                                text-zinc-500
                            "
                        >
                            {settings?.title ||
                                "Backend Developer"}
                            {" "}building reliable,
                            scalable and modern web
                            experiences.
                        </p>


                        {/* Resume */}

                        {settings?.resumeUrl && (

                            <a
                                href={
                                    settings.resumeUrl
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
                                    footer-resume
                                    mt-7
                                    inline-flex
                                    items-center
                                    gap-2
                                    rounded-xl
                                    border
                                    border-purple-400/20
                                    bg-purple-500/[0.06]
                                    px-4
                                    py-2.5
                                    text-xs
                                    font-semibold
                                    text-purple-200
                                    transition-all
                                    duration-300
                                    hover:-translate-y-0.5
                                    hover:border-purple-400/40
                                    hover:bg-purple-500/[0.10]
                                "
                            >

                                <svg
                                    width="15"
                                    height="15"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                >

                                    <path
                                        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                                    />

                                    <polyline
                                        points="14 2 14 8 20 8"
                                    />

                                    <line
                                        x1="16"
                                        y1="13"
                                        x2="8"
                                        y2="13"
                                    />

                                    <line
                                        x1="16"
                                        y1="17"
                                        x2="8"
                                        y2="17"
                                    />

                                </svg>

                                View Resume

                                <span>
                                    ↗
                                </span>

                            </a>

                        )}

                    </div>


                    {/* =================================
                        NAVIGATION
                    ================================= */}

                    <div>

                        <p
                            className="
                                mb-5
                                text-[10px]
                                font-bold
                                uppercase
                                tracking-[0.2em]
                                text-zinc-600
                            "
                        >
                            Navigation
                        </p>


                        <div
                            className="
                                grid
                                grid-cols-2
                                gap-x-8
                                gap-y-3
                            "
                        >

                            {[
                                ["Home", "#home"],
                                ["About", "#about"],
                                ["Skills", "#skills"],
                                ["Projects", "#projects"],
                                ["Experience", "#experience"],
                                ["Contact", "#contact"]
                            ].map(
                                ([label, href]) => (

                                    <a
                                        key={label}
                                        href={href}
                                        className="
                                            footer-nav-link
                                            group
                                            flex
                                            items-center
                                            gap-2
                                            text-sm
                                            text-zinc-500
                                            transition-colors
                                            duration-300
                                            hover:text-white
                                        "
                                    >

                                        <span
                                            className="
                                                h-1
                                                w-1
                                                rounded-full
                                                bg-purple-400
                                                opacity-0
                                                transition
                                                duration-300
                                                group-hover:opacity-100
                                            "
                                        />

                                        {label}

                                    </a>

                                )
                            )}

                        </div>

                    </div>

                </div>


                {/* =================================
                    DIVIDER
                ================================= */}

                <div
                    className="
                        my-10
                        h-px
                        bg-gradient-to-r
                        from-transparent
                        via-white/[0.08]
                        to-transparent
                    "
                />


                {/* =================================
                    BOTTOM ROW
                ================================= */}

                <div
                    className="
                        flex
                        flex-col
                        gap-6
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                    "
                >

                    {/* Copyright */}

                    <p
                        className="
                            text-xs
                            text-zinc-600
                        "
                    >

                        © {currentYear}{" "}

                        <span
                            className="
                                text-zinc-400
                            "
                        >
                            {settings?.name ||
                                "Bipasa Roy"}
                        </span>

                        . All rights reserved.

                    </p>


                    {/* Social links */}

                    <div
                        className="
                            flex
                            items-center
                            gap-2
                        "
                    >

                        {/* GitHub */}

                        {settings?.github && (

                            <a
                                href={
                                    settings.github
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub"
                                className="
                                    footer-social
                                "
                            >

                                <svg
                                    width="17"
                                    height="17"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >

                                    <path
                                        d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.04c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.74.08-.74 1.2.08 1.84 1.23 1.84 1.23 1.07 1.83 2.81 1.3 3.5.99.11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.4 11.4 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z"
                                    />

                                </svg>

                            </a>

                        )}


                        {/* LinkedIn */}

                        {settings?.linkedin && (

                            <a
                                href={
                                    settings.linkedin
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                                className="
                                    footer-social
                                "
                            >

                                <span
                                    className="
                                        text-xs
                                        font-bold
                                    "
                                >
                                    in
                                </span>

                            </a>

                        )}


                        {/* Twitter */}

                        {settings?.twitter && (

                            <a
                                href={
                                    settings.twitter
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Twitter"
                                className="
                                    footer-social
                                "
                            >

                                <span
                                    className="
                                        text-sm
                                        font-bold
                                    "
                                >
                                    𝕏
                                </span>

                            </a>

                        )}


                        {/* Back to top */}

                        <button
                            type="button"
                            onClick={
                                scrollToTop
                            }
                            aria-label="Back to top"
                            className={`
                                footer-top-button
                                ${
                                    showTopButton
                                        ? "footer-top-visible"
                                        : ""
                                }
                            `}
                        >

                            ↑

                        </button>

                    </div>

                </div>

            </div>

        </footer>
    );
};


export default Footer;