import { getSparksByUser } from "../services/spark.service.js";

// --- PERFIL ---
export const getProfile = async (req, res) => {
  try {
    const username = req.session?.user?.username || "Claudia";

    const userSparks = await getSparksByUser(username);

    res.render("profile", {
      user: { username },
      userSparks,
    });
  } catch (error) {
    console.error("Error al cargar perfil:", error);
    res.status(500).send("Error al cargar el perfil ❌");
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