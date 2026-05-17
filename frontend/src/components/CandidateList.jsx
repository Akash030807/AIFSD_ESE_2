function CandidateList({ candidates }) {

    return (
        <div className="mt-8 bg-slate-800 p-6 rounded-xl">

            <h2 className="text-2xl font-bold mb-4">
                All Candidates
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

                {candidates.map(candidate => (

                    <div
                        key={candidate._id}
                        className="bg-slate-700 p-4 rounded"
                    >

                        <h3 className="text-xl font-bold">
                            {candidate.name}
                        </h3>

                        <p>{candidate.email}</p>

                        <p>
                            Experience: {candidate.experience} years
                        </p>

                        <div className="flex flex-wrap gap-2 mt-2">

                            {candidate.skills.map((skill, index) => (

                                <span
                                    key={index}
                                    className="bg-blue-600 px-2 py-1 rounded text-sm"
                                >
                                    {skill}
                                </span>
                            ))}

                        </div>

                    </div>
                ))}

            </div>

        </div>
    );
}

export default CandidateList;