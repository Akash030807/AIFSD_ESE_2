function MatchResults({ matches }) {

    if (!matches.length) return null;

    return (
        <div className="mt-8 bg-slate-800 p-6 rounded-xl">

            <h2 className="text-2xl font-bold mb-4">
                Match Results
            </h2>

            <div className="space-y-4">

                {matches.map(candidate => (

                    <div
                        key={candidate._id}
                        className="bg-slate-700 p-4 rounded"
                    >

                        <h3 className="text-xl font-bold">
                            {candidate.name}
                        </h3>

                        <p>
                            Match Score: {candidate.matchScore}%
                        </p>

                        <p>
                            Rank: {candidate.rank}
                        </p>

                        <p>
                            Matched Skills:
                            {
                                candidate.matchedSkills.join(", ")
                            }
                        </p>

                    </div>
                ))}

            </div>

        </div>
    );
}

export default MatchResults