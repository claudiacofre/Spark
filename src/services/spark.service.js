import Spark from "../models/spark.models.js";

// Normalizador (evita repetir esto en todos lados)
const normalizeSpark = (spark) => {
  const data = spark.get({ plain: true });
  return {
    ...data,
    created_at: data.created_at || data.createdAt,
  };
};

// Obtener todas las chispas
export const getAllSparks = async () => {
  const sparks = await Spark.findAll({
    order: [["created_at", "DESC"]],
  });

  return sparks.map(normalizeSpark);
};

// Obtener chispa por ID
export const getSparkById = async (id) => {
  const spark = await Spark.findByPk(id);
  if (!spark) return null;

  return normalizeSpark(spark);
};

// Crear chispa
export const createSpark = async ({ content, parentId, username }) => {
  if (!content || content.trim().length === 0) {
    throw new Error("Contenido vacío");
  }

  return await Spark.create({
    content: content.trim(),
    parentId: parentId || null,
    username,
  });
};

// Obtener chispas por usuario
export const getSparksByUser = async (username) => {
  try {
    const sparksData = await Spark.findAll({
      where: { username },
      order: [["created_at", "DESC"]],
    });

    return sparksData.map((spark) => {
      const data = spark.get({ plain: true });

      return {
        ...data,
        created_at: data.created_at || data.createdAt,
      };
    });
  } catch (error) {
    console.error("Error en getSparksByUser:", error);
    throw new Error("No se pudieron obtener las chispas del usuario ❌");
  }
};
