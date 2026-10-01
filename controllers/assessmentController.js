const questionBank = require("../data/questionBank");

const questionWithoutAnswer = ({ correctAnswer, ...question }) => question;

// Get all questions
const getQuestions = (req, res) => {
    res.json({
        success: true,
        count: questionBank.length,
        questions: questionBank.map(questionWithoutAnswer)
    });
};

// Get question by ID
const getQuestionById = (req, res) => {
    const id = Number(req.params.id);

    const question = questionBank.find(q => q.id === id);

    if (!question) {
        return res.status(404).json({
            success: false,
            message: "Question not found"
        });
    }

    res.json({
        success: true,
        question: questionWithoutAnswer(question)
    });
};

// Submit assessment
const submitAssessment = (req, res) => {
    const { answers } = req.body;

    if (!Array.isArray(answers)) {
        return res.status(400).json({
            success: false,
            message: "Answers must be an array"
        });
    }

    let score = 0;
    const mistakes = [];

    for (const answer of answers) {
        const question = questionBank.find(
            q => q.id === Number(answer.questionId)
        );

        if (!question) {
            return res.status(400).json({
                success: false,
                message: `Unknown question: ${answer.questionId}`
            });
        }

        if (!question.options.includes(answer.selectedAnswer)) {
            return res.status(400).json({
                success: false,
                message: `Invalid answer for question ${question.id}`
            });
        }

        if (answer.selectedAnswer === question.correctAnswer) {
            score++;
        } else {
            mistakes.push({
                questionId: question.id,
                topic: question.topic,
                difficulty: question.difficulty,
                selectedAnswer: answer.selectedAnswer,
                correctAnswer: question.correctAnswer
            });
        }
    }

    const total = answers.length;
    const percentage = total > 0
        ? Math.round((score / total) * 100)
        : 0;

    res.json({
        success: true,
        result: {
            score,
            total,
            percentage,
            mistakes
        }
    });
};

module.exports = {
    getQuestions,
    getQuestionById,
    submitAssessment
};