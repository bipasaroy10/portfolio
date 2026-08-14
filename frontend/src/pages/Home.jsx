import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Experience from "../components/Experience";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

import { useSettings } from "../context/SettingsContext";


const Home = () => {

    const {
        loading,
        error
    } = useSettings();


    /* =========================================
       LOADING
    ========================================= */

    if (loading) {

        return (
            <div className="min-h-screen bg-[#050507] text-white flex items-center justify-center">

                <div className="text-center">

                    <div
                        className="
                            w-10
                            h-10
                            mx-auto
                            mb-5
                            rounded-full
                            border-2
                            border-violet-500/20
                            border-t-violet-400
                            animate-spin
                        "
                    />

                    <p className="text-sm text-zinc-500">
                        Loading portfolio...
                    </p>

                </div>

            </div>
        );
    }


    /* =========================================
       ERROR
    ========================================= */

    if (error) {

        return (
            <div className="min-h-screen bg-[#050507] text-white flex items-center justify-center px-6">

                <div className="max-w-md text-center">

                    <div
                        className="
                            w-14
                            h-14
                            mx-auto
                            mb-5
                            rounded-2xl
                            bg-red-500/10
                            border
                            border-red-500/20
                            flex
                            items-center
                            justify-center
                            text-red-400
                            text-xl
                        "
                    >
                        !
                    </div>

                    <h1 className="text-2xl font-bold mb-3">
                        Unable to load portfolio
                    </h1>

                    <p className="text-zinc-500">
                        {error}
                    </p>

                </div>

            </div>
        );
    }


    return (

        <div className="portfolio-app">

            {/* =====================================
                BACKGROUND
            ===================================== */}

            <div className="portfolio-background">

                {/* Grid */}

                <div className="background-grid" />


                {/* Purple */}

                <div
                    className="
                        background-orb
                        background-orb-purple
                    "
                />


                {/* Cyan */}

                <div
                    className="
                        background-orb
                        background-orb-cyan
                    "
                />


                {/* Pink */}

                <div
                    className="
                        background-orb
                        background-orb-pink
                    "
                />

            </div>


            {/* =====================================
                CONTENT
            ===================================== */}

            <div className="content-layer">

                <Navbar />


                <main>

                    <Hero />

                    <About />

                    <Skills />

                    <Projects />

                    <Experience />

                    <Contact />

                </main>


                <Footer />

            </div>

        </div>
    );
};


export default Home;