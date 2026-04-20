import { getAllSparks, getSparkById, createSpark } from "../services/spark.service.js";

// --- API JSON ---
export const getSparks = async (req, res) => {
  try {
    const sparks = await getAllSparks();

    res.json({
      success: true,
      data: sparks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error al obtener las chispas ❌",
    });
  }
};

// --- VIEW (Feed) ---
export const getFeed = async (req, res) => {
  try {
    const sparks = await getAllSparks();

    res.render("feed", {
      title: "Muro de Chispas",
      sparks,
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

    res.render("post", { spark });
  } catch (error) {
    res.status(500).send("Error al abrir la chispa ❌");
  }
};

// --- CREATE ---
export const postSpark = async (req, res) => {
  try {
    const { content, parentId } = req.body;

    // ⚠️ temporal hasta auth real
    const username = req.session?.user?.username || "Claudia";

    await createSpark({ content, parentId, username });

    res.redirect("/feed");
  } catch (error) {
    console.error("❌ Error al guardar chispa:", error.message);

    res.status(400).send(error.message || "Error al crear chispa ❌");
  }
};