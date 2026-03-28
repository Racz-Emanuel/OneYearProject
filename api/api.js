import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import authRouter from "./router/authRouter.js";
import universityRouter from "./router/universityRouter.js";

const api = express();
const port = 3000;

api.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE",
  );
  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type",
  );
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);
  // Pass to next layer of middleware
  next();
});

// Middleware
api.use(cors()); // permite request-uri cross-origin
api.use(bodyParser.json()); // parsează JSON-ul din request body

// Rutele API
api.use("/university", universityRouter);
api.use("/auth", authRouter);

// Pornește serverul
api.listen(port, () => {
  console.log(`API running on port ${port}`);
});
