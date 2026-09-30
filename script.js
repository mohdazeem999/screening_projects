// ==========================================
// LEARNIQ - MAIN JAVASCRIPT
// ==========================================


// ==========================================
// PAGE NAVIGATION
// ==========================================

function showPage(pageId) {

    // Hide all pages
    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    // Show selected page
    const selectedPage = document.getElementById(pageId);

    if (selectedPage) {
        selectedPage.classList.add("active");
    }

    // Update sidebar navigation
    document.querySelectorAll(".nav-item").forEach(item => {
        item.classList.remove("active");
    });

    // Close mobile sidebar
    const sidebar = document.querySelector(".sidebar");

    if (sidebar) {
        sidebar.classList.remove("open");
    }

    // Start assessment when opened
    if (pageId === "assessment") {
        startAssessment();
    }
}


// ==========================================
// MOBILE SIDEBAR
// ==========================================

function toggleSidebar() {

    const sidebar = document.querySelector(".sidebar");

    if (sidebar) {
        sidebar.classList.toggle("open");
    }
}


// ==========================================
// TOAST MESSAGE
// ==========================================

function showToast(message) {

    const toast = document.getElementById("toast");

    if (!toast) return;

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}


// ==========================================
// QUESTION BANK
// ==========================================

const questionBank = [

    {
        id: 1,
        topic: "Linear Equations",
        difficulty: "Easy",

        question: "Solve: 3x + 7 = 22",

        options: [
            "x = 3",
            "x = 5",
            "x = 7",
            "x = 9"
        ],

        answer: 1
    },

    {
        id: 2,
        topic: "Linear Equations",
        difficulty: "Medium",

        question: "Solve: 5x - 10 = 20",

        options: [
            "x = 4",
            "x = 5",
            "x = 6",
            "x = 8"
        ],

        answer: 2
    },

    {
        id: 3,
        topic: "Fractions",
        difficulty: "Easy",

        question: "What is 1/2 + 1/4?",

        options: [
            "1/4",
            "2/4",
            "3/4",
            "4/4"
        ],

        answer: 2
    },

    {
        id: 4,
        topic: "Fractions",
        difficulty: "Medium",

        question: "What is 3/4 × 2/3?",

        options: [
            "1/2",
            "2/3",
            "3/4",
            "1"
        ],

        answer: 0
    },

    {
        id: 5,
        topic: "Algebra",
        difficulty: "Easy",

        question: "If x = 4, what is 2x + 3?",

        options: [
            "7",
            "9",
            "11",
            "12"
        ],

        answer: 2
    },

    {
        id: 6,
        topic: "Geometry",
        difficulty: "Easy",

        question: "How many degrees are in a triangle?",

        options: [
            "90°",
            "180°",
            "270°",
            "360°"
        ],

        answer: 1
    },

    {
        id: 7,
        topic: "Algebra",
        difficulty: "Medium",

        question: "Simplify: 3x + 2x",

        options: [
            "5",
            "5x",
            "6x",
            "x"
        ],

        answer: 1
    },

    {
        id: 8,
        topic: "Geometry",
        difficulty: "Medium",

        question:
            "What is the area of a rectangle with length 8 cm and width 5 cm?",

        options: [
            "13 cm²",
            "26 cm²",
            "40 cm²",
            "45 cm²"
        ],

        answer: 2
    },

    {
        id: 9,
        topic: "Linear Equations",
        difficulty: "Hard",

        question: "Solve: 2(x + 3) = 14",

        options: [
            "x = 3",
            "x = 4",
            "x = 5",
            "x = 6"
        ],

        answer: 1
    },

    {
        id: 10,
        topic: "Algebra",
        difficulty: "Hard",

        question: "If 4x - 8 = 16, what is x?",

        options: [
            "4",
            "5",
            "6",
            "8"
        ],

        answer: 2
    }

];


// ==========================================
// ASSESSMENT VARIABLES
// ==========================================

let currentQuestion = 0;

let score = 0;

let selectedAnswer = null;

let answers = [];

let assessmentStarted = false;


// ==========================================
// START ASSESSMENT
// ==========================================

