const User = require("../models/UserModel");
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const signupController = async (req, res) => {
    try {
        console.log("🔥 Received body:", req.body);
        const { name, email, password } = req.body;

        if (!email || !password || !name) {
            return res.status(400).json({ message: "Input fields are required" });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }
        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ message: "Password must be strong" });
        }

        // Check if user already exists (important to prevent duplication)
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "Email already in use" });
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            password: encryptedPassword,
            email
        });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // ✅ cookie set before sending JSON response
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 3600000, // 1 hour
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production' // only in https for prod
        });

        // ✅ now send JSON response
        return res.status(201).json({
            message: "User created successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (err) {
        console.error("Signup error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}


const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 3600000, // 1 hour
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production' // only in https for prod
        });

        return res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}


module.exports = {
    loginController,
    signupController
}