import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export default async function (req, res, next) {
  console.log("checkJwtMiddleware is running");

  if (!req.headers.authorization) {
    console.log("Missing authorization header");
    return res.status(401).send({
      message: "It looks like your login session has expired. Please log out and login again.",
    });
  }

  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    console.log("Missing token");
    return res.status(401).send({
      message: "It looks like your login session has expired. Please log out and login again.",
    });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.SESSION_SECRET);
  } catch (e) {
    console.log("Error decoding the token: ", e.message);
    return res.status(401).send({
      message: "It looks like your login session has expired. Please log out and login again.",
    });
  }

  // Add this check
  if (!decoded) {
    console.log("jwt.decode returned null");
    return res.status(401).send({
      message: "It looks like your login session has expired. Please log out and login again.",
    });
  }

  if (!decoded.email) {
    console.log("Missing email in decoded token");
    return res.status(401).send({
      message: "It looks like your login session has expired. Please log out and login again.",
    });
  }

  req.email = decoded.email;

  next();
}
