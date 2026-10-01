const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const assessmentRoutes = require("./routes/assessmentRoutes");
const studentRoutes = require("./routes/studentRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

const PORT = process.env.PORT || 5000;
const frontendDirectory = path.join(__dirname, "..");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(frontendDirectory, "index.html"));
});

app.get("/style.css", (req, res) => {
    res.sendFile(path.join(frontendDirectory, "style.css"));
});

app.get("/script.js", (req, res) => {
    res.sendFile(path.join(frontendDirectory, "script.js"));
});

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        status: "healthy",
        service: "LearnIQ Backend"
    });
});

app.use("/api/assessments", assessmentRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/auth", authRoutes);

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "API endpoint not found"
    });
});

app.listen(PORT, () => {
    console.log(`LearnIQ server running on http://localhost:${PORT}`);
});