import sequelize from "../config/database.js";
import { User, Spark } from "../models/index.js";

// Crear usuario + chispa inicial (con transacción)
export const createUserWithWelcomeSpark = async ({ username, email, password }) => {
  const t = await sequelize.transaction();

  try {
    const newUser = await User.create(
      { username, email, password },
      { transaction: t }
    );

    await Spark.create(
      {
        username: newUser.username,
        content: `¡Hola! Soy ${newUser.username} y acabo de unirme a Spark. ✨`,
      },
      { transaction: t }
    );

    await t.commit();

    return newUser;
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

// Obtener todos los usuarios (sin password)
export const getAllUsersService = async () => {
  return await User.findAll({
    attributes: { exclude: ["password"] },
  });
};

// Obtener usuario por ID
export const getUserById = async (id) => {
  return await User.findByPk(id);
};

// Actualizar usuario
export const updateUserService = async (id, data) => {
  const user = await User.findByPk(id);

  if (!user) return null;

  await user.update(data);
  return user;
};

// Eliminar usuario
export const deleteUserService = async (id) => {
  const user = await User.findByPk(id);

  if (!user) return null;

  await user.destroy();
  return true;
};

// Obtener usuario con sus chispas
export const getUserWithSparksService = async (username) => {
  return await User.findOne({
    where: { username },
    attributes: { exclude: ["password"] },
    include: [
      {
        model: Spark,
        attributes: ["content", "createdAt"],
      },
    ],
  });
};