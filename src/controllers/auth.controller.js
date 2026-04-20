import Spark from "../models/spark.js";

// Para MOSTRAR la página 
export const renderLogin = (req, res) => {
    try {
        // Importante: El nombre 'login' debe coincidir con 'login.hbs'
        res.render('auth/login', { 
            title: 'Iniciar Sesión' 
        });
    } catch (error) {
        console.error("Error al renderizar el login:", error);
        res.status(500).send("Error interno del servidor");
    }
};

export const renderRegister = (req, res) => {
    try {
        res.render('auth/register', { 
            title: 'Únete a Spark',
            // Puedes pasar variables extra aquí si las necesitas
        });
    } catch (error) {
        console.error("Error al renderizar el registro:", error);
        res.status(500).send("Error al cargar la página de registro");
    }
};

/**
 * Procesa el formulario de registro (API)
 */
export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Aquí iría tu lógica de Sequelize, por ejemplo:
        // const newUser = await User.create({ username, email, password });

        console.log(`Registrando a: ${username} (${email})`);

        // Después de registrar, lo mandamos al login para que entre
        res.redirect('/login'); 

    } catch (error) {
        console.error("Error en el proceso de registro:", error);
        res.status(500).json({ message: "No se pudo crear la cuenta" });
    }
};

// Para PROCESAR los datos (POST)
export const loginAPI = async (req, res) => {
    try {
        // Tu lógica de JWT aquí después...
        res.json({ ok: true, message: "Logueado con éxito" });
    } catch (error) {
        res.status(500).json({ ok: false, error: error.message });
    }
};

export const logoutAPI = (req, res) => {
    // Si usas express-session, borramos la sesión
    if (req.session) {
        req.session.destroy((err) => {
            if (err) {
                console.error("Error al cerrar sesión:", err);
                return res.status(500).send("No se pudo cerrar la sesión");
            }
            // Al terminar, lo mandamos al login con un mensaje de éxito
            res.redirect('/login?message=logout_success');
        });
    } else {
        res.redirect('/login');
    }
};

export const getProfile = async (req, res) => {
  try {
    // 1. Buscamos las chispas del usuario 'Claudia'
    const userSparksData = await Spark.findAll({
      where: { username: "Claudia" },
      order: [["created_at", "DESC"]],
    });

    const userSparks = userSparksData.map((spark) => {
      const data = spark.get({ plain: true });
      return {
        ...data,
        // Si la DB devuelve createdAt, lo convertimos a created_at para el HBS
        created_at: data.created_at || data.createdAt,
      };
    });
    res.render('profile', {
            user: { username: 'claudia' },
            userSparks: userSparks // <--- Aquí es donde se arregla la fecha
        });
  } catch (error) {
    console.error("Error al cargar perfil: ❌", error);
    res.status(500).send("Error al cargar el perfil. ❌");
  }
};

export const getSettings = (req, res) => {
  res.render("settings", {
    title: "Configuración del Perfil.",
    user: {
      username: "Claudia",
      email: "claudia@ejemplo.com",
    },
  });
};
