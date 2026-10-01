const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const users = require("../data/users");

const createToken = user => jwt.sign(
    {
        id: user.id,
        role: user.role
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "7d"
    }
);

const register = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            class: studentClass
        } = req.body;
        const role = "student";

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email and password are required"
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters"
            });
        }

        const existingUser = users.find(
            user => user.email.toLowerCase() === email.toLowerCase()
        );

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already registered"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            id: Date.now(),
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
            role,
            class: role === "student" ? studentClass || null : null,
            xp: 0,
            streak: 0,
            rank: null,
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        const token = createToken(newUser);

        res.status(201).json({
            success: true,
            message: "Account created successfully",
            token,
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                class: newUser.class
            }
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Registration failed"
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const user = users.find(
            user => user.email === email.toLowerCase()
        );

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const token = createToken(user);

        res.json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                class: user.class,
                xp: user.xp,
                streak: user.streak
            }
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Login failed"
        });
    }
};

const getCurrentUser = (req, res) => {
    const user = users.find(
        user => user.id === req.user.id
    );

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    res.json({
        success: true,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            class: user.class,
            xp: user.xp,
            streak: user.streak
        }
    });
};

module.exports = {
    register,
    login,
    getCurrentUser
};