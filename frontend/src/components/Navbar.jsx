import { useEffect, useState } from "react";
import { useSettings } from "../context/SettingsContext";


const navItems = [
    {
        label: "Home",
        href: "#home"
    },
    {
        label: "About",
        href: "#about"
    },
    {
        label: "Skills",
        href: "#skills"
    },
    {
        label: "Projects",
        href: "#projects"
    },
    {
        label: "Experience",
        href: "#experience"
    },
    {
        label: "Contact",
        href: "#contact"
    }
];


const Navbar = () => {

    const {
        settings
    } = useSettings();


    const [scrolled, setScrolled] = useState(false);

    const [activeSection, setActiveSection] =
        useState("home");

    const [mobileOpen, setMobileOpen] =
        useState(false);


    /* =========================================
       SCROLL EFFECT
    ========================================= */

    useEffect(() => {

        const handleScroll = () => {

            setScrolled(
                window.scrollY > 30
            );

        };


        window.addEventListener(
            "scroll",
            handleScroll,
            { passive: true }
        );


        handleScroll();


        return () => {

            window.removeEventListener(
                "scroll",
                handleScroll
            );

        };

    }, []);


    /* =========================================
       ACTIVE SECTION
    ========================================= */

    useEffect(() => {

        const sections =
            navItems
                .map((item) =>
                    document.getElementById(
                        item.href.substring(1)
                    )
                )
                .filter(Boolean);


        if (!sections.length) {
            return;
        }


        const observer =
            new IntersectionObserver(
                (entries) => {

                    const visible =
                        entries
                            .filter(
                                (entry) =>
                                    entry.isIntersecting
                            )
                            .sort(
                                (a, b) =>
                                    b.intersectionRatio -
                                    a.intersectionRatio
                            );


                    if (visible.length) {

                        setActiveSection(
                            visible[0].target.id
                        );

                    }

                },
                {
                    root: null,

                    rootMargin:
                        "-25% 0px -55% 0px",

                    threshold: [
                        0.05,
                        0.15,
                        0.3,
                        0.5
                    ]
                }
            );


        sections.forEach(
            (section) =>
                observer.observe(section)
        );


        return () => {
            observer.disconnect();
        };

    }, []);


    /* =========================================
       CLOSE MOBILE MENU
    ========================================= */

    const closeMobileMenu = () => {
        setMobileOpen(false);
    };


    /* =========================================
       SCROLL TO SECTION
    ========================================= */

    const handleNavigation = (
        e,
        href
    ) => {

        e.preventDefault();

        const element =
            document.querySelector(href);


        if (element) {

            element.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }


        closeMobileMenu();

    };


    /* =========================================
       SETTINGS VALUES
    ========================================= */

    const name =
        settings?.name ||
        "Bipasa Roy";


    const resumeUrl =
        settings?.resumeUrl ||
        "";


    return (
        <header
            className={`
                fixed
                top-0
                left-0
                right-0
                z-50
                transition-all
                duration-500
                ${
                    scrolled
                        ? `
                            px-4
                            md:px-6
                            pt-3
                        `
                        : `
                            px-4
                            md:px-8
                            pt-4
                        `
                }
            `}
        >

            <div
                className={`
                    navbar-shimmer
                    relative
                    mx-auto
                    max-w-6xl
                    overflow-hidden
                    rounded-2xl
                    border
                    transition-all
                    duration-500
                    ${
                        scrolled
                            ? `
                                border-white/10
                                bg-black/65
                                shadow-2xl
                                shadow-purple-950/20
                                backdrop-blur-2xl
                            `
                            : `
                                border-white/5
                                bg-black/25
                                backdrop-blur-xl
                            `
                    }
                `}
            >

                {/* =====================================
                    TOP GLOW LINE
                ===================================== */}

                <div
                    className="
                        absolute
                        top-0
                        left-1/2
                        h-px
                        w-2/3
                        -translate-x-1/2
                        bg-gradient-to-r
                        from-transparent
                        via-purple-400/70
                        to-transparent
                    "
                />


                <div
                    className="
                        relative
                        flex
                        h-[68px]
                        items-center
                        justify-between
                        px-4
                        md:px-6
                    "
                >

                    {/* =================================
                        LOGO
                    ================================= */}

                    <a
                        href="#home"
                        onClick={(e) =>
                            handleNavigation(
                                e,
                                "#home"
                            )
                        }
                        className="
                            group
                            flex
                            items-center
                            gap-3
                        "
                    >

                        {/* Logo mark */}

                        <div
                            className="
                                relative
                                flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                overflow-hidden
                                rounded-xl
                                border
                                border-white/10
                                bg-white/5
                            "
                        >

                            <div
                                className="
                                    absolute
                                    inset-0
                                    bg-gradient-to-br
                                    from-purple-600/30
                                    via-transparent
                                    to-cyan-400/20
                                    opacity-80
                                    transition
                                    duration-500
                                    group-hover:scale-125
                                "
                            />

                            <span
                                className="
                                    relative
                                    z-10
                                    bg-gradient-to-r
                                    from-purple-300
                                    via-white
                                    to-cyan-300
                                    bg-clip-text
                                    text-sm
                                    font-extrabold
                                    text-transparent
                                "
                            >
                                BR
                            </span>

                        </div>


                        {/* Name */}

                        <div className="hidden sm:block">

                            <p
                                className="
                                    font-semibold
                                    tracking-tight
                                    text-white
                                "
                            >
                                {name}
                            </p>

                            <p
                                className="
                                    text-[10px]
                                    uppercase
                                    tracking-[0.2em]
                                    text-zinc-500
                                "
                            >
                                Portfolio
                            </p>

                        </div>

                    </a>


                    {/* =================================
                        DESKTOP NAV
                    ================================= */}

                    <nav
                        className="
                            hidden
                            items-center
                            gap-1
                            lg:flex
                        "
                    >

                        {navItems.map(
                            (item) => {

                                const id =
                                    item.href.substring(
                                        1
                                    );

                                const active =
                                    activeSection === id;


                                return (
                                    <a
                                        key={item.href}
                                        href={item.href}
                                        onClick={(e) =>
                                            handleNavigation(
                                                e,
                                                item.href
                                            )
                                        }
                                        className={`
                                            relative
                                            rounded-lg
                                            px-3
                                            py-2
                                            text-sm
                                            font-medium
                                            transition-all
                                            duration-300
                                            ${
                                                active
                                                    ? `
                                                        text-white
                                                    `
                                                    : `
                                                        text-zinc-400
                                                        hover:text-white
                                                    `
                                            }
                                        `}
                                    >

                                        {item.label}


                                        {/* Active line */}

                                        <span
                                            className={`
                                                absolute
                                                bottom-0.5
                                                left-1/2
                                                h-px
                                                -translate-x-1/2
                                                bg-gradient-to-r
                                                from-purple-400
                                                to-cyan-400
                                                transition-all
                                                duration-300
                                                ${
                                                    active
                                                        ? `
                                                            w-5
                                                            opacity-100
                                                        `
                                                        : `
                                                            w-0
                                                            opacity-0
                                                        `
                                                }
                                            `}
                                        />

                                    </a>
                                );

                            }
                        )}

                    </nav>


                    {/* =================================
                        RIGHT ACTIONS
                    ================================= */}

                    <div
                        className="
                            flex
                            items-center
                            gap-2
                        "
                    >

                        {/* Resume */}

                        {resumeUrl && (

                            <a
                                href={resumeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
                                    hidden
                                    sm:inline-flex
                                    items-center
                                    gap-2
                                    rounded-xl
                                    border
                                    border-purple-400/20
                                    bg-purple-500/10
                                    px-4
                                    py-2.5
                                    text-xs
                                    font-bold
                                    text-purple-200
                                    transition-all
                                    duration-300
                                    hover:border-cyan-400/30
                                    hover:bg-cyan-400/10
                                    hover:text-cyan-200
                                "
                            >

                                <svg
                                    width="14"
                                    height="14"
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
                                </svg>

                                Resume

                            </a>

                        )}


                        {/* Mobile button */}

                        <button
                            type="button"
                            aria-label={
                                mobileOpen
                                    ? "Close navigation"
                                    : "Open navigation"
                            }
                            aria-expanded={
                                mobileOpen
                            }
                            onClick={() =>
                                setMobileOpen(
                                    (previous) =>
                                        !previous
                                )
                            }
                            className="
                                flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                rounded-xl
                                border
                                border-white/10
                                bg-white/5
                                text-zinc-300
                                transition
                                hover:border-purple-400/30
                                hover:bg-purple-500/10
                                hover:text-white
                                lg:hidden
                            "
                        >

                            <div
                                className="
                                    relative
                                    h-4
                                    w-5
                                "
                            >

                                <span
                                    className={`
                                        absolute
                                        left-0
                                        h-px
                                        w-5
                                        bg-current
                                        transition-all
                                        duration-300
                                        ${
                                            mobileOpen
                                                ? `
                                                    top-2
                                                    rotate-45
                                                `
                                                : `
                                                    top-0
                                                `
                                        }
                                    `}
                                />

                                <span
                                    className={`
                                        absolute
                                        left-0
                                        top-2
                                        h-px
                                        w-5
                                        bg-current
                                        transition-all
                                        duration-300
                                        ${
                                            mobileOpen
                                                ? `
                                                    opacity-0
                                                `
                                                : `
                                                    opacity-100
                                                `
                                        }
                                    `}
                                />

                                <span
                                    className={`
                                        absolute
                                        left-0
                                        h-px
                                        w-5
                                        bg-current
                                        transition-all
                                        duration-300
                                        ${
                                            mobileOpen
                                                ? `
                                                    top-2
                                                    -rotate-45
                                                `
                                                : `
                                                    top-4
                                                `
                                        }
                                    `}
                                />

                            </div>

                        </button>

                    </div>

                </div>


                {/* =====================================
                    MOBILE MENU
                ===================================== */}

                <div
                    className={`
                        overflow-hidden
                        transition-all
                        duration-500
                        lg:hidden
                        ${
                            mobileOpen
                                ? `
                                    max-h-[500px]
                                    opacity-100
                                `
                                : `
                                    max-h-0
                                    opacity-0
                                `
                        }
                    `}
                >

                    <div
                        className="
                            mobile-menu-scroll
                            max-h-[70vh]
                            overflow-y-auto
                            border-t
                            border-white/10
                            px-4
                            pb-5
                            pt-3
                        "
                    >

                        <nav
                            className="
                                flex
                                flex-col
                                gap-1
                            "
                        >

                            {navItems.map(
                                (item) => {

                                    const id =
                                        item.href.substring(
                                            1
                                        );

                                    const active =
                                        activeSection ===
                                        id;


                                    return (
                                        <a
                                            key={
                                                item.href
                                            }
                                            href={
                                                item.href
                                            }
                                            onClick={(e) =>
                                                handleNavigation(
                                                    e,
                                                    item.href
                                                )
                                            }
                                            className={`
                                                flex
                                                items-center
                                                justify-between
                                                rounded-xl
                                                px-4
                                                py-3.5
                                                text-sm
                                                font-medium
                                                transition
                                                ${
                                                    active
                                                        ? `
                                                            bg-purple-500/10
                                                            text-white
                                                        `
                                                        : `
                                                            text-zinc-400
                                                            hover:bg-white/5
                                                            hover:text-white
                                                        `
                                                }
                                            `}
                                        >

                                            <span>
                                                {item.label}
                                            </span>


                                            <span
                                                className={`
                                                    h-1.5
                                                    w-1.5
                                                    rounded-full
                                                    bg-gradient-to-r
                                                    from-purple-400
                                                    to-cyan-400
                                                    transition
                                                    ${
                                                        active
                                                            ? `
                                                                scale-100
                                                                opacity-100
                                                            `
                                                            : `
                                                                scale-0
                                                                opacity-0
                                                            `
                                                    }
                                                `}
                                            />

                                        </a>
                                    );

                                }
                            )}

                        </nav>


                        {/* Mobile Resume */}

                        {resumeUrl && (

                            <a
                                href={resumeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={
                                    closeMobileMenu
                                }
                                className="
                                    mt-3
                                    flex
                                    w-full
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-xl
                                    bg-gradient-to-r
                                    from-purple-600
                                    to-cyan-500
                                    px-4
                                    py-3.5
                                    text-sm
                                    font-bold
                                    text-white
                                    shadow-lg
                                    shadow-purple-900/20
                                "
                            >

                                View Resume

                            </a>

                        )}

                    </div>

                </div>

            </div>

        </header>
    );
};


export default Navbar;