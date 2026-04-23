import User from "./user.models.js";
import Spark from "./spark.models.js";

// --- DEFINICIÓN DE RELACIONES

// Un Usuario tiene muchas Chispas (1:N)
User.hasMany(Spark, {
  foreignKey: "username", // La columna que los une
  sourceKey: "username",
});

// Una Chispa pertenece a un único Usuario
Spark.belongsTo(User, {
  foreignKey: "username",
  targetKey: "username",
});

// Exporto ambos para usarlos en mis controladores
export { User, Spark };
