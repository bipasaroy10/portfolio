import { useSettings } from "../context/SettingsContext";

const Footer = () => {
    const { settings } = useSettings();

    const currentYear =
        new Date().getFullYear();

    return (
        <footer className="border-t py-8 px-6">

            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">

                <p className="text-sm text-gray-500">
                    © {currentYear}{" "}
                    {settings?.name || "Bipasa Roy"}.
                    {" "}All rights reserved.
                </p>

                <div className="flex gap-6">

                    {settings?.github && (
                        <a
                            href={settings.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm hover:underline"
                        >
                            GitHub
                        </a>
                    )}

                    {settings?.linkedin && (
                        <a
                            href={settings.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm hover:underline"
                        >
                            LinkedIn
                        </a>
                    )}

                    <a
                        href="#home"
                        className="text-sm hover:underline"
                    >
                        Back to top
                    </a>

                </div>

            </div>

        </footer>
    );
};

export default Footer;