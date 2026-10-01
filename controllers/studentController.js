const getStudentProfile = (req, res) => {
    res.json({
        success: true,
        student: {
            id: 1,
            name: "Alex",
            class: 10,
            xp: 2480,
            streak: 12,
            rank: 7,
            progress: 78
        }
    });
};

const getStudentProgress = (req, res) => {
    res.json({
        success: true,
        progress: {
            overall: 78,
            conceptMastery: 82,
            problemSolving: 74,
            consistency: 91,
            improvement: 86
        }
    });
};

module.exports = {
    getStudentProfile,
    getStudentProgress
};