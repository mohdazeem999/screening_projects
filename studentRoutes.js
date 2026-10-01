const express = require("express");

const {
    getStudentProfile,
    getStudentProgress
} = require("../controllers/studentController");

const {
    protect,
    authorize
} = require("../middleware/authMiddleware");

const router = express.Router();

router.get(
    "/profile",
    protect,
    authorize("student"),
    getStudentProfile
);

router.get(
    "/progress",
    protect,
    authorize("student"),
    getStudentProgress
);

module.exports = router;