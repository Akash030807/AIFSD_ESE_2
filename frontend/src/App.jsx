import { useEffect, useState } from "react";
import API from "./services/api";

import CandidateForm from "./components/CandidateForm";
import CandidateList from "./components/CandidateList";
import JobForm from "./components/JobForm";
import MatchResults from "./components/MatchResults";
import AIResult from "./components/AIResult";

function App() {

    const [candidates, setCandidates] = useState([]);
    const [matches, setMatches] = useState([]);
    const [aiResult, setAiResult] = useState("");

    const fetchCandidates = async () => {

        try {

            const response = await API.get("/candidates");

            setCandidates(response.data);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCandidates();
    }, []);

    return (
        <div className="min-h-screen bg-slate-900 text-white p-6">

            <h1 className="text-4xl font-bold text-center mb-8">
                Candidate Shortlisting System
            </h1>

            <div className="grid md:grid-cols-2 gap-6">

                <CandidateForm fetchCandidates={fetchCandidates} />

                <JobForm
                    setMatches={setMatches}
                    setAiResult={setAiResult}
                />

            </div>

            <CandidateList candidates={candidates} />

            <MatchResults matches={matches} />

            <AIResult aiResult={aiResult} />

        </div>
    );
}

export default App;