import { useState } from "react";
import API from "../services/api";

function JobForm({ setMatches, setAiResult }) {

    const [jobData, setJobData] = useState({
        requiredSkills: "",
        minExperience: ""
    });

    const handleChange = (e) => {

        setJobData({
            ...jobData,
            [e.target.name]: e.target.value
        });
    };

    const handleBasicMatch = async () => {

        try {

            const response = await API.post(
                "/match",
                {
                    requiredSkills: jobData.requiredSkills
                        .split(",")
                        .map(skill => skill.trim()),

                    minExperience: Number(
                        jobData.minExperience
                    )
                }
            );

            setMatches(response.data);

        } catch (error) {

            console.log(error);

            alert("Basic matching failed");
        }
    };

    const handleAIMatch = async () => {

        try {

            setAiResult([
                {
                    rank: "...",
                    name: "Loading...",
                    reason:
                        "Generating AI recommendations..."
                }
            ]);

            const response = await API.post(
                "/ai/shortlist",
                {
                    requiredSkills: jobData.requiredSkills
                        .split(",")
                        .map(skill => skill.trim()),

                    minExperience: Number(
                        jobData.minExperience
                    )
                }
            );

            console.log(
                "AI RESPONSE =>",
                response.data
            );

            setAiResult(response.data);

        } catch (error) {

            console.log(error);

            setAiResult([
                {
                    rank: "Error",
                    name: "AI Request Failed",
                    reason:
                        "Backend or AI API error occurred."
                }
            ]);
        }
    };

    return (

        <div className="bg-slate-800 p-6 rounded-xl">

            <h2 className="text-2xl font-bold mb-4">
                Job Requirement
            </h2>

            <div className="space-y-4">

                <input
                    type="text"
                    name="requiredSkills"
                    placeholder="Required Skills"
                    value={jobData.requiredSkills}
                    onChange={handleChange}
                    className="w-full p-3 rounded bg-slate-700"
                />

                <input
                    type="number"
                    name="minExperience"
                    placeholder="Minimum Experience"
                    value={jobData.minExperience}
                    onChange={handleChange}
                    className="w-full p-3 rounded bg-slate-700"
                />

                <div className="flex gap-4">

                    <button
                        onClick={handleBasicMatch}
                        className="
                            bg-green-600
                            px-6
                            py-3
                            rounded
                            hover:bg-green-700
                        "
                    >
                        Basic Match
                    </button>

                    <button
                        onClick={handleAIMatch}
                        className="
                            bg-purple-600
                            px-6
                            py-3
                            rounded
                            hover:bg-purple-700
                        "
                    >
                        AI Match
                    </button>

                </div>

            </div>

        </div>
    );
}

export default JobForm;