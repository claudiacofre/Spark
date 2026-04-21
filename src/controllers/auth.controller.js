import { createUser, findUserByEmail } from "../services/user.service.js";

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
    const { email, password } = req.body;

    const user = await findUserByEmail(email);

    if (!user || user.password !== password) {
      return res.status(401).json({
        success: false,
        message: "Credenciales inválidas",
      });
    }

    req.session.user = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    res.redirect("/feed");

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// ----------------------
// LOGOUT
// ----------------------

export const logoutAPI = (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error al cerrar sesión:", err);
        return res.status(500).send("No se pudo cerrar la sesión");
      }

      res.redirect("/login?message=logout_success");
    });
  } else {
    res.redirect("/login");
  }
};