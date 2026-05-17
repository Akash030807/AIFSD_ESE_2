const Candidate = require("../models/Candidate");
const getAIShortlist = require("../services/openrouterService");

exports.aiShortlist = async (req, res) => {

    try {

        const candidates = await Candidate.find();

        const response = await getAIShortlist(
            req.body,
            candidates
        );

        res.json(response);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};