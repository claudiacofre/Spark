import { getSparksByUser } from "../services/spark.service.js";

// --- PERFIL ---
export const getProfile = async (req, res) => {
  try {
    const username = req.user.username;

    const userSparks = await getSparksByUser(username);

    res.render("profile", {
      user: req.user, 
      userSparks,
    });

  } catch (error) {
    res.status(500).send("Error al cargar perfil ❌");
  }
};

// --- SETTINGS ---
export const getSettings = (req, res) => {
  const user = req.session?.user || {
    username: "Claudia",
    email: "claudia@ejemplo.com",
  };

  res.render("settings", {
    title: "Configuración del Perfil",
    user,
  });
};