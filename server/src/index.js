import express from "express";
import cors from "cors";
// import apiRouter from './apps/index.js';
import dotenv from "dotenv";
import { createServer } from "http";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import session from "express-session";
import User from "./models/user.js";
dotenv.config();

const app = express();

const server = createServer(app);
// Middleware setup
app.use(express.json());
const allowedOrigins = ["http://localhost:5173"];

app.use(
  cors({
    origin: function (origin, callback) {
      console.log("Origin: ", origin);
      const requestOrigin = origin || "Unknown origin";
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        console.log("Allowed CORS request from: ", requestOrigin);
        callback(null, true);
      } else {
        console.log(`Blocked CORS request from ${requestOrigin}`);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    credentials: true,
    allowedHeaders: ["Authorization", "Content-Type"],
    maxAge: 86400,
    maxFileSize: 1073741824, // 1 GB in bytes
    maxFieldsSize: 1073741824, // 1 GB in bytes
  })
);
// Routes setup
// app.use('/api', apiRouter);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ["email", "profile"],
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      try {
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          user = await User.create({
            name: profile.displayName,
            email: profile.email,
            picture: profile.photos[0].value,
            googleId: profile.id,
          });
        }
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  let user = await User.findById(id);
  done(null, user);
});

// Start server
const PORT = 3000;
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/login",
    successRedirect: "http://localhost:5173/dashboard",
  })
);
app.post("/logout", (req, res) => {
  console.log("I am called 1")
  req.logout((err) => {
    console.log("I am called")
  res.send("Logged out");
  console.log("err", err);
  });
});

app.get("/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
    console.log("user is as follows", req.user);
    return;
  }
  res.json({ message: "Unauthorized" });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export { app, PORT };

export default server;
