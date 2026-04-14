import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Conexión a la DB

class Spark extends Model {}

Spark.init({
  // Identificador único (UUID es mejor para microblogging)
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Claudia' // Esto ayuda para que las chispas antiguas no queden vacías
  },
  // El contenido de la "Chispa"
  content: {
    type: DataTypes.STRING(300), // Límite un poco mayor que el clásico en microblogging.
    allowNull: false,
    validate: {
      len: [1, 300] // Válida que no esté vacío ni se pase del límite. (No permite publicaciones vacías, ni más extensas)
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
      model: 'sparks', // Nombre de la tabla en la BdD
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'Spark',
  tableName: 'sparks', // Fuerzo el nombre de la tabla
  underscored: true,   // Para que use created_at en lugar de createdAt
  timestamps: true  // Esto crea automáticamente 'createdAt' y 'updatedAt'
});

export default Spark;