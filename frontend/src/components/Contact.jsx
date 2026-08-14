import { useEffect, useRef, useState } from "react";
// import { sendContactMessage } from "../services/api";
import { useSettings } from "../context/SettingsContext";
import {
    sendContactMessage
} from "../services/api";


const Contact = () => {

    const { settings } = useSettings();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const sectionRef = useRef(null);
    const [visible, setVisible] = useState(false);


    /* =========================================
       SCROLL REVEAL
    ========================================= */

    useEffect(() => {

        const element = sectionRef.current;

        if (!element) return;

        const observer = new IntersectionObserver(
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

        return () => observer.disconnect();

    }, []);


    /* =========================================
       INPUT CHANGE
    ========================================= */

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));

        setSuccess("");
        setError("");

    };


    /* =========================================
       SUBMIT
    ========================================= */

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);
        setSuccess("");
        setError("");

        try {

            const response =
                await sendContactMessage(
                    formData
                );


            if (response.success) {

                setSuccess(
                    "Message sent successfully. I'll get back to you soon."
                );

                setFormData({
                    name: "",
                    email: "",
                    subject: "",
                    message: ""
                });

            } else {

                setError(
                    response.message ||
                    "Failed to send message."
                );

            }

        } catch (error) {

            console.error(
                "Contact error:",
                error
            );

            setError(
                error.message ||
                "Unable to send your message."
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <section
            ref={sectionRef}
            id="contact"
            className="
                premium-section
                relative
                overflow-hidden
            "
        >

            {/* =====================================
                BACKGROUND GLOWS
            ===================================== */}

            <div
                className="
                    pointer-events-none
                    absolute
                    left-[-180px]
                    top-1/4
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
                    right-[-160px]
                    top-1/3
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
                    bottom-0
                    left-1/2
                    h-[300px]
                    w-[300px]
                    -translate-x-1/2
                    rounded-full
                    bg-pink-500/[0.05]
                    blur-[120px]
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
                                from-pink-400
                                to-purple-400
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
                            Get In Touch
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

                        Let's build
                        <span className="accent-text">
                            {" "}something.
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
                        Have a project, opportunity, or idea?
                        I'd love to hear about it. Send me a
                        message and let's start a conversation.
                    </p>

                </div>


                {/* =====================================
                    MAIN CONTACT GRID
                ===================================== */}

                <div
                    className="
                        grid
                        gap-8
                        lg:grid-cols-[0.8fr_1.2fr]
                    "
                >

                    {/* =================================
                        LEFT PANEL
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
                                    ? "translate-x-0 opacity-100"
                                    : "-translate-x-8 opacity-0"
                            }
                        `}
                    >

                        {/* Decorative glow */}

                        <div
                            className="
                                pointer-events-none
                                absolute
                                right-[-80px]
                                top-[-80px]
                                h-48
                                w-48
                                rounded-full
                                bg-purple-500/[0.12]
                                blur-[70px]
                            "
                        />


                        <div className="relative">

                            <div
                                className="
                                    mb-7
                                    flex
                                    h-14
                                    w-14
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    border
                                    border-purple-400/20
                                    bg-purple-500/[0.08]
                                    text-purple-300
                                "
                            >

                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.6"
                                >

                                    <path
                                        d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2Z"
                                    />

                                    <path
                                        d="m22 6-10 7L2 6"
                                    />

                                </svg>

                            </div>


                            <h3
                                className="
                                    text-2xl
                                    font-bold
                                    text-white
                                "
                            >
                                Let's talk
                            </h3>


                            <p
                                className="
                                    mt-4
                                    text-sm
                                    leading-7
                                    text-zinc-500
                                "
                            >
                                I'm always interested in
                                discussing new projects,
                                backend development
                                opportunities, and interesting
                                ideas.
                            </p>


                            {/* =============================
                                CONTACT DETAILS
                            ============================= */}

                            <div
                                className="
                                    mt-9
                                    space-y-3
                                "
                            >

                                {/* EMAIL */}

                                {settings?.email && (

                                    <a
                                        href={`mailto:${settings.email}`}
                                        className="
                                            contact-info-card
                                            group
                                        "
                                    >

                                        <span
                                            className="
                                                contact-info-icon
                                                bg-purple-500/[0.08]
                                                text-purple-300
                                            "
                                        >
                                            @
                                        </span>


                                        <span>

                                            <span
                                                className="
                                                    block
                                                    text-[10px]
                                                    font-semibold
                                                    uppercase
                                                    tracking-wider
                                                    text-zinc-600
                                                "
                                            >
                                                Email
                                            </span>

                                            <span
                                                className="
                                                    mt-1
                                                    block
                                                    break-all
                                                    text-sm
                                                    text-zinc-300
                                                    group-hover:text-white
                                                "
                                            >
                                                {settings.email}
                                            </span>

                                        </span>

                                    </a>

                                )}


                                {/* LOCATION */}

                                {settings?.location && (

                                    <div
                                        className="
                                            contact-info-card
                                        "
                                    >

                                        <span
                                            className="
                                                contact-info-icon
                                                bg-cyan-500/[0.08]
                                                text-cyan-300
                                            "
                                        >
                                            ●
                                        </span>


                                        <span>

                                            <span
                                                className="
                                                    block
                                                    text-[10px]
                                                    font-semibold
                                                    uppercase
                                                    tracking-wider
                                                    text-zinc-600
                                                "
                                            >
                                                Location
                                            </span>

                                            <span
                                                className="
                                                    mt-1
                                                    block
                                                    text-sm
                                                    text-zinc-300
                                                "
                                            >
                                                {settings.location}
                                            </span>

                                        </span>

                                    </div>

                                )}


                                {/* GITHUB */}

                                {settings?.github && (

                                    <a
                                        href={settings.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="
                                            contact-info-card
                                            group
                                        "
                                    >

                                        <span
                                            className="
                                                contact-info-icon
                                                bg-white/[0.05]
                                                text-zinc-300
                                            "
                                        >
                                            GH
                                        </span>


                                        <span>

                                            <span
                                                className="
                                                    block
                                                    text-[10px]
                                                    font-semibold
                                                    uppercase
                                                    tracking-wider
                                                    text-zinc-600
                                                "
                                            >
                                                GitHub
                                            </span>

                                            <span
                                                className="
                                                    mt-1
                                                    block
                                                    text-sm
                                                    text-zinc-300
                                                    group-hover:text-white
                                                "
                                            >
                                                View my projects
                                            </span>

                                        </span>

                                    </a>

                                )}


                                {/* LINKEDIN */}

                                {settings?.linkedin && (

                                    <a
                                        href={settings.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="
                                            contact-info-card
                                            group
                                        "
                                    >

                                        <span
                                            className="
                                                contact-info-icon
                                                bg-cyan-500/[0.08]
                                                text-cyan-300
                                            "
                                        >
                                            in
                                        </span>


                                        <span>

                                            <span
                                                className="
                                                    block
                                                    text-[10px]
                                                    font-semibold
                                                    uppercase
                                                    tracking-wider
                                                    text-zinc-600
                                                "
                                            >
                                                LinkedIn
                                            </span>

                                            <span
                                                className="
                                                    mt-1
                                                    block
                                                    text-sm
                                                    text-zinc-300
                                                    group-hover:text-white
                                                "
                                            >
                                                Connect with me
                                            </span>

                                        </span>

                                    </a>

                                )}

                            </div>


                            {/* Availability */}

                            <div
                                className="
                                    mt-8
                                    flex
                                    items-center
                                    gap-3
                                    rounded-2xl
                                    border
                                    border-emerald-400/10
                                    bg-emerald-500/[0.04]
                                    px-4
                                    py-3
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


                                <span
                                    className="
                                        text-xs
                                        text-emerald-300
                                    "
                                >
                                    Available for opportunities
                                </span>

                            </div>

                        </div>

                    </div>


                    {/* =================================
                        FORM
                    ================================= */}

                    <form
                        onSubmit={handleSubmit}
                        className={`
                            glass-panel
                            relative
                            overflow-hidden
                            p-7
                            transition-all
                            delay-150
                            duration-1000
                            sm:p-9
                            ${
                                visible
                                    ? "translate-x-0 opacity-100"
                                    : "translate-x-8 opacity-0"
                            }
                        `}
                    >

                        {/* Top gradient */}

                        <div
                            className="
                                absolute
                                left-[10%]
                                right-[10%]
                                top-0
                                h-px
                                bg-gradient-to-r
                                from-transparent
                                via-purple-400/50
                                to-transparent
                            "
                        />


                        <div className="relative">

                            <div
                                className="
                                    mb-8
                                    flex
                                    items-center
                                    justify-between
                                "
                            >

                                <div>

                                    <p
                                        className="
                                            text-lg
                                            font-semibold
                                            text-white
                                        "
                                    >
                                        Send a message
                                    </p>

                                    <p
                                        className="
                                            mt-1
                                            text-xs
                                            text-zinc-600
                                        "
                                    >
                                        I'll respond as soon as possible.
                                    </p>

                                </div>


                                <span
                                    className="
                                        hidden
                                        rounded-full
                                        border
                                        border-purple-400/15
                                        bg-purple-500/[0.06]
                                        px-3
                                        py-1.5
                                        text-[10px]
                                        font-medium
                                        uppercase
                                        tracking-wider
                                        text-purple-300
                                        sm:block
                                    "
                                >
                                    Contact
                                </span>

                            </div>


                            {/* =================================
                                NAME + EMAIL
                            ================================= */}

                            <div
                                className="
                                    grid
                                    gap-5
                                    md:grid-cols-2
                                "
                            >

                                <div className="premium-input-group">

                                    <label
                                        htmlFor="name"
                                        className="
                                            premium-input-label
                                        "
                                    >
                                        Name
                                    </label>


                                    <input
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={
                                            formData.name
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="Your name"
                                        required
                                        className="
                                            premium-input
                                        "
                                    />

                                </div>


                                <div className="premium-input-group">

                                    <label
                                        htmlFor="email"
                                        className="
                                            premium-input-label
                                        "
                                    >
                                        Email
                                    </label>


                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={
                                            formData.email
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="you@example.com"
                                        required
                                        className="
                                            premium-input
                                        "
                                    />

                                </div>

                            </div>


                            {/* =================================
                                SUBJECT
                            ================================= */}

                            <div
                                className="
                                    premium-input-group
                                    mt-5
                                "
                            >

                                <label
                                    htmlFor="subject"
                                    className="
                                        premium-input-label
                                    "
                                >
                                    Subject
                                </label>


                                <input
                                    id="subject"
                                    type="text"
                                    name="subject"
                                    value={
                                        formData.subject
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="What would you like to discuss?"
                                    required
                                    className="
                                        premium-input
                                    "
                                />

                            </div>


                            {/* =================================
                                MESSAGE
                            ================================= */}

                            <div
                                className="
                                    premium-input-group
                                    mt-5
                                "
                            >

                                <label
                                    htmlFor="message"
                                    className="
                                        premium-input-label
                                    "
                                >
                                    Message
                                </label>


                                <textarea
                                    id="message"
                                    name="message"
                                    value={
                                        formData.message
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Tell me a little about your project..."
                                    rows="6"
                                    required
                                    className="
                                        premium-input
                                        min-h-[160px]
                                        resize-none
                                    "
                                />

                            </div>


                            {/* =================================
                                STATUS
                            ================================= */}

                            {success && (

                                <div
                                    className="
                                        mt-5
                                        flex
                                        items-start
                                        gap-3
                                        rounded-2xl
                                        border
                                        border-emerald-400/15
                                        bg-emerald-500/[0.06]
                                        p-4
                                        text-sm
                                        text-emerald-300
                                    "
                                >

                                    <span
                                        className="
                                            mt-0.5
                                        "
                                    >
                                        ✓
                                    </span>

                                    <span>
                                        {success}
                                    </span>

                                </div>

                            )}


                            {error && (

                                <div
                                    className="
                                        mt-5
                                        flex
                                        items-start
                                        gap-3
                                        rounded-2xl
                                        border
                                        border-red-400/15
                                        bg-red-500/[0.06]
                                        p-4
                                        text-sm
                                        text-red-300
                                    "
                                >

                                    <span>
                                        !
                                    </span>

                                    <span>
                                        {error}
                                    </span>

                                </div>

                            )}


                            {/* =================================
                                SUBMIT
                            ================================= */}

                            <button
                                type="submit"
                                disabled={loading}
                                className="
                                    contact-submit
                                    group
                                    mt-6
                                    flex
                                    w-full
                                    items-center
                                    justify-center
                                    gap-3
                                    rounded-2xl
                                    bg-gradient-to-r
                                    from-purple-600
                                    via-violet-600
                                    to-cyan-500
                                    px-6
                                    py-4
                                    text-sm
                                    font-bold
                                    text-white
                                    shadow-lg
                                    shadow-purple-950/30
                                    transition-all
                                    duration-300
                                    hover:-translate-y-1
                                    hover:shadow-purple-500/20
                                    disabled:cursor-not-allowed
                                    disabled:opacity-50
                                "
                            >

                                {loading ? (

                                    <>
                                        <span
                                            className="
                                                h-4
                                                w-4
                                                animate-spin
                                                rounded-full
                                                border-2
                                                border-white/30
                                                border-t-white
                                            "
                                        />

                                        Sending...

                                    </>

                                ) : (

                                    <>
                                        Send Message

                                        <span
                                            className="
                                                text-base
                                                transition-transform
                                                duration-300
                                                group-hover:translate-x-1
                                            "
                                        >
                                            →
                                        </span>
                                    </>

                                )}

                            </button>


                            <p
                                className="
                                    mt-4
                                    text-center
                                    text-[10px]
                                    leading-5
                                    text-zinc-700
                                "
                            >
                                Your information is only used
                                to respond to your message.
                            </p>

                        </div>

                    </form>

                </div>

            </div>

        </section>
    );
};


export default Contact;