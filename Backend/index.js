const express = require('express');
const app = express();
const main = require('./config/db');
const cookieParser = require("cookie-parser");
const userRouter = require('./Routes/userRoutes');
const cors = require("cors");

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());

// Routes
app.use('/api/user', userRouter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Start
main().then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
  });
}).catch(err => {
  console.error("Database connection failed:", err);
});
