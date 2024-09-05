import express from "express";
import cors from "cors";
import { createServer } from "http";
import passport from "passport";
import session from "express-session";
import apiRouter from "./apps/index.js";
import dotenv from "dotenv";
import "./passport.js";

dotenv.config();

const app = express();

const server = createServer(app);

// Middleware setup
app.use(express.json());
const allowedOrigins = [process.env.FRONTEND_URL];
app.use(
  cors({
    origin: function (origin, callback) {
      // const requestOrigin = origin || "Unknown origin";
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    credentials: true,
    allowedHeaders: ["Authorization", "Content-Type"],
    maxAge: 86400,
    maxFileSize: 1073741824, // 1 GB in bytes
    maxFieldsSize: 1073741824, // 1 GB in bytes
  }),
);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/", apiRouter);

app.get("/auth/google", passport.authenticate("google", { scope: ["email", "profile"] }));
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.FRONTEND_URL}/login`,
    successRedirect: `${process.env.FRONTEND_URL}/dashboard`,
  }),
);
app.get("/", (req, res) => {
  res.send("🤔 Wait... am I just a line of code in someone else's project? Is anything real?");
});

export { app };

export default server;
