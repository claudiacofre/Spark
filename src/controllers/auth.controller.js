import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { createUser, findUserByEmail } from "../services/user.service.js";
import { generateToken } from "../utils/jwt.js";

// ----------------------
// VISTAS
// ----------------------

export const renderLogin = (req, res) => {
  try {
    res.render("auth/login", { // Render login
      title: "Iniciar Sesión",
    });
  } catch (error) {
    console.error("Error al renderizar login:", error);
    res.status(500).send("Error interno del servidor");
  }
};
export const renderRegister = (req, res) => { // Render register
  try {
    res.render("auth/register", {
      title: "Únete a Spark",
    });
  } catch (error) {
    console.error("Error al renderizar registro:", error);
    res.status(500).send("Error al cargar la página");
  }
};

// ----------------------
// REGISTER REAL (DB)
// ----------------------

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validación
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Todos los campos son obligatorios",
      });
    }

    // Verificar si existe
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "El usuario ya existe",
      });
    }

    // Crear usuario
    const newUser = await createUser({ username, email, password });

    // Guardar sesión
    req.session.user = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
    };

    // Redirigir
    res.redirect("/feed");

  } catch (error) {
    console.error("Error en registerUser:", error);

    res.status(500).json({
      success: false,
      message: "Error al registrar usuario",
    });
  }
};

// ----------------------
// LOGIN REAL
// ----------------------
export const loginAPI = async (req, res) => {
  try {
    // 👇 1. VER QUÉ LLEGA DEL FORM
    console.log("BODY:", req.body);

    const { email, password } = req.body;

    // 👇 2. VER SI ENCUENTRA EL USUARIO
    const user = await findUserByEmail(email);
    console.log("USER:", user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado",
      });
    }

    // 👇 3. VER PASSWORDS (temporal)
    console.log("PASSWORD INGRESADA:", password);
    console.log("PASSWORD EN DB:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);

    // 👇 4. RESULTADO DEL MATCH
    console.log("MATCH:", isMatch);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Contraseña incorrecta",
      });
    }

    // 👇 5. JWT
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
    });

    res.redirect("/feed");

  } catch (error) {
    // 👇 6. ERROR REAL
    console.error("❌ LOGIN ERROR REAL:", error);

    res.status(500).json({
      success: false,
      message: "Error en login",
    });
  }
};
// ----------------------
// LOGOUT
// ----------------------

// API
export const logoutAPI = (req, res) => {
  res.clearCookie("token");

  res.json({
    success: true,
    message: "Logout exitoso",
  });
};

// VIEW
export const logoutView = (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
};