function startAssessment() {

    // Prevent restarting every time unnecessarily
    if (assessmentStarted) {
        return;
    }

    currentQuestion = 0;

    score = 0;

    selectedAnswer = null;

    answers = [];

    assessmentStarted = true;

    loadQuestion();
}


// ==========================================
// LOAD QUESTION
// ==========================================

function loadQuestion() {

    const question = questionBank[currentQuestion];

    if (!question) {
        finishAssessment();
        return;
    }


    // Topic
    const title =
        document.getElementById("quizTitle");

    if (title) {
        title.textContent = question.topic;
    }


    // Question
    const questionText =
        document.getElementById("questionText");

    if (questionText) {
        questionText.textContent =
            question.question;
    }


    // Question number
    const questionIndex =
        document.getElementById("questionIndex");

    if (questionIndex) {
        questionIndex.textContent =
            String(currentQuestion + 1).padStart(2, "0");
    }


    // Progress text
    const questionNumber =
        document.getElementById("questionNumber");

    if (questionNumber) {

        questionNumber.textContent =
            `Question ${currentQuestion + 1} of ${questionBank.length}`;
    }


    // Score
    const scoreDisplay =
        document.getElementById("scoreDisplay");

    if (scoreDisplay) {

        scoreDisplay.textContent =
            `Score: ${score}`;
    }


    // Progress bar
    const progress =
        ((currentQuestion + 1) /
            questionBank.length) * 100;

    const progressBar =
        document.getElementById("quizProgressFill");

    if (progressBar) {

        progressBar.style.width =
            `${progress}%`;
    }


    // Answer container
    const container =
        document.getElementById("answerContainer");

    if (!container) return;

    container.innerHTML = "";


    // Create answer buttons
    question.options.forEach((option, index) => {

        const button =
            document.createElement("button");

        button.className =
            "answer-option";

        button.innerHTML = `

            <span class="answer-letter">
                ${String.fromCharCode(65 + index)}
            </span>

            <span>
                ${option}
            </span>

        `;

        button.addEventListener(
            "click",
            () => selectAnswer(index)
        );

        container.appendChild(button);

    });


    selectedAnswer = null;


    // Adaptive message
    const message =
        document.getElementById("adaptiveMessage");

    if (message) {

        message.textContent =
            "Choose an answer. Your next question will adapt to your performance.";
    }

}


// ==========================================
// SELECT ANSWER
// ==========================================

function selectAnswer(index) {

    const question =
        questionBank[currentQuestion];

    if (!question) return;


    selectedAnswer = index;


    // Remove previous selection
    const buttons =
        document.querySelectorAll(
            ".answer-option"
        );

    buttons.forEach(button => {

        button.classList.remove("selected");

        button.classList.remove("correct");

        button.classList.remove("incorrect");

    });


    // Highlight selected answer
    if (buttons[index]) {

        buttons[index].classList.add(
            "selected"
        );

    }


    // Check answer
    const isCorrect =
        index === question.answer;


    // Save result
    answers.push({

        questionId: question.id,

        topic: question.topic,

        difficulty: question.difficulty,

        selectedAnswer: index,

        correctAnswer: question.answer,

        correct: isCorrect

    });


    if (isCorrect) {

        score += 10;


        if (buttons[index]) {

            buttons[index].classList.add(
                "correct"
            );

        }


        const message =
            document.getElementById(
                "adaptiveMessage"
            );

        if (message) {

            message.textContent =
                "Correct! Your performance is improving.";
        }


        showToast("Correct answer! +10 XP");

    }

    else {

        if (buttons[index]) {

            buttons[index].classList.add(
                "incorrect"
            );

        }


        const message =
            document.getElementById(
                "adaptiveMessage"
            );

        if (message) {

            message.textContent =
                `Incorrect. This may indicate a gap in ${question.topic}.`;
        }


        showToast(
            `Learning gap detected: ${question.topic}`
        );

    }


    // Update score
    const scoreDisplay =
        document.getElementById(
            "scoreDisplay"
        );

    if (scoreDisplay) {

        scoreDisplay.textContent =
            `Score: ${score}`;

    }

}


// ==========================================
// NEXT QUESTION
// ==========================================

