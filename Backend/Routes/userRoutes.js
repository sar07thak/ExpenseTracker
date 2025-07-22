const express = require('express');
const { signupController, loginController } = require('../Controller/userAuthController');
const userRouter = express.Router();


userRouter.post("/login" , loginController);
userRouter.post("/signup" , signupController);  

module.exports = userRouter;