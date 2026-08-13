import { useState } from "react";
import { sendContactMessage } from "../services/api";
import { useSettings } from "../context/SettingsContext";

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

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setSuccess("");
        setError("");

        try {
            const response =
                await sendContactMessage(formData);

            if (response.success) {
                setSuccess(
                    "Your message has been sent successfully!"
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
                    "Failed to send message"
                );
            }

        } catch (error) {
            console.error(
                "Contact error:",
                error
            );

            setError(
                error.message ||
                "Failed to send message"
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <section
            id="contact"
            className="py-24 px-6"
        >
            <div className="max-w-5xl mx-auto">

                {/* Header */}

                <div className="mb-12">

                    <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                        Get In Touch
                    </p>

                    <h2 className="text-4xl md:text-5xl font-bold mt-2">
                        Contact Me
                    </h2>

                    <p className="text-gray-600 mt-4 max-w-2xl">
                        Have a project, opportunity, or just want to
                        connect? Feel free to send me a message.
                    </p>

                </div>


                <div className="grid md:grid-cols-2 gap-12">

                    {/* Contact Information */}

                    <div>

                        <h3 className="text-2xl font-bold mb-6">
                            Let's talk
                        </h3>

                        <p className="text-gray-600 leading-7 mb-8">
                            I'm always interested in discussing new
                            projects, backend development opportunities,
                            and interesting ideas.
                        </p>


                        <div className="space-y-5">

                            {/* Email */}

                            {settings?.email && (
                                <div>

                                    <p className="text-sm text-gray-500">
                                        Email
                                    </p>

                                    <a
                                        href={`mailto:${settings.email}`}
                                        className="font-medium hover:underline"
                                    >
                                        {settings.email}
                                    </a>

                                </div>
                            )}


                            {/* Phone */}

                            {settings?.phone && (
                                <div>

                                    <p className="text-sm text-gray-500">
                                        Phone
                                    </p>

                                    <a
                                        href={`tel:${settings.phone}`}
                                        className="font-medium hover:underline"
                                    >
                                        {settings.phone}
                                    </a>

                                </div>
                            )}


                            {/* Location */}

                            {settings?.location && (
                                <div>

                                    <p className="text-sm text-gray-500">
                                        Location
                                    </p>

                                    <p className="font-medium">
                                        {settings.location}
                                    </p>

                                </div>
                            )}


                            {/* GitHub */}

                            {settings?.github && (
                                <div>

                                    <p className="text-sm text-gray-500">
                                        GitHub
                                    </p>

                                    <a
                                        href={settings.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-medium hover:underline"
                                    >
                                        GitHub Profile
                                    </a>

                                </div>
                            )}


                            {/* LinkedIn */}

                            {settings?.linkedin && (
                                <div>

                                    <p className="text-sm text-gray-500">
                                        LinkedIn
                                    </p>

                                    <a
                                        href={settings.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-medium hover:underline"
                                    >
                                        LinkedIn Profile
                                    </a>

                                </div>
                            )}

                        </div>

                    </div>


                    {/* Contact Form */}

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        {/* Name */}

                        <div>

                            <label className="block text-sm font-medium mb-2">
                                Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your name"
                                required
                                className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2"
                            />

                        </div>


                        {/* Email */}

                        <div>

                            <label className="block text-sm font-medium mb-2">
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="your@email.com"
                                required
                                className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2"
                            />

                        </div>


                        {/* Subject */}

                        <div>

                            <label className="block text-sm font-medium mb-2">
                                Subject
                            </label>

                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                placeholder="Subject"
                                required
                                className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2"
                            />

                        </div>


                        {/* Message */}

                        <div>

                            <label className="block text-sm font-medium mb-2">
                                Message
                            </label>

                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Write your message..."
                                rows="6"
                                required
                                className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 resize-none"
                            />

                        </div>


                        {/* Success */}

                        {success && (
                            <div className="p-3 rounded-lg bg-green-50 text-green-600">
                                {success}
                            </div>
                        )}


                        {/* Error */}

                        {error && (
                            <div className="p-3 rounded-lg bg-red-50 text-red-600">
                                {error}
                            </div>
                        )}


                        {/* Submit */}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full px-6 py-3 rounded-lg bg-black text-white disabled:opacity-50"
                        >
                            {loading
                                ? "Sending..."
                                : "Send Message"}
                        </button>

                    </form>

                </div>

            </div>
        </section>
    );
};

export default Contact;