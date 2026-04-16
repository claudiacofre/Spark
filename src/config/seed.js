import sequelize from "./database.js";
import Spark from "../models/spark.js";
import User from "../models/user.js"; 

const seedDatabase = async () => {
  try {
    await sequelize.authenticate(); // Conectar y sincronizar
    console.log("Conexión establecida para el sembrado. 🌱");

    await sequelize.sync({ force: false }); 
    console.log("Tablas sincronizadas o creadas si no existían. 🔄");

    // ---  Limpieza Total ---
    await Spark.destroy({ where: {}, truncate: true, cascade: true });
    await User.destroy({ where: {}, truncate: true, cascade: true });
    console.log("Base de datos limpiada. 🗑️");

    // ---  Carga de Usuarios  ---
    const initialUsers = [
      { username: "Claudia", email: "claudia@spark.com", password: "password123" },
      { username: "Eduardo", email: "eduardo@gmail.com", password: "secure456" },
      { username: "Catalina", email: "catalina@icloud.com", password: "test789" }
    ];

    await User.bulkCreate(initialUsers);
    console.log("Se han registrado 3 Usuarios semilla con éxito. ✅");

    // ---  Carga de Chispas ---
    const initialSparks = [ // Chispas de prueba (Chispas iniciales)
      { content: "Probando que tal esta spark...", username: "Eduardo" },
      { content: "¡Bienvenidos a Spark! Mi primera chispa.", username: "Claudia" },
      
    ];

    await Spark.bulkCreate(initialSparks);
    console.log("Chispas iniciales cargadas. ✨");

    process.exit(0);
  } catch (error) {
    console.error("Error en el proceso de seed: ❌", error);
    process.exit(1);
  }
};

seedDatabase();
