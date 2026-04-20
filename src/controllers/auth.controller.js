// Render login
export const renderLogin = (req, res) => {
  try {
    res.render("auth/login", {
      title: "Iniciar Sesión",
    });
  } catch (error) {
    console.error("Error al renderizar login:", error);
    res.status(500).send("Error interno del servidor");
  }
};

// Render register
export const renderRegister = (req, res) => {
  try {
    res.render("auth/register", {
      title: "Únete a Spark",
    });
  } catch (error) {
    console.error("Error al renderizar registro:", error);
    res.status(500).send("Error al cargar la página");
  }
};

// Registro (temporal)
export const registerUser = async (req, res) => {
  try {
    const { username, email } = req.body;

    console.log(`Registrando a: ${username} (${email})`);

    res.redirect("/login");
  } catch (error) {
    console.error("Error en registro:", error);
    res.status(500).json({
      success: false,
      message: "No se pudo crear la cuenta",
    });
  }
};

// Login (temporal)
export const loginAPI = async (req, res) => {
  try {
    res.json({
      success: true,
      message: "Logueado con éxito",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Logout
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