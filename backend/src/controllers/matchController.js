const Candidate = require("../models/Candidate");
const matchCandidates = require("../utils/matchLogic");

exports.shortlistCandidates = async (req, res) => {

    try {

        const candidates = await Candidate.find();

        const results = matchCandidates(candidates, req.body);

        res.json(results);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};