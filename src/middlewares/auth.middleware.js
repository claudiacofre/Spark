import jwt from "jsonwebtoken";
import { verifyToken } from "../utils/jwt.js";

// ----------------------
// AUTH REQUIRED MIDDLEWARE
// ----------------------
export const authRequired = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.redirect("/login");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 👉 aquí guardamos el usuario en la request
    req.user = decoded;

    next();
  } catch (error) {
    return res.redirect("/login");
  }
};

export const optionalAuth = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
    }

    next();
  } catch {
    next();
  }
};