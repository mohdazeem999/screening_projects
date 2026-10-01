const express = require("express");

const {
    getQuestions,
    getQuestionById,
    submitAssessment
} = require("../controllers/assessmentController");

const router = express.Router();

router.get("/", getQuestions);
router.get("/:id", getQuestionById);
router.post("/submit", submitAssessment);

module.exports = router;