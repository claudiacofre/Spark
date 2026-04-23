import sequelize from "./database.js";
import Spark from "../models/spark.models.js";
import User from "../models/user.models.js";
import bcrypt from "bcrypt";

const seedDatabase = async () => {
  try {
    await sequelize.authenticate(); // Conectar y sincronizar
    console.log("Conexión establecida para el sembrado. 🌱");

    await sequelize.sync({ force: false });

    // --- LIMPIEZA ---
    await Spark.destroy({ where: {}, truncate: true, cascade: true });
    await User.destroy({ where: {}, truncate: true, cascade: true });
    console.log("Base de datos limpiada. 🗑️");

    // 🔐 HASHEAR PASSWORDS
    const passwordAdmin = await bcrypt.hash("Abc123#", 10);
    const passwordUser = await bcrypt.hash("Abc123#", 10);

    const password1 = await bcrypt.hash("password123", 10);
    const password2 = await bcrypt.hash("secure456", 10);

    // --- USUARIOS ---
    const initialUsers = [
      {
        username: "admin",
        email: "administrador@mail.com",
        password: passwordAdmin,
        role: "admin",
      },
      {
        username: "user",
        email: "user@mail.com",
        password: passwordUser,
        role: "user",
      },
      {
        username: "Claudia",
        email: "claudia@spark.com",
        password: password1,
      },
      {
        username: "Eduardo",
        email: "eduardo@gmail.com",
        password: password2,
      },
    ];

    await User.bulkCreate(initialUsers);
    console.log("Usuarios creados. 👥");

    // --- CHISPAS ---
    const initialSparks = [
      { content: "Probando que tal esta spark...", username: "Eduardo" },
      {
        content: "¡Bienvenidos a Spark! Mi primera chispa.",
        username: "Claudia",
      },
    ];

    await Spark.bulkCreate(initialSparks);
    console.log("Chispas iniciales cargadas. ✨");

    process.exit(0);
  } catch (error) {
    console.error("Error en el seed. ❌", error);
    process.exit(1);
  }
};

seedDatabase();
