import { useState } from "react";
import API from "../services/api";

function CandidateForm({ fetchCandidates }) {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        skills: "",
        experience: "",
        projectsBio: ""
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await API.post("/candidates", {
                ...formData,
                skills: formData.skills
                    .split(",")
                    .map(skill => skill.trim())
            });

            alert("Candidate Added Successfully");

            setFormData({
                name: "",
                email: "",
                skills: "",
                experience: "",
                projectsBio: ""
            });

            fetchCandidates();

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="bg-slate-800 p-6 rounded-xl">

            <h2 className="text-2xl font-bold mb-4">
                Add Candidate
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 rounded bg-slate-700"
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 rounded bg-slate-700"
                    required
                />

                <input
                    type="text"
                    name="skills"
                    placeholder="Skills (comma separated)"
                    value={formData.skills}
                    onChange={handleChange}
                    className="w-full p-3 rounded bg-slate-700"
                    required
                />

                <input
                    type="number"
                    name="experience"
                    placeholder="Experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full p-3 rounded bg-slate-700"
                    required
                />

                <textarea
                    name="projectsBio"
                    placeholder="Projects / Bio"
                    value={formData.projectsBio}
                    onChange={handleChange}
                    className="w-full p-3 rounded bg-slate-700"
                />

                <button
                    className="bg-blue-600 px-6 py-3 rounded hover:bg-blue-700"
                >
                    Add Candidate
                </button>

            </form>

        </div>
    );
}

export default CandidateForm;