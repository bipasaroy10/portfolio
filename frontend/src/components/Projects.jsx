import { useEffect, useState } from "react";
import { getProjects } from "../services/api";

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadProjects = async () => {
            try {
                const response = await getProjects();

                if (response.success) {
                    setProjects(response.data);
                } else {
                    setError("Failed to load projects");
                }
            } catch (error) {
                console.error(error);
                setError("Unable to connect to server");
            } finally {
                setLoading(false);
            }
        };

        loadProjects();
    }, []);

    return (
        <section
            id="projects"
            className="py-24 px-6"
        >
            <div className="max-w-6xl mx-auto">

                <div className="mb-12">
                    <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                        My Work
                    </p>

                    <h2 className="text-4xl md:text-5xl font-bold mt-2">
                        Projects
                    </h2>

                    <p className="text-gray-600 mt-4 max-w-2xl">
                        Here are some of the projects I have built while
                        learning and working with modern web technologies.
                    </p>
                </div>

                {loading && (
                    <p className="text-gray-500">
                        Loading projects...
                    </p>
                )}

                {error && (
                    <p className="text-red-500">
                        {error}
                    </p>
                )}

                {!loading && !error && projects.length === 0 && (
                    <p className="text-gray-500">
                        No projects available.
                    </p>
                )}

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {projects.map((project) => (
                        <article
                            key={project._id}
                            className="group border rounded-2xl overflow-hidden bg-white hover:shadow-xl transition duration-300"
                        >

                            {/* Project Image */}
                            <div className="h-48 bg-gray-100 overflow-hidden">

                                {project.image ? (
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <span className="text-gray-400">
                                            Project Preview
                                        </span>
                                    </div>
                                )}

                            </div>

                            {/* Project Content */}
                            <div className="p-6">

                                <div className="flex items-start justify-between gap-4">

                                    <h3 className="text-xl font-bold">
                                        {project.title}
                                    </h3>

                                    {project.featured && (
                                        <span className="text-xs px-2 py-1 rounded-full bg-gray-100">
                                            Featured
                                        </span>
                                    )}

                                </div>

                                <p className="text-gray-600 mt-3 line-clamp-3">
                                    {project.description}
                                </p>

                                {/* Technologies */}
                                <div className="flex flex-wrap gap-2 mt-5">

                                    {project.technologies?.map(
                                        (technology, index) => (
                                            <span
                                                key={index}
                                                className="text-xs px-3 py-1 rounded-full border bg-gray-50"
                                            >
                                                {technology}
                                            </span>
                                        )
                                    )}

                                </div>

                                {/* Links */}
                                <div className="flex gap-3 mt-6">

                                    {project.github && (
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-4 py-2 rounded-lg bg-black text-white text-sm"
                                        >
                                            GitHub
                                        </a>
                                    )}

                                    {project.liveDemo && (
                                        <a
                                            href={project.liveDemo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-4 py-2 rounded-lg border text-sm"
                                        >
                                            Live Demo
                                        </a>
                                    )}

                                </div>

                            </div>

                        </article>
                    ))}

                </div>

            </div>
        </section>
    );
};

export default Projects;