function AIResult({ aiResult }) {

    if (!aiResult || aiResult.length === 0) return null;

    return (

        <div className="mt-8 bg-slate-800 p-6 rounded-xl">

            <h2 className="text-2xl font-bold mb-4">
                AI Recommendation
            </h2>

            <div className="space-y-4">

                {aiResult.map((candidate, index) => (

                    <div
                        key={index}
                        className="bg-slate-700 p-4 rounded"
                    >

                        <h3 className="text-xl font-bold text-green-400">
                            Rank #{candidate.rank}
                        </h3>

                        <p className="mt-2">
                            <span className="font-bold">
                                Candidate:
                            </span>{" "}
                            {candidate.name}
                        </p>

                        <p className="mt-2">
                            <span className="font-bold">
                                Reason:
                            </span>{" "}
                            {candidate.reason}
                        </p>

                    </div>
                ))}

            </div>

        </div>
    );
}

export default AIResult;