const express = require('express');
const { signupController, loginController, getUserInfoController , logoutController } = require('../Controller/userAuthController');
const userRouter = express.Router();
const upload = require("../middleware/multer");
const Protect = require('../middleware/isAuth');

userRouter.post("/login", loginController);
userRouter.post("/signup", upload.single('avatar'), signupController);
userRouter.get("/getUser", Protect, getUserInfoController);
userRouter.get("/logout", logoutController)


module.exports = userRouter;

