import Spark from "../models/spark.js";

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
