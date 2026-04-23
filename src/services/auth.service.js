import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

// Generar token
export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
    },
    JWT_SECRET,
    { expiresIn: "2h" }
  );
};

// Verificar token
export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};