const User = require("../models/UserModel");
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signupController = async (req, res) => {
    try {
        console.log("🔥 Received body:", req.body);
        console.log("🖼️ Received file:", req.file); // This will be populated by Multer

        const { fullName, email, password } = req.body;

        if (!email || !password || !fullName) {
            return res.status(400).json({ message: "Full name, email, and password are required" });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }
        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ message: "Password is not strong enough" });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "This email address is already in use" });
        }

        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);

        // --- CHANGE: Save the file path from Multer ---
        const newUser = await User.create({
            name: fullName,
            email,
            password: encryptedPassword,
            // If a file was uploaded by multer, store its path. Otherwise, null.
            avatar: req.file ? req.file.path : null,
        });

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 3600000,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production'
        });

        return res.status(201).json({
            message: "User created successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                avatar: newUser.avatar
            }
        });
    } catch (err) {
        console.error("Signup error:", err);
        res.status(500).json({ message: "An internal server error occurred" });
    }
};

const loginController = async (req, res) => {
    // No changes are needed for the login controller.
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 3600000,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production'
        });
        return res.status(200).json({
            message: "Login successful",
            user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar }
        });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "An internal server error occurred" });
    }
};

module.exports = {
    signupController,
    loginController
};
