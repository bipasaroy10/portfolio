import { useSettings } from "../context/SettingsContext";

const Navbar = () => {
    const { settings } = useSettings();

    return (
        <nav className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md border-b z-50">

            <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

                <a
                    href="#home"
                    className="text-2xl font-bold"
                >
                    {settings?.name || "Bipasa Roy"}
                </a>

                <div className="hidden md:flex gap-6">

                    <a href="#home">
                        Home
                    </a>

                    <a href="#about">
                        About
                    </a>

                    <a href="#skills">
                        Skills
                    </a>

                    <a href="#projects">
                        Projects
                    </a>

                    <a href="#experience">
                        Experience
                    </a>

                    <a href="#contact">
                        Contact
                    </a>

                </div>

            </div>

        </nav>
    );
};

export default Navbar;