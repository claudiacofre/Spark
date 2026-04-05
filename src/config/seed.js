// Conectar y sincronizar
import sequelize from "./database.js";
import Spark from "../models/spark.js";

const seedDatabase = async () => {
  try {
    await sequelize.authenticate(); // Conectar y sincronizar

    // --- Limpieza ---
    await Spark.destroy({ where: {}, truncate: true, cascade: true });  // 'truncate' borra todos los registros y reinicia los contadores (IDs)
    console.log("Base de datos limpiada. 🗑️");

    // --- Carga ---
    const initialSparks = [
      { content: "¡Bienvenidos a Spark! Mi primera chispa. " },   // Dato de prueba (Chispa inicial)
    ];

    await Spark.bulkCreate(initialSparks); // Insertar datos
    console.log("Datos semilla cargados con éxito. ✅");

    process.exit(0); // Cerrar el proceso exitosamente
  } catch (error) {
    console.error("Error en el proceso de seed: ❌", error);
    process.exit(1);
  }
};

seedDatabase();
