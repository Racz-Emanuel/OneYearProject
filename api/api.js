import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { sequelize } from "./database/db.js";

import authRouter from "./router/authRouter.js";
import universityRouter from "./router/universityRouter.js";
import lessonRouter from "./router/lessonRouter.js";
import signRouter from "./router/signRouter.js";
import progressRouter from "./router/progressRouter.js";
import profileRouter from "./router/profileRouter.js";
import quotesRouter from "./router/quotesRouter.js";
import feedbackRouter from "./router/feedbackRouter.js";
import { authenticateToken } from "./middleware/authMiddleware.js";

const api = express();
const port = 3000;

// 1. UPDATED CORS CONFIGURATION
// Your custom middleware below it was missing 'Authorization' in Access-Control-Allow-Headers.
// Because you're using the 'cors' library, it's cleaner and safer to let it handle everything, including the Authorization header.
api.use(
  cors({
    origin: "*",
    methods: "GET, POST, OPTIONS, PUT, PATCH, DELETE",
    allowedHeaders: "X-Requested-With,content-type,Authorization", // Crucial for JWT!
    credentials: true,
  }),
);

api.use(bodyParser.json());

// 2. PUBLIC ROUTES
// Anyone can hit these endpoints without a token
api.use("/auth", authRouter);
api.use("/university", universityRouter);
api.use("/quotes", quotesRouter);

// 3. PROTECTED ROUTES (Linked via Middleware)
// By injecting `authenticateToken` right here, every single route inside these routers
// automatically becomes protected. The frontend MUST provide a valid JWT to access them.
api.use("/profile", authenticateToken, profileRouter);
api.use("/progress", authenticateToken, progressRouter);
api.use("/lessons", authenticateToken, lessonRouter);
api.use("/signs", authenticateToken, signRouter);
api.use("/feedback", authenticateToken, feedbackRouter);

// Database Sync
sequelize.sync({ alter: true }).then(() => {
  console.log("Database synced (ALTER mode)");
});

api.listen(port, () => {
  console.log(`API running on port ${port}`);
});
