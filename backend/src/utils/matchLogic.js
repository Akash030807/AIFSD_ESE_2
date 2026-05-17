function matchCandidates(candidates, job) {

    return candidates.map(candidate => {

        const matchedSkills = candidate.skills.filter(skill =>
            job.requiredSkills.includes(skill)
        );

        const skillScore =
            matchedSkills.length / job.requiredSkills.length;

        const experienceScore =
            candidate.experience >= job.minExperience ? 1 : 0;

        const finalScore =
            (skillScore * 0.8) + (experienceScore * 0.2);

        let rank = "Low";

        if (finalScore >= 0.75) {
            rank = "High";
        } else if (finalScore >= 0.4) {
            rank = "Medium";
        }

        return {
            ...candidate._doc,
            matchedSkills,
            matchScore: Math.round(finalScore * 100),
            rank
        };

    }).sort((a, b) => b.matchScore - a.matchScore);
}

module.exports = matchCandidates;