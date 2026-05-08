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

const api = express();
const port = 3000;

api.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE",
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type",
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

api.use(cors());
api.use(bodyParser.json());

api.use("/university", universityRouter);
api.use("/auth", authRouter);
api.use("/lessons", lessonRouter);
api.use("/signs", signRouter);
api.use("/progress", progressRouter);
api.use("/profile", profileRouter);
api.use("/quotes", quotesRouter);
api.use("/feedback", feedbackRouter);

sequelize.sync({ alter: true }).then(() => {
  console.log("Database synced (ALTER mode)");
});

api.listen(port, () => {
  console.log(`API running on port ${port}`);
});
