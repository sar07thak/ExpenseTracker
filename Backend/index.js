const express = require('express');
const app = express();
const main = require('./config/db');
const cookieParser = require("cookie-parser");
const userRouter = require('./Routes/userRoutes');

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/user', userRouter);



main().then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
  });
}).catch(err => {
  console.error("Database connection failed:", err);
});