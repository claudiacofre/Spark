import User from './user.js';
import Spark from './spark.js';

// --- DEFINICIÓN DE RELACIONES 

// Un Usuario tiene muchas Chispas (1:N)
User.hasMany(Spark, {
    foreignKey: 'username', // La columna que los une
    sourceKey: 'username'
});

// Una Chispa pertenece a un único Usuario
Spark.belongsTo(User, {
    foreignKey: 'username',
    targetKey: 'username'
});

// Exportas ambos para usarlos en tus controladores
export { User, Spark };