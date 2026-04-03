import { Sequelize } from 'sequelize';
import 'dotenv/config'; // Carga las variables del archivo .env

// Creo la instancia de conexión 
const sequelize = new Sequelize(
  process.env.DB_NAME,      // Nombre de la base de datos (spark_db)
  process.env.DB_USER,      // Tu usuario de Postgres 
  process.env.DB_PASSWORD,  // Tu contraseña
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',    
    logging: false,        
    define: {
      timestamps: true,     
      underscored: true     // Usa snake_case (user_id) en lugar de camelCase
    }
  }
);

export default sequelize;