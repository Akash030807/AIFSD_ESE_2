function AIResult({ aiResult }) {

    if (!aiResult) return null;

    return (
        <div className="mt-8 bg-slate-800 p-6 rounded-xl">

            <h2 className="text-2xl font-bold mb-4">
                AI Recommendation
            </h2>

            <div className="bg-slate-700 p-4 rounded whitespace-pre-wrap">
                {aiResult}
            </div>

        </div>
    );
}

export default AIResult;