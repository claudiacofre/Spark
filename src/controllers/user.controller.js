import {
  createUserWithWelcomeSpark,
  getAllUsersService,
  updateUserService,
  deleteUserService,
  getUserWithSparksService,
} from "../services/user.service.js";

// --- REGISTRO ---
export const registerWithWelcomeSpark = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    await createUserWithWelcomeSpark({ username, email, password });

    res.status(201).json({
      success: true,
      message: "Usuario creado con chispa inicial ✅",
    });
  } catch (error) {
    console.error("Error en registro:", error.message);

    res.status(500).json({
      success: false,
      message: "Error en el registro ❌",
      error: error.message,
    });
  }
};

// --- GET ALL ---
export const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersService();

    res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error al obtener usuarios ❌",
    });
  }
};

// --- UPDATE ---
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email } = req.body;

    const updatedUser = await updateUserService(id, { username, email });

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado 🔍",
      });
    }

    res.json({
      success: true,
      message: "Usuario actualizado ✅",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error al actualizar usuario ❌",
    });
  }
};

// --- DELETE ---
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await deleteUserService(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Usuario no existe ❌",
      });
    }

    res.json({
      success: true,
      message: `Usuario ${id} eliminado 🗑️`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error al eliminar usuario ❌",
    });
  }
};

// --- USER + SPARKS ---
export const getUserWithSparks = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await getUserWithSparksService(username);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado 🔍",
      });
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error al recuperar relación ❌",
    });
  }
};

