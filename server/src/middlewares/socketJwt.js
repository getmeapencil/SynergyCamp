import { UserModel } from "../models/user.js";
import JWT from "jsonwebtoken";

/** Socket middleware to check jwt token */
export default async function checkJwtSocketMiddleware(socket, next) {
  const token = socket.handshake.query.token;

  if (!token) {
    return next(new Error("Authentication error"));
  }

  try {
    const decoded = await JWT.verify(token, process.env.SESSION_SECRET);
    if (!decoded) {
      return next(new Error("Authentication error"));
    }
    const user = await UserModel.findOne({ email: decoded.email });
    if (!user) {
      throw new Error("User not found");
    }
    socket.user = user;
    socket.join(user._id.toString());
    return next();
  } catch (err) {
    console.error(err.message);
    return next(new Error("Authentication error"));
  }
}
