import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Conexión a la DB

class Spark extends Model {}

Spark.init({
  // Identificador único (UUID es más pro para microblogging)
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  // El contenido de la "Chispa"
  content: {
    type: DataTypes.STRING(280), // Límite clásico de microblogging
    allowNull: false,
    validate: {
      len: [1, 280] // Valida que no esté vacío ni se pase del límite // No permite publicaciones vacías
    }
  }, 
  // Contador de interacciones
  likeCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  // Para hilos (referencia a otra chispa)
  parentId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'sparks', // Nombre de la tabla en la DB (usualmente en minúsculas/plural)
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'Spark',
  tableName: 'sparks', // Forzamos el nombre de la tabla
  underscored: true,   // Para que use created_at en lugar de createdAt
  timestamps: true  // Esto crea automáticamente 'createdAt' y 'updatedAt'
});

export default Spark;