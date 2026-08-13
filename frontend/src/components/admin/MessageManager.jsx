import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api";

const MessageManager = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [selectedMessage, setSelectedMessage] = useState(null);

    // --------------------------------
    // Get JWT Token
    // --------------------------------

    const getToken = () => {
        return localStorage.getItem("adminToken");
    };

    // --------------------------------
    // Load Messages
    // --------------------------------

    const loadMessages = async () => {
        try {
            setLoading(true);
            setError("");

            const token = getToken();

            const response = await fetch(
                `${API_URL}/contacts`,
                {
                    method: "GET",

                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            const text = await response.text();

            let data;

            try {
                data = JSON.parse(text);
            } catch {
                throw new Error(
                    `Server returned ${response.status} instead of JSON`
                );
            }

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Failed to load messages"
                );
            }

            setMessages(data.data || []);

        } catch (error) {
            console.error(
                "Load messages error:",
                error
            );

            setError(error.message);

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadMessages();
    }, []);

    // --------------------------------
    // Update Message Status
    // --------------------------------

    const updateStatus = async (id, status) => {
        try {
            setError("");

            const token = getToken();

            const response = await fetch(
                `${API_URL}/contacts/${id}/status`,
                {
                    method: "PATCH",

                    headers: {
                        "Content-Type":
                            "application/json",

                        Authorization:
                            `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        status
                    })
                }
            );

            const text = await response.text();

            let data;

            try {
                data = JSON.parse(text);
            } catch {
                throw new Error(
                    `Server returned ${response.status} instead of JSON`
                );
            }

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Failed to update message"
                );
            }

            await loadMessages();

            if (
                selectedMessage &&
                selectedMessage._id === id
            ) {
                setSelectedMessage(data.data);
            }

        } catch (error) {
            console.error(
                "Update message error:",
                error
            );

            setError(error.message);
        }
    };

    // --------------------------------
    // Delete Message
    // --------------------------------

    const deleteMessage = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this message?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setError("");

            const token = getToken();

            const response = await fetch(
                `${API_URL}/contacts/${id}`,
                {
                    method: "DELETE",

                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            const text = await response.text();

            let data;

            try {
                data = JSON.parse(text);
            } catch {
                throw new Error(
                    `Server returned ${response.status} instead of JSON`
                );
            }

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Failed to delete message"
                );
            }

            setSelectedMessage(null);

            await loadMessages();

        } catch (error) {
            console.error(
                "Delete message error:",
                error
            );

            setError(error.message);
        }
    };

    // --------------------------------
    // Format Date
    // --------------------------------

    const formatDate = (date) => {
        if (!date) {
            return "";
        }

        return new Date(date).toLocaleString(
            "en-IN",
            {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            }
        );
    };

    // --------------------------------
    // Status Style
    // --------------------------------

    const getStatusClass = (status) => {
        switch (status) {
            case "unread":
                return "bg-red-100 text-red-700";

            case "read":
                return "bg-yellow-100 text-yellow-700";

            case "replied":
                return "bg-green-100 text-green-700";

            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <div>

            {/* Header */}

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

                <div>

                    <h2 className="text-3xl font-bold">
                        Messages
                    </h2>

                    <p className="text-gray-500 mt-1">
                        Messages received from your portfolio
                    </p>

                </div>

                <button
                    onClick={loadMessages}
                    className="px-5 py-3 border bg-white rounded-lg"
                >
                    Refresh
                </button>

            </div>


            {/* Error */}

            {error && (
                <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg">
                    {error}
                </div>
            )}


            {/* Loading */}

            {loading && (
                <p className="text-gray-500">
                    Loading messages...
                </p>
            )}


            {/* Empty */}

            {!loading &&
                !error &&
                messages.length === 0 && (

                    <div className="bg-white border rounded-2xl p-12 text-center">

                        <div className="text-4xl mb-4">
                            📭
                        </div>

                        <h3 className="text-xl font-bold">
                            No messages
                        </h3>

                        <p className="text-gray-500 mt-2">
                            You haven't received any messages yet.
                        </p>

                    </div>
                )}


            {/* Messages */}

            {!loading &&
                messages.length > 0 && (

                    <div className="space-y-4">

                        {messages.map((message) => (

                            <div
                                key={message._id}
                                className="bg-white border rounded-2xl p-6"
                            >

                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">

                                    <div>

                                        <div className="flex items-center gap-3 flex-wrap">

                                            <h3 className="text-xl font-bold">
                                                {message.subject}
                                            </h3>

                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(
                                                    message.status
                                                )}`}
                                            >
                                                {message.status || "unread"}
                                            </span>

                                        </div>

                                        <p className="font-medium mt-2">
                                            {message.name}
                                        </p>

                                        <p className="text-sm text-gray-500">
                                            {message.email}
                                        </p>

                                    </div>

                                    <p className="text-sm text-gray-400">
                                        {formatDate(
                                            message.createdAt
                                        )}
                                    </p>

                                </div>


                                <p className="text-gray-600 mt-5 line-clamp-3">
                                    {message.message}
                                </p>


                                <div className="flex flex-wrap gap-3 mt-6">

                                    <button
                                        onClick={() =>
                                            setSelectedMessage(
                                                message
                                            )
                                        }
                                        className="px-4 py-2 bg-black text-white rounded-lg"
                                    >
                                        View
                                    </button>


                                    {message.status !== "read" &&
                                        message.status !== "replied" && (
                                            <button
                                                onClick={() =>
                                                    updateStatus(
                                                        message._id,
                                                        "read"
                                                    )
                                                }
                                                className="px-4 py-2 border rounded-lg"
                                            >
                                                Mark Read
                                            </button>
                                        )}


                                    {message.status !== "replied" && (
                                        <button
                                            onClick={() =>
                                                updateStatus(
                                                    message._id,
                                                    "replied"
                                                )
                                            }
                                            className="px-4 py-2 border rounded-lg"
                                        >
                                            Mark Replied
                                        </button>
                                    )}


                                    <button
                                        onClick={() =>
                                            deleteMessage(
                                                message._id
                                            )
                                        }
                                        className="px-4 py-2 bg-red-600 text-white rounded-lg"
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>
                )}


            {/* Message Modal */}

            {selectedMessage && (

                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">

                    <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

                        {/* Modal Header */}

                        <div className="p-6 border-b flex justify-between items-start gap-4">

                            <div>

                                <h3 className="text-2xl font-bold">
                                    {selectedMessage.subject}
                                </h3>

                                <p className="text-gray-500 mt-1">
                                    {formatDate(
                                        selectedMessage.createdAt
                                    )}
                                </p>

                            </div>

                            <button
                                onClick={() =>
                                    setSelectedMessage(null)
                                }
                                className="text-gray-500 text-xl"
                            >
                                ✕
                            </button>

                        </div>


                        {/* Modal Body */}

                        <div className="p-6 space-y-6">

                            <div>

                                <p className="text-sm text-gray-500">
                                    From
                                </p>

                                <p className="font-semibold">
                                    {selectedMessage.name}
                                </p>

                            </div>


                            <div>

                                <p className="text-sm text-gray-500">
                                    Email
                                </p>

                                <a
                                    href={`mailto:${selectedMessage.email}`}
                                    className="font-semibold hover:underline"
                                >
                                    {selectedMessage.email}
                                </a>

                            </div>


                            <div>

                                <p className="text-sm text-gray-500 mb-2">
                                    Message
                                </p>

                                <div className="bg-gray-50 border rounded-xl p-5 whitespace-pre-wrap leading-7">
                                    {selectedMessage.message}
                                </div>

                            </div>


                            <div>

                                <p className="text-sm text-gray-500 mb-2">
                                    Status
                                </p>

                                <span
                                    className={`inline-block px-3 py-1 rounded-full text-sm ${getStatusClass(
                                        selectedMessage.status
                                    )}`}
                                >
                                    {selectedMessage.status || "unread"}
                                </span>

                            </div>

                        </div>


                        {/* Modal Footer */}

                        <div className="p-6 border-t flex flex-wrap gap-3">

                            {selectedMessage.status !== "read" &&
                                selectedMessage.status !== "replied" && (
                                    <button
                                        onClick={() =>
                                            updateStatus(
                                                selectedMessage._id,
                                                "read"
                                            )
                                        }
                                        className="px-4 py-2 border rounded-lg"
                                    >
                                        Mark Read
                                    </button>
                                )}


                            {selectedMessage.status !== "replied" && (
                                <button
                                    onClick={() =>
                                        updateStatus(
                                            selectedMessage._id,
                                            "replied"
                                        )
                                    }
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg"
                                >
                                    Mark Replied
                                </button>
                            )}


                            <a
                                href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(
                                    selectedMessage.subject
                                )}`}
                                className="px-4 py-2 bg-black text-white rounded-lg"
                            >
                                Reply by Email
                            </a>

                        </div>

                    </div>

                </div>
            )}

        </div>
    );
};

export default MessageManager;