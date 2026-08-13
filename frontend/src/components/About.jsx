import { useSettings } from "../context/SettingsContext";

const About = () => {
    const { settings } = useSettings();

    return (
        <section
            id="about"
            className="py-24 px-6"
        >
            <div className="max-w-5xl mx-auto">

                <h2 className="text-4xl font-bold mb-8">
                    About Me
                </h2>

                <p className="text-gray-600 leading-8">
                    {settings?.about ||
                        "I'm a Computer Science Engineering student and backend developer interested in building web applications, REST APIs and database-driven systems. I work primarily with JavaScript, Node.js, Express.js and MongoDB."}
                </p>

            </div>
        </section>
    );
};

export default About;