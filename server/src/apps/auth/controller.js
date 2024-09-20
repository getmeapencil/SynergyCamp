import { OAuth2Client } from "google-auth-library";
import { randomBytes } from "crypto";
import JWT from "jsonwebtoken";
import { UserModel } from "../../models/user.js";
import dotenv from "dotenv";
dotenv.config();

const oauthClient = new OAuth2Client(process.env.CLIENT_ID, process.env.CLIENT_SECRET, "postmessage");
const COOKIE_AGE = 14 * 24 * 60 * 60 * 1000;
const DOMAIN = process.env.DOMAIN || "localhost";

export const googleAuth = async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) return res.status(400).json({ message: "Missing authorization code" });

    const { tokens } = await oauthClient.getToken(code);
    if (!tokens.id_token) {
      res.status(400).json({ message: "Missing ID token" });
      return;
    }

    const ticket = await oauthClient.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.CLIENT_ID,
    });
    const { email, name, picture } = ticket.getPayload();
    const user = await UserModel.findOneAndUpdate(
      { email: email.toLowerCase() },
      {
        email: email.toLowerCase(),
        name,
        picture,
      },
      { new: true, upsert: true },
    );

    const { accessToken, refreshToken } = await generateToken(user);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: COOKIE_AGE,
      domain: DOMAIN,
      sameSite: "None",
    });

    return res.status(200).json({
      accessToken,
      user,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
};

const generateToken = async (user) => {
  let payload = { email: user?.email, id: user?._id };

  const accessToken = JWT.sign(payload, process.env.SESSION_SECRET, {
    expiresIn: "7d",
  });

  // change refresh token on every login
  const refreshToken = randomBytes(32).toString("hex");
  user.refreshToken = refreshToken;
  await user.save();

  return { accessToken, refreshToken };
};

export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (refreshToken) {
      const user = await UserModel.findOneAndUpdate({ refreshToken }, { refreshToken: "" });

      if (!user) {
        return res.status(401).json({ message: "UserModel not found" });
      }
    }

    res.clearCookie("refreshToken", {
      httpOnly: true,
      domain: DOMAIN,
      sameSite: "lax",
    });
    return res.status(200).json({ message: "Logout successful" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "Your session has expired. Please login again" });
    }

    const user = await UserModel.findOne({ refreshToken });

    if (!user) {
      return res.status(401).json({ message: "Your session has expired. Please login again" });
    }

    const { accessToken, refreshToken: newRefreshToken } = await generateToken(user);
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: COOKIE_AGE,
      domain: DOMAIN,
      sameSite: "None",
    });

    return res.status(200).json({
      accessToken,
      user,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
};
