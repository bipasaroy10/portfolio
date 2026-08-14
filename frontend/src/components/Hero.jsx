const Hero = ({ settings }) => {

    const name =
        settings?.name || "Bipasa Roy";

    const title =
        settings?.title || "Backend Developer";

    const about =
        settings?.about ||
        "I build scalable web applications and REST APIs using JavaScript, Node.js, Express.js and MongoDB.";

    const profileImage =
        settings?.profileImage || "";

    const resumeUrl =
        settings?.resumeUrl || "";


    return (
        <section
            id="home"
            className="min-h-screen flex items-center justify-center px-6 pt-20"
        >

            <div className="max-w-5xl mx-auto text-center">


                {/* -------------------------------- */}
                {/* Profile Image */}
                {/* -------------------------------- */}

                {profileImage && (

                    <div className="mb-8 flex justify-center">

                        <img
                            src={profileImage}
                            alt={name}
                            className="
                                w-36
                                h-36
                                md:w-44
                                md:h-44
                                rounded-full
                                object-cover
                                border-4
                                border-white
                                shadow-xl
                            "
                        />

                    </div>

                )}


                {/* -------------------------------- */}
                {/* Greeting */}
                {/* -------------------------------- */}

                <p className="text-lg mb-4 text-gray-500">
                    Hello, I'm
                </p>


                {/* -------------------------------- */}
                {/* Name */}
                {/* -------------------------------- */}

                <h1 className="text-5xl md:text-7xl font-bold mb-6">
                    {name}
                </h1>


                {/* -------------------------------- */}
                {/* Professional Title */}
                {/* -------------------------------- */}

                <h2 className="text-2xl md:text-3xl mb-6">
                    {title}
                </h2>


                {/* -------------------------------- */}
                {/* About */}
                {/* -------------------------------- */}

                <p className="text-gray-600 max-w-2xl mx-auto mb-8 leading-7">
                    {about}
                </p>


                {/* -------------------------------- */}
                {/* Buttons */}
                {/* -------------------------------- */}

                <div className="flex flex-wrap justify-center gap-4">


                    {/* Projects */}

                    <a
                        href="#projects"
                        className="
                            px-6
                            py-3
                            rounded-lg
                            bg-black
                            text-white
                            hover:opacity-80
                            transition
                        "
                    >
                        View Projects
                    </a>


                    {/* Resume */}

                    {resumeUrl && (

                        <a
                            href={resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                                px-6
                                py-3
                                rounded-lg
                                border
                                border-black
                                hover:bg-black
                                hover:text-white
                                transition
                            "
                        >
                            View Resume
                        </a>

                    )}


                    {/* Contact */}

                    <a
                        href="#contact"
                        className="
                            px-6
                            py-3
                            rounded-lg
                            border
                            hover:bg-gray-100
                            transition
                        "
                    >
                        Contact Me
                    </a>

                </div>

            </div>

        </section>
    );
};

export default Hero;