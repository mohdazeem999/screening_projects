const getTeacherDashboard = (req, res) => {
    res.json({
        success: true,
        dashboard: {
            totalStudents: 42,
            averageClassScore: 76,
            assessmentsCompleted: 128,
            studentsNeedingAttention: 8
        }
    });
};

module.exports = {
    getTeacherDashboard
};