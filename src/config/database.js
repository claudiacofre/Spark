import { Sequelize } from 'sequelize';
import 'dotenv/config'; // Carga las variables del archivo .env

// Creamos la instancia de conexión 
const sequelize = new Sequelize(
  process.env.DB_NAME,      // Nombre de la base de datos (ej: spark_db)
  process.env.DB_USER,      // Tu usuario de Postgres (ej: postgres)
  process.env.DB_PASSWORD,  // Tu contraseña
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',    // El "idioma" que hablará Sequelize
    logging: false,         // Para que no llene la consola de SQL puro (opcional)
    define: {
      timestamps: true,     // Crea 'createdAt' y 'updatedAt' por defecto
      underscored: true     // Usa snake_case (user_id) en lugar de camelCase
    }
  }
);

// Exportamos usando el estándar ES6
export default sequelize;