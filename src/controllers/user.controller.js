import {
  createUserWithWelcomeSpark,
  getAllUsersService,
  updateUserService,
  deleteUserService,
  getUserWithSparksService,
} from "../services/user.service.js";

import User from '../models/user.models.js';

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

export const updateProfile = async (req, res) => {
    try {
      console.log("BODY:", req.body); // Verifica que lleguen username, email y bio
        console.log("USER ID:", req.user?.id); // Verifica que el toke
        const { username, email, bio } = req.body;
        const userId = req.user.id; // Obtenido del token por el middleware

        // 1. Actualizamos en la base de datos
        await User.update(
            { username, email, bio },
            { where: { id: userId } }
        );

        res.redirect('/profile');

    } catch (error) {
     console.error("DETALLE DEL ERROR:", error); // MIRA ESTO EN LA TERMINAL DE VS CODE
        res.status(500).send("Error al actualizar el perfil");
    }
};

