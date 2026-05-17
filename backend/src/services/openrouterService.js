const axios = require("axios");

const getAIShortlist = async (job, candidates) => {

    const prompt = `
    Job Requirements:
    Required Skills: ${job.requiredSkills.join(", ")}
    Minimum Experience: ${job.minExperience}

    Candidates:
    ${candidates.map((c, index) => `
    ${index + 1}.
    Name: ${c.name}
    Skills: ${c.skills.join(", ")}
    Experience: ${c.experience}
    Bio: ${c.projectsBio}
    `).join("\n")}

    Rank candidates from best to worst.
    Explain why each candidate is suitable.
    `;

    try {

        console.log("AI API CALLED");

        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "deepseek/deepseek-chat",
                messages: [
                    {
                        role: "user",
                        content: prompt
                    }
                ]
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const cleanText = response.data.choices[0].message.content
            .replace(/#/g, "")       // Removes ALL hashes (#, ##, ###)
            .replace(/\*/g, "")      // Removes all asterisks
            .replace(/-/g, "")       // Removes bullet points and dashes
            .replace(/\n\s*\n/g, "\n") // Replaces double newlines with a single newline
            .trim();

        return cleanText;

    } catch (error) {

        console.log(
            "OpenRouter API failed:",
            error.response?.data || error.message
        );

        throw new Error("OpenRouter API failed");
    }
};

module.exports = getAIShortlist;