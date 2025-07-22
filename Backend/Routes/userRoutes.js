const express = require('express');
const { signupController, loginController } = require('../Controller/userAuthController');
const userRouter = express.Router();
const upload = require("../middleware/multer"); // Re-import multer

userRouter.post("/login", loginController);

// The signup route now uses the multer middleware to handle the 'avatar' file
userRouter.post("/signup", upload.single('avatar'), signupController);

module.exports = userRouter;

