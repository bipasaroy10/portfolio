import { useEffect, useState } from "react";
import { getExperience } from "../services/api";

const Experience = () => {
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadExperience = async () => {
            try {
                const response = await getExperience();

                console.log("Experience API response:", response);

                if (response.success) {
                    setExperiences(response.data);
                } else {
                    setError("Failed to load experience");
                }
            } catch (error) {
                console.error("Experience error:", error);
                setError("Unable to connect to server");
            } finally {
                setLoading(false);
            }
        };

        loadExperience();
    }, []);

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric"
        });
    };

    return (
        <section
            id="experience"
            className="py-24 px-6 bg-gray-50"
        >
            <div className="max-w-5xl mx-auto">

                <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                    Career
                </p>

                <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-12">
                    Experience
                </h2>

                {loading && (
                    <p>Loading experience...</p>
                )}

                {error && (
                    <p className="text-red-500">
                        {error}
                    </p>
                )}

                {!loading &&
                    !error &&
                    experiences.length === 0 && (
                        <p className="text-gray-500">
                            No experience available.
                        </p>
                    )}

                <div className="space-y-8">

                    {experiences.map((experience) => (
                        <article
                            key={experience._id}
                            className="bg-white border rounded-2xl p-6 md:p-8"
                        >

                            <div className="flex flex-col md:flex-row md:justify-between gap-4">

                                <div>

                                    <h3 className="text-2xl font-bold">
                                        {experience.position}
                                    </h3>

                                    <p className="text-lg mt-1">
                                        {experience.company}
                                    </p>

                                    {experience.location && (
                                        <p className="text-gray-500 text-sm mt-1">
                                            {experience.location}
                                        </p>
                                    )}

                                </div>

                                <div className="text-sm text-gray-500">

                                    {formatDate(
                                        experience.startDate
                                    )}

                                    {" - "}

                                    {experience.currentlyWorking
                                        ? "Present"
                                        : formatDate(
                                            experience.endDate
                                        )}

                                </div>

                            </div>

                            <p className="text-gray-600 leading-7 mt-6">
                                {experience.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-6">

                                {experience.technologies?.map(
                                    (technology, index) => (
                                        <span
                                            key={index}
                                            className="text-xs px-3 py-1 rounded-full border"
                                        >
                                            {technology}
                                        </span>
                                    )
                                )}

                            </div>

                        </article>
                    ))}

                </div>

            </div>
        </section>
    );
};

export default Experience;