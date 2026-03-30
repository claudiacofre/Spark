import sequelize from './database.js';
import Spark from '../models/spark.js';

const seedDatabase = async () => {
    try {
        // Conectar y sincronizar
        await sequelize.authenticate();
        
        // Datos de prueba (Chispas iniciales)
        const initialSparks = [
            { content: "¡Bienvenidos a Spark! Mi primera chispa. 🚀" },
            { content: "Node.js y Express hacen que el backend sea genial." },
            { content: "Probando la persistencia con Sequelize y PostgreSQL." }
        ];

        // Insertar datos 
        await Spark.bulkCreate(initialSparks);
        
        console.log('✅ Datos semilla cargados con éxito.');
        process.exit(0); // Cerrar el proceso exitosamente
    } catch (error) {
        console.error('❌ Error al cargar seeds:', error);
        process.exit(1);
    }
};

seedDatabase();