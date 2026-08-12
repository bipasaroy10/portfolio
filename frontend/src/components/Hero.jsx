const Hero = () => {
    return (
        <section
            id="home"
            className="min-h-screen flex items-center justify-center px-6"
        >
            <div className="max-w-4xl text-center">

                <p className="text-lg mb-4">
                    Hello, I'm
                </p>

                <h1 className="text-5xl md:text-7xl font-bold mb-6">
                    abc roy
                </h1>

                <h2 className="text-2xl md:text-3xl mb-6">
                    fullstack Developer
                </h2>

                <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                    I build scalable fullstack applications and REST APIs
                    using JavaScript, Node.js, Express.js and MongoDB.
                </p>

                <div className="flex justify-center gap-4">

                    <a
                        href="#projects"
                        className="px-6 py-3 rounded-lg bg-black text-white"
                    >
                        View Projects
                    </a>

                    <a
                        href="#contact"
                        className="px-6 py-3 rounded-lg border"
                    >
                        Contact Me
                    </a>

                </div>

            </div>
        </section>
    );
};

export default Hero;