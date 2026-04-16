import sequelize from '../config/database.js'; // Importa tu instancia de conexión
import { User, Spark } from '../models/index.js';

// --- REGISTRO CON TRANSACCIÓN ---
export const registerWithWelcomeSpark = async (req, res) => {
    // Iniciamos la transacción
    const t = await sequelize.transaction();

    try {
        const { username, email, password } = req.body;

        // ACCIÓN 1: Crear el usuario
        const newUser = await User.create({
            username,
            email,
            password
        }, { transaction: t });

        // ACCIÓN 2: Crear su chispa de bienvenida automática
        await Spark.create({
            username: newUser.username,
            content: `¡Hola! Soy ${newUser.username} y acabo de unirme a Spark. ✨`
        }, { transaction: t });

        // Si todo salió bien, confirmamos los cambios (COMMIT)
        await t.commit();

        res.status(201).json({
            success: true,
            message: "Usuario y chispa inicial creados con éxito. ✅"
        });

    } catch (error) {
        // SI ALGO FALLA, DESHACEMOS TODO (ROLLBACK)
        await t.rollback();

        console.error("LOG DE ERROR: Falló la transacción, se aplicó Rollback. ❌", error.message);
        
        res.status(500).json({
            success: false,
            message: "Error en el registro. No se guardó ningún dato. ❌",
            error: error.message
        });
    }
};

// --- MODIFICAR USUARIO (PUT) ---
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email } = req.body; // Solo permitimos editar estos

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ success: false, message: "Usuario no encontrado. 🔍" });
        }
        // Actualizamos solo los campos permitidos
        await user.update({ username, email });

        res.json({
            success: true,
            message: "Usuario actualizado con éxito. ✅",
            data: { id, username, email }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error al actualizar usuario. ❌" });
    }
};

// --- ELIMINAR USUARIO (DELETE) ---
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);

        // Validación previa de existencia
        if (!user) {
            return res.status(404).json({ success: false, message: "No se puede eliminar: Usuario no existe. ❌" });
        }

        await user.destroy();

        res.json({
            success: true,
            message: `Usuario con ID ${id} eliminado correctamente. 🗑️`
        });
    } catch (error) {
        res.status(500).json({ success: false, error: "Error al eliminar usuario. ❌" });
    }
};

// --- OBTENER TODOS LOS USUARIOS ---
export const getAllUsers = async (req, res) => {
    try {
        // Obtenemos usuarios EXCLUYENDO la contraseña
        const users = await User.findAll({
            attributes: { exclude: ['password'] } 
        });

        // Respuesta JSON clara y ordenada
        res.status(200).json({
            success: true,
            message: "Usuarios detectados con éxito.",
            data: users
        });
    } catch (error) {
        // Validación de errores de consulta
        console.error("Error al obtener usuarios:", error);
        res.status(500).json({
            success: false,
            error: "Error interno al consultar la base de datos. ❌"
        });
    }
};

// --- OBTENER USUARIO CON SUS CHISPAS ---
export const getUserWithSparks = async (req, res) => {
    try {
        const { username } = req.params;

        const user = await User.findOne({
            where: { username },
            attributes: { exclude: ['password'] },
            // REQUERIMIENTO MÍNIMO: Traer la relación usando include
            include: [{
                model: Spark,
                attributes: ['content', 'createdAt']
            }]
        });

        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: "Usuario no encontrado 🔍" 
            });
        }

        res.json({
            success: true,
            message: "Usuario y sus chispas obtenidos correctamente. ✅",
            data: user
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: "Error al recuperar la relación: ❌" + error.message 
        });
    }
};


