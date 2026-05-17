const axios = require("axios");

const getAIShortlist = async (job, candidates) => {
    // 1. UPDATE THE PROMPT: Give it a strict JSON schema
    const prompt = `
    Job Requirements:
    Required Skills: ${job.requiredSkills.join(", ")}
    Minimum Experience: ${job.minExperience}

    Candidates:
    ${candidates.map((c, index) => `
    Name: ${c.name} | Skills: ${c.skills.join(", ")} | Exp: ${c.experience} | Bio: ${c.projectsBio}
    `).join("\n")}

    Rank the candidates from best to worst based on the job requirements.
    
    CRITICAL INSTRUCTION: You must respond ONLY with a raw JSON array. Do not include any markdown formatting, conversational text, or introductions. Use this exact JSON structure:
    [
      {
        "rank": 1,
        "name": "Candidate Name",
        "reason": "Why they are suitable or unsuitable."
      }
    ]
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
                ],
                // 2. TELL OPENROUTER TO EXPECT JSON (If the model supports it)
                response_format: { type: "json_object" } 
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        let rawContent = response.data.choices[0].message.content;
        
        // 3. THE EXTRACTION TRICK: Find the array brackets even if there is text around it
        // This regex looks for the first '[' and the last ']' and grabs everything in between
        const jsonMatch = rawContent.match(/\[\s*\{[\s\S]*\}\s*\]/);

        if (!jsonMatch) {
            console.error("AI did not return a recognizable JSON array:", rawContent);
            throw new Error("Failed to parse AI response into JSON");
        }

        // Parse the extracted string into a real JavaScript array
        const aiShortlist = JSON.parse(jsonMatch[0]);

        return aiShortlist;

    } catch (error) {
        console.log(
            "OpenRouter API failed:",
            error.response?.data || error.message
        );
        throw new Error("OpenRouter API failed");
    }
};

module.exports = getAIShortlist;