function nextQuestion() {

    if (selectedAnswer === null) {

        showToast(
            "Please select an answer first."
        );

        return;
    }


    currentQuestion++;


    if (
        currentQuestion >=
        questionBank.length
    ) {

        finishAssessment();

        return;
    }


    loadQuestion();

}


// ==========================================
// FINISH ASSESSMENT
// ==========================================

function finishAssessment() {

    const totalQuestions =
        questionBank.length;

    const percentage =
        Math.round(
            (score /
                (totalQuestions * 10)) *
            100
        );


    // Find weak topics
    const topicStats = {};


    answers.forEach(answer => {

        if (!topicStats[answer.topic]) {

            topicStats[answer.topic] = {

                total: 0,

                correct: 0,

                mistakes: 0

            };

        }


        topicStats[answer.topic].total++;


        if (answer.correct) {

            topicStats[answer.topic].correct++;

        }

        else {

            topicStats[answer.topic].mistakes++;

        }

    });


    // Find weakest topic
    let weakestTopic = "None";

    let highestMistakes = 0;


    Object.entries(topicStats).forEach(
        ([topic, data]) => {

            if (
                data.mistakes >
                highestMistakes
            ) {

                highestMistakes =
                    data.mistakes;

                weakestTopic =
                    topic;

            }

        }
    );


    // Change quiz heading
    const title =
        document.getElementById(
            "quizTitle"
        );

    if (title) {

        title.textContent =
            "Assessment Complete";

    }


    // Change main question
    const questionText =
        document.getElementById(
            "questionText"
        );

    if (questionText) {

        questionText.textContent =
            `You scored ${percentage}%`;

    }


    // Change question number
    const questionIndex =
        document.getElementById(
            "questionIndex"
        );

    if (questionIndex) {

        questionIndex.textContent =
            "✓";

    }


    // Progress text
    const questionNumber =
        document.getElementById(
            "questionNumber"
        );

    if (questionNumber) {

        questionNumber.textContent =
            "Assessment Finished";

    }


    // Score
    const scoreDisplay =
        document.getElementById(
            "scoreDisplay"
        );

    if (scoreDisplay) {

        scoreDisplay.textContent =
            `Score: ${score}`;

    }


    // Results
    const container =
        document.getElementById(
            "answerContainer"
        );

    if (container) {

        container.innerHTML = `

            <div class="assessment-result">

                <h3>
                    🧠 Learning Intelligence
                </h3>

                <p>
                    LearnIQ analyzed your assessment performance.
                </p>

                <div class="result-stat">

                    <strong>
                        ${percentage}%
                    </strong>

                    <span>
                        Overall Score
                    </span>

                </div>


                <div class="result-stat">

                    <strong>
                        ${weakestTopic}
                    </strong>

                    <span>
                        Recommended Focus Area
                    </span>

                </div>


                <div class="result-stat">

                    <strong>
                        ${highestMistakes}
                    </strong>

                    <span>
                        Mistakes Detected
                    </span>

                </div>

            </div>

        `;

    }


    // Recommendation
    const message =
        document.getElementById(
            "adaptiveMessage"
        );

    if (message) {

        if (weakestTopic !== "None") {

            message.textContent =
                `Recommended: practice ${weakestTopic} before attempting advanced questions.`;

        }

        else {

            message.textContent =
                "Excellent! You demonstrated strong understanding.";

        }

    }


    showToast(
        "Assessment analysis complete!"
    );


    // Allow new assessment
    assessmentStarted = false;

}


// ==========================================
// REDEEM REWARD
// ==========================================

let xp = 2480;


function redeemReward(cost) {

    if (xp < cost) {

        showToast(
            "Not enough XP to redeem this reward."
        );

        return;
    }


    xp -= cost;


    const xpElement =
        document.querySelector(
            ".xp-value"
        );


    if (xpElement) {

        xpElement.textContent =
            xp.toLocaleString();

    }


    showToast(
        "Reward redeemed successfully!"
    );

}


// ==========================================
// LOGOUT
// ==========================================

function logout() {

    showToast(
        "Logout functionality will be connected later."
    );

}


// ==========================================
// INITIALIZATION
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        // Initialize assessment data
        assessmentStarted = false;

    }
);