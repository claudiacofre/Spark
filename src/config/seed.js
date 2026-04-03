// Conectar y sincronizar
import sequelize from "./database.js";
import Spark from "../models/spark.js";

const seedDatabase = async () => {
  try {
    await sequelize.authenticate(); // Conectar y sincronizar

    // --- LIMPIEZA ---
    // 'truncate' borra todos los registros y reinicia los contadores (IDs)
    await Spark.destroy({ where: {}, truncate: true, cascade: true });
    console.log(" Base de datos limpiada. 🗑️");

    // --- CARGA ---
    const initialSparks = [
      // Datos de prueba (Chispas iniciales)
      { content: "¡Bienvenidos a Spark! Mi primera chispa. 🚀" },
      { content: "Node.js y Express hacen que el backend sea genial." },
      { content: "Probando la persistencia con Sequelize y PostgreSQL." },
    ];

    await Spark.bulkCreate(initialSparks); // Insertar datos
    console.log("✅ Datos semilla cargados con éxito.");

    process.exit(0); // Cerrar el proceso exitosamente
  } catch (error) {
    console.error("Error en el proceso de seed: ❌", error);
    process.exit(1);
  }
};

seedDatabase();
