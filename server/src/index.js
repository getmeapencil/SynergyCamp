import express from "express";
import cors from "cors";
// import apiRouter from './apps/index.js';
import dotenv from "dotenv";
import { createServer } from "http";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import session from "express-session";
import User from "./models/user.js";
import apiRouter from "./apps/index.js";
dotenv.config();

const app = express();

const server = createServer(app);
// Middleware setup
app.use(express.json());
const allowedOrigins = ["http://localhost:5173"];

app.use(
  cors({
    origin: function (origin, callback) {
      const requestOrigin = origin || "Unknown origin";
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
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use("/", apiRouter);
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ["email", "profile"],
    },
    async (accessToken, refreshToken, profile, done) => {
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

app.get("/", (req, res) => {
  res.send("Backend of MIND MESH");
});

export { app, PORT };

export default server;
