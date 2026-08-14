import { useEffect, useState } from "react";

import {
    getContacts,
    updateContactStatus,
    deleteContact
} from "../../services/api";


const MessageManager = () => {

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [selectedMessage, setSelectedMessage] =
        useState(null);

    const [updatingId, setUpdatingId] =
        useState(null);

    const [deletingId, setDeletingId] =
        useState(null);

    const [openStatusId, setOpenStatusId] = useState(null);    


    // ============================================================
    // LOAD MESSAGES
    // ============================================================

    const loadMessages = async () => {

        try {

            setLoading(true);
            setError("");

            const response =
                await getContacts();

            if (response.success) {

                setMessages(
                    response.data || []
                );

            } else {

                setError(
                    response.message ||
                    "Failed to load messages"
                );

            }

        } catch (error) {

            console.error(
                "Messages error:",
                error
            );

            setError(
                error.message ||
                "Unable to load messages"
            );

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        loadMessages();

    }, []);


    // ============================================================
    // UPDATE STATUS
    // ============================================================

    const handleStatusChange = async (
        id,
        status
    ) => {

        try {

            setUpdatingId(id);

            const response =
                await updateContactStatus(
                    id,
                    status
                );

            if (!response.success) {

                throw new Error(
                    response.message ||
                    "Failed to update status"
                );

            }

            setMessages((current) =>
                current.map((message) =>
                    message._id === id
                        ? {
                            ...message,
                            status
                        }
                        : message
                )
            );

            setSelectedMessage((current) =>
                current &&
                current._id === id
                    ? {
                        ...current,
                        status
                    }
                    : current
            );

        } catch (error) {

            console.error(
                "Status update error:",
                error
            );

            setError(
                error.message ||
                "Failed to update message status"
            );

        } finally {

            setUpdatingId(null);

        }

    };


    // ============================================================
    // DELETE MESSAGE
    // ============================================================

    const handleDelete = async (id) => {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this message?"
            );

        if (!confirmed) {
            return;
        }

        try {

            setDeletingId(id);

            const response =
                await deleteContact(id);

            if (!response.success) {

                throw new Error(
                    response.message ||
                    "Failed to delete message"
                );

            }

            setMessages((current) =>
                current.filter(
                    (message) =>
                        message._id !== id
                )
            );

            if (
                selectedMessage &&
                selectedMessage._id === id
            ) {

                setSelectedMessage(null);

            }

        } catch (error) {

            console.error(
                "Delete message error:",
                error
            );

            setError(
                error.message ||
                "Failed to delete message"
            );

        } finally {

            setDeletingId(null);

        }

    };


    // ============================================================
    // FORMAT DATE
    // ============================================================

    const formatDate = (date) => {

        if (!date) {
            return "";
        }

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

    };


    const formatTime = (date) => {

        if (!date) {
            return "";
        }

        return new Date(date).toLocaleTimeString(
            "en-IN",
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );

    };


    // ============================================================
    // STATUS STYLE
    // ============================================================

    const getStatusStyle = (status) => {

        switch (status) {

            case "unread":

                return {
                    badge:
                        "bg-cyan-400/10 text-cyan-300 border-cyan-400/20",
                    dot:
                        "bg-cyan-400"
                };


            case "read":

                return {
                    badge:
                        "bg-purple-400/10 text-purple-300 border-purple-400/20",
                    dot:
                        "bg-purple-400"
                };


            case "replied":

                return {
                    badge:
                        "bg-pink-400/10 text-pink-300 border-pink-400/20",
                    dot:
                        "bg-pink-400"
                };


            default:

                return {
                    badge:
                        "bg-white/5 text-white/60 border-white/10",
                    dot:
                        "bg-white/40"
                };

        }

    };


    // ============================================================
    // COUNTS
    // ============================================================

    const unreadCount =
        messages.filter(
            (message) =>
                message.status === "unread"
        ).length;


    const readCount =
        messages.filter(
            (message) =>
                message.status === "read"
        ).length;


    const repliedCount =
        messages.filter(
            (message) =>
                message.status === "replied"
        ).length;


    // ============================================================
    // LOADING
    // ============================================================

    if (loading) {

        return (

            <div className="min-h-[70vh] flex items-center justify-center">

                <div className="text-center">

                    <div
                        className="
                            w-12
                            h-12
                            mx-auto
                            rounded-full
                            border-2
                            border-white/10
                            border-t-purple-400
                            border-r-cyan-400
                            animate-spin
                        "
                    />

                    <p className="mt-5 text-sm text-white/50">
                        Loading messages...
                    </p>

                </div>

            </div>

        );

    }


    // ============================================================
    // PAGE
    // ============================================================

    return (

        <div className="relative min-h-full overflow-hidden">

            {/* ====================================================
                BACKGROUND GLOW
            ==================================================== */}

            <div
                className="
                    pointer-events-none
                    absolute
                    -top-40
                    left-1/4
                    w-[500px]
                    h-[400px]
                    rounded-full
                    bg-purple-600/10
                    blur-[120px]
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute
                    top-1/3
                    right-[-150px]
                    w-[400px]
                    h-[400px]
                    rounded-full
                    bg-cyan-500/10
                    blur-[120px]
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute
                    bottom-[-150px]
                    left-1/4
                    w-[450px]
                    h-[350px]
                    rounded-full
                    bg-pink-500/10
                    blur-[120px]
                "
            />


            {/* ====================================================
                CONTENT
            ==================================================== */}

            <div className="relative z-10 p-6 md:p-8 lg:p-10">

                {/* HEADER */}

                <div
                    className="
                        flex
                        flex-col
                        md:flex-row
                        md:items-end
                        md:justify-between
                        gap-6
                        mb-8
                    "
                >

                    <div>

                        <div
                            className="
                                flex
                                items-center
                                gap-2
                                mb-3
                            "
                        >

                            <span
                                className="
                                    w-8
                                    h-px
                                    bg-gradient-to-r
                                    from-purple-400
                                    to-cyan-400
                                "
                            />

                            <span
                                className="
                                    text-xs
                                    font-semibold
                                    tracking-[0.25em]
                                    uppercase
                                    text-purple-300
                                "
                            >
                                Communication
                            </span>

                        </div>


                        <h1
                            className="
                                text-3xl
                                md:text-4xl
                                font-bold
                                tracking-tight
                                text-white
                            "
                        >
                            Messages
                        </h1>


                        <p
                            className="
                                mt-2
                                text-sm
                                md:text-base
                                text-white/45
                            "
                        >
                            Manage conversations received
                            from your portfolio.
                        </p>

                    </div>


                    {/* REFRESH */}

                    <button
                        onClick={loadMessages}
                        className="
                            group
                            inline-flex
                            items-center
                            justify-center
                            gap-2
                            px-5
                            py-3
                            rounded-xl
                            border
                            border-white/10
                            bg-white/[0.03]
                            text-sm
                            font-medium
                            text-white/70
                            backdrop-blur-xl
                            transition-all
                            duration-300
                            hover:border-cyan-400/30
                            hover:bg-cyan-400/[0.06]
                            hover:text-cyan-300
                        "
                    >

                        <span
                            className="
                                text-lg
                                transition-transform
                                duration-500
                                group-hover:rotate-180
                            "
                        >
                            ↻
                        </span>

                        Refresh

                    </button>

                </div>


                {/* ERROR */}

                {error && (

                    <div
                        className="
                            mb-6
                            rounded-2xl
                            border
                            border-red-500/20
                            bg-red-500/[0.06]
                            px-5
                            py-4
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
                        grid-cols-1
                        sm:grid-cols-2
                        lg:grid-cols-4
                        gap-4
                        mb-8
                    "
                >

                    <StatCard
                        label="Total Messages"
                        value={messages.length}
                        icon="✉"
                        color="purple"
                    />

                    <StatCard
                        label="Unread"
                        value={unreadCount}
                        icon="●"
                        color="cyan"
                    />

                    <StatCard
                        label="Read"
                        value={readCount}
                        icon="◉"
                        color="purple"
                    />

                    <StatCard
                        label="Replied"
                        value={repliedCount}
                        icon="↗"
                        color="pink"
                    />

                </div>


                {/* =================================================
                    EMPTY STATE
                ================================================= */}

                {messages.length === 0 && (

                    <div
                        className="
                            rounded-3xl
                            border
                            border-white/10
                            bg-white/[0.025]
                            backdrop-blur-xl
                            p-16
                            text-center
                        "
                    >

                        <div
                            className="
                                w-16
                                h-16
                                mx-auto
                                rounded-2xl
                                flex
                                items-center
                                justify-center
                                border
                                border-purple-400/20
                                bg-purple-400/[0.08]
                                text-2xl
                                text-purple-300
                            "
                        >
                            ✉
                        </div>

                        <h3
                            className="
                                mt-5
                                text-xl
                                font-semibold
                                text-white
                            "
                        >
                            No messages yet
                        </h3>

                        <p
                            className="
                                mt-2
                                text-sm
                                text-white/40
                            "
                        >
                            Messages submitted through
                            your portfolio will appear here.
                        </p>

                    </div>

                )}


                {/* =================================================
                    MESSAGE LIST
                ================================================= */}

                <div className="space-y-4">

                    {messages.map((message) => {

                        const status =
                            getStatusStyle(
                                message.status
                            );


                        return (

                            <article
                                key={message._id}
                                className="
                                    group
                                    relative
                                    overflow-hidden
                                    rounded-2xl
                                    border
                                    border-white/[0.09]
                                    bg-white/[0.025]
                                    backdrop-blur-xl
                                    transition-all
                                    duration-300
                                    hover:-translate-y-1
                                    hover:border-purple-400/25
                                    hover:bg-white/[0.04]
                                    hover:shadow-[0_20px_70px_rgba(0,0,0,0.35)]
                                "
                            >

                                {/* TOP GRADIENT LINE */}

                                <div
                                    className="
                                        absolute
                                        top-0
                                        left-0
                                        right-0
                                        h-px
                                        bg-gradient-to-r
                                        from-purple-500/0
                                        via-purple-400/50
                                        to-cyan-400/0
                                        opacity-0
                                        transition-opacity
                                        duration-300
                                        group-hover:opacity-100
                                    "
                                />


                                <div className="p-5 md:p-6">

                                    {/* TOP ROW */}

                                    <div
                                        className="
                                            flex
                                            flex-col
                                            md:flex-row
                                            md:items-start
                                            md:justify-between
                                            gap-4
                                        "
                                    >

                                        <div className="flex gap-4">

                                            {/* AVATAR */}

                                            <div
                                                className="
                                                    shrink-0
                                                    w-12
                                                    h-12
                                                    rounded-xl
                                                    flex
                                                    items-center
                                                    justify-center
                                                    bg-gradient-to-br
                                                    from-purple-500/20
                                                    to-cyan-400/10
                                                    border
                                                    border-purple-400/20
                                                    text-purple-300
                                                    font-bold
                                                "
                                            >
                                                {message.name
                                                    ?.charAt(0)
                                                    ?.toUpperCase() ||
                                                    "?"}
                                            </div>


                                            <div>

                                                <h3
                                                    className="
                                                        text-base
                                                        font-semibold
                                                        text-white
                                                    "
                                                >
                                                    {message.name}
                                                </h3>

                                                <p
                                                    className="
                                                        mt-1
                                                        text-sm
                                                        text-cyan-300/70
                                                    "
                                                >
                                                    {message.email}
                                                </p>

                                            </div>

                                        </div>


                                        {/* DATE */}

                                        <div
                                            className="
                                                text-xs
                                                text-white/35
                                                md:text-right
                                            "
                                        >
                                            <p>
                                                {formatDate(
                                                    message.createdAt
                                                )}
                                            </p>

                                            <p className="mt-1">
                                                {formatTime(
                                                    message.createdAt
                                                )}
                                            </p>
                                        </div>

                                    </div>


                                    {/* SUBJECT */}

                                    <div className="mt-6">

                                        <div
                                            className="
                                                text-[10px]
                                                uppercase
                                                tracking-[0.2em]
                                                text-white/30
                                                mb-2
                                            "
                                        >
                                            Subject
                                        </div>

                                        <h4
                                            className="
                                                text-lg
                                                font-semibold
                                                text-white
                                            "
                                        >
                                            {message.subject}
                                        </h4>

                                    </div>


                                    {/* MESSAGE */}

                                    <p
                                        className="
                                            mt-3
                                            text-sm
                                            leading-7
                                            text-white/50
                                            line-clamp-2
                                        "
                                    >
                                        {message.message}
                                    </p>


                                    {/* BOTTOM */}

                                    <div
                                        className="
                                            flex
                                            flex-col
                                            sm:flex-row
                                            sm:items-center
                                            sm:justify-between
                                            gap-4
                                            mt-6
                                            pt-5
                                            border-t
                                            border-white/[0.06]
                                        "
                                    >

                                        {/* STATUS */}

                                        <div
                                            className="
                                                flex
                                                items-center
                                                gap-3
                                            "
                                        >

                                            <span
                                                className={`
                                                    inline-flex
                                                    items-center
                                                    gap-2
                                                    px-3
                                                    py-1.5
                                                    rounded-full
                                                    border
                                                    text-xs
                                                    font-medium
                                                    ${status.badge}
                                                `}
                                            >

                                                <span
                                                    className={`
                                                        w-1.5
                                                        h-1.5
                                                        rounded-full
                                                        ${status.dot}
                                                    `}
                                                />

                                                {message.status ||
                                                    "unread"}

                                            </span>


                                            {/* STATUS SELECT */}

                                           <div className="relative">

    <button
        type="button"
        disabled={
            updatingId === message._id
        }
        onClick={() =>
            setOpenStatusId(
                openStatusId === message._id
                    ? null
                    : message._id
            )
        }
        className="
            flex
            items-center
            justify-between
            gap-4
            min-w-[130px]
            px-3
            py-2
            rounded-xl
            border
            border-white/10
            bg-white/[0.035]
            backdrop-blur-xl
            text-xs
            text-white/70
            transition-all
            duration-200
            hover:border-purple-400/30
            hover:bg-purple-400/[0.06]
            disabled:opacity-50
        "
    >

        <span className="flex items-center gap-2">

            <span
                className={`
                    w-1.5
                    h-1.5
                    rounded-full
                    ${
                        message.status === "unread"
                            ? "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                            : message.status === "read"
                            ? "bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.8)]"
                            : "bg-pink-400 shadow-[0_0_8px_rgba(236,72,153,0.8)]"
                    }
                `}
            />

            <span className="capitalize">
                {message.status || "unread"}
            </span>

        </span>


        <span
            className={`
                text-white/40
                transition-transform
                duration-200
                ${
                    openStatusId === message._id
                        ? "rotate-180"
                        : ""
                }
            `}
        >
            ▼
        </span>

    </button>


    {/* CUSTOM DROPDOWN */}

    {openStatusId === message._id && (

        <div
            className="
                absolute
                left-0
                bottom-[calc(100%+8px)]
                z-[9999]
                min-w-[170px]
                overflow-hidden
                rounded-xl
                border
                border-white/10
                bg-[#111116]/95
                backdrop-blur-2xl
                shadow-[0_20px_60px_rgba(0,0,0,0.55)]
            "
        >

            {/* UNREAD */}

            <button
                type="button"
                onClick={() => {

                    handleStatusChange(
                        message._id,
                        "unread"
                    );

                    setOpenStatusId(null);

                }}
                className="
                    w-full
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                    text-left
                    text-xs
                    text-white/65
                    transition
                    hover:bg-cyan-400/[0.08]
                    hover:text-cyan-300
                "
            >

                <span
                    className="
                        w-2
                        h-2
                        rounded-full
                        bg-cyan-400
                        shadow-[0_0_8px_rgba(34,211,238,0.7)]
                    "
                />

                Unread

            </button>


            {/* READ */}

            <button
                type="button"
                onClick={() => {

                    handleStatusChange(
                        message._id,
                        "read"
                    );

                    setOpenStatusId(null);

                }}
                className="
                    w-full
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                    text-left
                    text-xs
                    text-white/65
                    transition
                    hover:bg-purple-400/[0.08]
                    hover:text-purple-300
                "
            >

                <span
                    className="
                        w-2
                        h-2
                        rounded-full
                        bg-purple-400
                        shadow-[0_0_8px_rgba(168,85,247,0.7)]
                    "
                />

                Read

            </button>


            {/* REPLIED */}

            <button
                type="button"
                onClick={() => {

                    handleStatusChange(
                        message._id,
                        "replied"
                    );

                    setOpenStatusId(null);

                }}
                className="
                    w-full
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                    text-left
                    text-xs
                    text-white/65
                    transition
                    hover:bg-pink-400/[0.08]
                    hover:text-pink-300
                "
            >

                <span
                    className="
                        w-2
                        h-2
                        rounded-full
                        bg-pink-400
                        shadow-[0_0_8px_rgba(236,72,153,0.7)]
                    "
                />

                Replied

            </button>

        </div>

    )}

</div>

                                        </div>


                                        {/* ACTIONS */}

                                        <div
                                            className="
                                                flex
                                                items-center
                                                gap-2
                                            "
                                        >

                                            <button
                                                onClick={() =>
                                                    setSelectedMessage(
                                                        message
                                                    )
                                                }
                                                className="
                                                    px-4
                                                    py-2
                                                    rounded-lg
                                                    border
                                                    border-white/10
                                                    bg-white/[0.03]
                                                    text-xs
                                                    font-medium
                                                    text-white/70
                                                    transition
                                                    hover:border-cyan-400/30
                                                    hover:bg-cyan-400/[0.06]
                                                    hover:text-cyan-300
                                                "
                                            >
                                                View Message
                                            </button>


                                            <button
                                                onClick={() =>
                                                    handleDelete(
                                                        message._id
                                                    )
                                                }
                                                disabled={
                                                    deletingId ===
                                                    message._id
                                                }
                                                className="
                                                    px-4
                                                    py-2
                                                    rounded-lg
                                                    border
                                                    border-red-400/15
                                                    bg-red-400/[0.04]
                                                    text-xs
                                                    font-medium
                                                    text-red-300/80
                                                    transition
                                                    hover:border-red-400/30
                                                    hover:bg-red-400/[0.08]
                                                    hover:text-red-300
                                                    disabled:opacity-50
                                                "
                                            >
                                                {deletingId ===
                                                message._id
                                                    ? "Deleting..."
                                                    : "Delete"}
                                            </button>

                                        </div>

                                    </div>

                                </div>

                            </article>

                        );

                    })}

                </div>

            </div>


            {/* ====================================================
                MESSAGE MODAL
            ==================================================== */}

            {selectedMessage && (

                <div
                    className="
                        fixed
                        inset-0
                        z-50
                        flex
                        items-center
                        justify-center
                        p-4
                        bg-black/70
                        backdrop-blur-md
                    "
                    onClick={() =>
                        setSelectedMessage(null)
                    }
                >

                    <div
                        className="
                            relative
                            w-full
                            max-w-2xl
                            max-h-[90vh]
                            overflow-y-auto
                            rounded-3xl
                            border
                            border-white/10
                            bg-[#0b0b10]/95
                            shadow-[0_30px_100px_rgba(0,0,0,0.7)]
                        "
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >

                        {/* MODAL GLOW */}

                        <div
                            className="
                                absolute
                                -top-32
                                left-1/3
                                w-64
                                h-64
                                rounded-full
                                bg-purple-500/15
                                blur-[100px]
                                pointer-events-none
                            "
                        />


                        <div className="relative p-6 md:p-8">

                            {/* HEADER */}

                            <div
                                className="
                                    flex
                                    items-start
                                    justify-between
                                    gap-4
                                "
                            >

                                <div>

                                    <p
                                        className="
                                            text-xs
                                            uppercase
                                            tracking-[0.2em]
                                            text-purple-300
                                        "
                                    >
                                        Message
                                    </p>

                                    <h2
                                        className="
                                            mt-2
                                            text-2xl
                                            font-bold
                                            text-white
                                        "
                                    >
                                        {selectedMessage.subject}
                                    </h2>

                                </div>


                                <button
                                    onClick={() =>
                                        setSelectedMessage(
                                            null
                                        )
                                    }
                                    className="
                                        w-10
                                        h-10
                                        rounded-xl
                                        border
                                        border-white/10
                                        bg-white/[0.03]
                                        text-white/50
                                        transition
                                        hover:bg-white/[0.07]
                                        hover:text-white
                                    "
                                >
                                    ×
                                </button>

                            </div>


                            {/* SENDER */}

                            <div
                                className="
                                    mt-7
                                    p-4
                                    rounded-2xl
                                    border
                                    border-white/[0.08]
                                    bg-white/[0.025]
                                "
                            >

                                <div
                                    className="
                                        flex
                                        items-center
                                        gap-4
                                    "
                                >

                                    <div
                                        className="
                                            w-11
                                            h-11
                                            rounded-xl
                                            flex
                                            items-center
                                            justify-center
                                            bg-gradient-to-br
                                            from-purple-500/20
                                            to-cyan-400/10
                                            border
                                            border-purple-400/20
                                            text-purple-300
                                            font-bold
                                        "
                                    >
                                        {selectedMessage.name
                                            ?.charAt(0)
                                            ?.toUpperCase()}
                                    </div>

                                    <div>

                                        <p
                                            className="
                                                font-semibold
                                                text-white
                                            "
                                        >
                                            {selectedMessage.name}
                                        </p>

                                        <p
                                            className="
                                                text-sm
                                                text-cyan-300/70
                                            "
                                        >
                                            {selectedMessage.email}
                                        </p>

                                    </div>

                                </div>

                            </div>


                            {/* MESSAGE BODY */}

                            <div className="mt-6">

                                <p
                                    className="
                                        text-[10px]
                                        uppercase
                                        tracking-[0.2em]
                                        text-white/30
                                        mb-3
                                    "
                                >
                                    Message
                                </p>

                                <div
                                    className="
                                        rounded-2xl
                                        border
                                        border-white/[0.08]
                                        bg-black/20
                                        p-5
                                        text-sm
                                        leading-7
                                        text-white/65
                                        whitespace-pre-wrap
                                    "
                                >
                                    {selectedMessage.message}
                                </div>

                            </div>


                            {/* STATUS */}

                            <div
                                className="
                                    flex
                                    flex-col
                                    sm:flex-row
                                    sm:items-center
                                    sm:justify-between
                                    gap-4
                                    mt-6
                                    pt-5
                                    border-t
                                    border-white/[0.06]
                                "
                            >

                                <div className="relative">

    <button
        type="button"
        onClick={() =>
            setOpenStatusId(
                openStatusId === `modal-${selectedMessage._id}`
                    ? null
                    : `modal-${selectedMessage._id}`
            )
        }
        className="
            flex
            items-center
            gap-3
            px-4
            py-3
            rounded-xl
            border
            border-white/10
            bg-white/[0.035]
            text-sm
            text-white/70
            hover:border-purple-400/30
            hover:bg-purple-400/[0.06]
            transition-all
        "
    >

        <span className="capitalize">
            {selectedMessage.status || "unread"}
        </span>

        <span className="text-white/40">
            ▼
        </span>

    </button>


    {openStatusId ===
        `modal-${selectedMessage._id}` && (

        <div
            className="
                absolute
                bottom-[calc(100%+8px)]
                left-0
                z-50
                min-w-[170px]
                overflow-hidden
                rounded-xl
                border
                border-white/10
                bg-[#111116]/95
                backdrop-blur-2xl
                shadow-[0_20px_60px_rgba(0,0,0,0.55)]
            "
        >

            {[
                {
                    value: "unread",
                    label: "Unread",
                    color: "cyan"
                },
                {
                    value: "read",
                    label: "Read",
                    color: "purple"
                },
                {
                    value: "replied",
                    label: "Replied",
                    color: "pink"
                }
            ].map((item) => (

                <button
                    key={item.value}
                    type="button"
                    onClick={() => {

                        handleStatusChange(
                            selectedMessage._id,
                            item.value
                        );

                        setOpenStatusId(null);

                    }}
                    className="
                        w-full
                        flex
                        items-center
                        gap-3
                        px-4
                        py-3
                        text-left
                        text-sm
                        text-white/65
                        hover:bg-white/[0.05]
                        transition
                    "
                >

                    <span
                        className={`
                            w-2
                            h-2
                            rounded-full
                            ${
                                item.color === "cyan"
                                    ? "bg-cyan-400"
                                    : item.color === "purple"
                                    ? "bg-purple-400"
                                    : "bg-pink-400"
                            }
                        `}
                    />

                    {item.label}

                </button>

            ))}

        </div>

    )}

</div>

                                <button
                                    onClick={() =>
                                        setSelectedMessage(
                                            null
                                        )
                                    }
                                    className="
                                        px-5
                                        py-3
                                        rounded-xl
                                        bg-gradient-to-r
                                        from-purple-600
                                        to-cyan-500
                                        text-sm
                                        font-semibold
                                        text-white
                                        shadow-lg
                                        shadow-purple-500/10
                                        transition
                                        hover:-translate-y-0.5
                                        hover:shadow-purple-500/20
                                    "
                                >
                                    Close
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            )}

        </div>

    );

};


// ============================================================
// STAT CARD
// ============================================================

const StatCard = ({
    label,
    value,
    icon,
    color
}) => {

    const colors = {

        purple: {
            border:
                "border-purple-400/15",
            bg:
                "bg-purple-400/[0.05]",
            icon:
                "text-purple-300",
            glow:
                "bg-purple-500/10"
        },

        cyan: {
            border:
                "border-cyan-400/15",
            bg:
                "bg-cyan-400/[0.05]",
            icon:
                "text-cyan-300",
            glow:
                "bg-cyan-500/10"
        },

        pink: {
            border:
                "border-pink-400/15",
            bg:
                "bg-pink-400/[0.05]",
            icon:
                "text-pink-300",
            glow:
                "bg-pink-500/10"
        }

    };


    const theme =
        colors[color] || colors.purple;


    return (

        <div
            className={`
                relative
                overflow-visible
                rounded-2xl
                border
                ${theme.border}
                bg-white/[0.025]
                backdrop-blur-xl
                p-5
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-white/[0.04]
            `}
        >

            <div
                className={`
                    absolute
                    -right-8
                    -top-8
                    w-24
                    h-24
                    rounded-full
                    ${theme.glow}
                    blur-2xl
                `}
            />


            <div
                className="
                    relative
                    flex
                    items-center
                    justify-between
                "
            >

                <div>

                    <p
                        className="
                            text-xs
                            text-white/35
                        "
                    >
                        {label}
                    </p>

                    <p
                        className="
                            mt-2
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
                        w-11
                        h-11
                        rounded-xl
                        flex
                        items-center
                        justify-center
                        border
                        ${theme.border}
                        ${theme.bg}
                        ${theme.icon}
                    `}
                >
                    {icon}
                </div>

            </div>

        </div>

    );

};


export default MessageManager;