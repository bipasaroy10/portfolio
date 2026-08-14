import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Experience from "../components/Experience";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

import { getSettings } from "../services/settingsApi";

const Home = () => {

    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const loadSettings = async () => {

            try {

                setLoading(true);
                setError("");

                const data = await getSettings();

                setSettings(data);

            } catch (error) {

                console.error(
                    "Failed to load settings:",
                    error
                );

                setError(
                    error.message ||
                    "Failed to load settings"
                );

            } finally {

                setLoading(false);

            }
        };

        loadSettings();

    }, []);


    // --------------------------------
    // Loading
    // --------------------------------

    if (loading) {

        return (
            <div className="min-h-screen flex items-center justify-center">

                <p className="text-gray-500">
                    Loading portfolio...
                </p>

            </div>
        );
    }


    // --------------------------------
    // Error
    // --------------------------------

    if (error) {

        return (
            <div className="min-h-screen flex items-center justify-center px-6">

                <div className="text-center">

                    <h2 className="text-2xl font-bold mb-2">
                        Unable to load portfolio
                    </h2>

                    <p className="text-red-500">
                        {error}
                    </p>

                </div>

            </div>
        );
    }


    return (
        <>
            <Navbar
                settings={settings}
            />

            <main>

                <Hero
                    settings={settings}
                />

                <About
                    settings={settings}
                />

                <Skills />

                <Projects />

                <Experience />

                <Contact
                    settings={settings}
                />

            </main>

            <Footer
                settings={settings}
            />

        </>
    );
};

export default Home;