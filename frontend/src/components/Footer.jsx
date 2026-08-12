const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t py-8 px-6">

            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">

                <p className="text-sm text-gray-500">
                    © {currentYear} Bipasa Roy. All rights reserved.
                </p>

                <div className="flex gap-6">

                    <a
                        href="https://github.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm hover:underline"
                    >
                        GitHub
                    </a>

                    <a
                        href="#"
                        className="text-sm hover:underline"
                    >
                        LinkedIn
                    </a>

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