import { Spark } from "../models/index.models.js";
import { getAllSparks, getSparkById, createSpark } from "../services/spark.service.js";

// --- API JSON ---
export const getSparks = async (req, res) => {
    try {
        // 1. Buscamos todas las chispas en la DB
        const sparks = await Spark.findAll({ 
            order: [["created_at", "DESC"]] 
        });

        // 2. IMPORTANTE: Enviamos SOLO el array de chispas
        // NO lo pongas entre llaves { sparks }, envíalo directo.
        res.json(sparks); 

    } catch (error) {
        console.error("Error al obtener chispas:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// --- VIEW (Feed) ---
export const getFeed = async (req, res) => {
  try {
    const sparks = await getAllSparks();

    res.render("feed", {
      title: "Muro de Chispas",
      sparks,
      user: req.user // 👈 importante
    });
  } catch (error) {
    console.error("Error al cargar el feed:", error);
    res.status(500).send("Error al cargar las chispas ❌");
  }
};

// --- VIEW (Detalle) ---
export const getPostDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const spark = await getSparkById(id);

    if (!spark) {
      return res.status(404).send("Chispa no encontrada 🔍");
    }

    res.render("post", { 
      spark,
      user: req.user
    });

  } catch (error) {
    console.error(error);
    res.status(500).send("Error al abrir la chispa ❌");
  }
};

// --- CREATE ---
export const postSpark = async (req, res) => {
  try {
    const { content, parentId } = req.body;

    const username = req.user.username;

    await createSpark({ content, parentId, username });

    res.redirect("/feed");
  } catch (error) {
    console.error("❌ Error al guardar chispa:", error.message);

    res.status(400).json(error.message || "Error al crear chispa ❌");
  }
};

export const deleteSpark = async (req, res) => {
  try {
    const { id } = req.params;

    const spark = await Spark.findByPk(id);

    if (!spark) {
      return res.status(404).json({
        success: false,
        message: "Spark no encontrado",
      });
    }

    // 🔐 usuario actual (del JWT)
    const user = req.user;

    // ❌ NO es dueño ni admin
    if (
      spark.username !== user.username &&
      user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "No tienes permisos para eliminar este post",
      });
    }

    await spark.destroy();

    return res.json({
      success: true,
      message: "Spark eliminado correctamente",
    });

  } catch (error) {
    console.error("Error al eliminar spark:", error);

    return res.status(500).json({
      success: false,
      message: "Error del servidor",
    });
  }
};

export const updateSpark = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const spark = await Spark.findByPk(id);

    if (!spark) {
      return res.status(404).json({
        success: false,
        message: "Spark no encontrado",
      });
    }

    const user = req.user;

    // 🔐 SOLO dueño (y opcional admin)
    if (
      spark.username !== user.username &&
      user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "No tienes permisos para editar este post",
      });
    }

    // actualizar contenido
    spark.content = content;
    await spark.save();

    return res.json({
      success: true,
      message: "Spark actualizado",
      spark,
    });

  } catch (error) {
    console.error("Error update:", error);

    return res.status(500).json({
      success: false,
      message: "Error del servidor",
    });
  }
};