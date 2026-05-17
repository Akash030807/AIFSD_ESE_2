const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const candidateRoutes = require("./src/routes/candidateRoutes");
const matchRoutes = require("./src/routes/matchRoutes");
const aiRoutes = require("./src/routes/aiRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/candidates", candidateRoutes);
app.use("/api/match", matchRoutes);
app.use("/api/ai", aiRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Candidate Shortlisting Backend Running"
    });
});

console.log("OPENROUTER KEY =>", process.env.OPENROUTER_API_KEY);

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected");
})
.catch((error) => {
    console.log("MongoDB Error:", error.message);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});