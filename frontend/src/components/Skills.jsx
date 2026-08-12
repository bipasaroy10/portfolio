import { useEffect, useState } from "react";

import { getSkills } from "../services/api";

const Skills = () => {

    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadSkills = async () => {

            try {

                const response = await getSkills();

                if (response.success) {
                    setSkills(response.data);
                }

            } catch (error) {

                console.error(
                    "Failed to load skills:",
                    error
                );

            } finally {

                setLoading(false);

            }
        };

        loadSkills();

    }, []);


    return (
        <section
            id="skills"
            className="py-24 px-6 bg-gray-50"
        >

            <div className="max-w-6xl mx-auto">

                <h2 className="text-4xl font-bold mb-12">
                    Skills
                </h2>


                {loading ? (

                    <p>Loading skills...</p>

                ) : (

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                        {skills.map((skill) => (

                            <div
                                key={skill._id}
                                className="bg-white p-6 rounded-xl border"
                            >

                                <h3 className="font-semibold">
                                    {skill.name}
                                </h3>

                                <p className="text-sm text-gray-500">
                                    {skill.category}
                                </p>

                                <p className="text-sm mt-2">
                                    {skill.level}
                                </p>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </section>
    );
};

export default Skills;