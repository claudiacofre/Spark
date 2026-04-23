import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "super_secret_key";

// Generar token
export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
    },
    SECRET,
    { expiresIn: "1h" }
  );
};

// Verificar token
export const verifyToken = (token) => {
  return jwt.verify(token, SECRET);
};