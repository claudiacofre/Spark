import jwt from "jsonwebtoken";
import { verifyToken } from "../utils/jwt.js";

// 1. PARA PROTEGER RUTAS DE API (Devuelve JSON)
export const validateApiToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ 
            status: "error", 
            message: "No autorizado. Por favor, inicia sesión." 
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Guardamos id y username del usuario
        next();
    } catch (error) {
        return res.status(403).json({ 
            status: "error", 
            message: "Token inválido o expirado." 
        });
    }
};

// 2. PARA PROTEGER VISTAS (Tu código original con redirect)
export const authRequired = (req, res, next) => {
  try {
    const token = req.cookies.token; // Extraer el token de las cookies
    if (!token) return res.redirect("/login");

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verificar el token
    req.user = decoded; // INYECTAR EL USUARIO EN EL REQUEST 
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