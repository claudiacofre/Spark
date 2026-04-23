import sequelize from "../config/database.js";
import bcrypt from "bcrypt";
import { User, Spark } from "../models/index.models.js";

// ----------------------
// HELPERS
// ----------------------

// Crear chispa de bienvenida (reutilizable)
export const createWelcomeSpark = async (username, transaction) => {
  return await Spark.create(
    {
      username,
      content: `¡Hola! Soy ${username} y acabo de unirme a Spark. ✨`,
    },
    { transaction },
  );
};

// ----------------------
// CREATE USER (BASE)
// ----------------------
export const createUser = async ({ username, email, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  return await User.create({
    username,
    email,
    password: hashedPassword,
  });
};

// ----------------------
// CREATE USER + WELCOME SPARK (ONBOARDING)
// ----------------------
export const createUserWithWelcomeSpark = async ({
  username,
  email,
  password,
}) => {
  const t = await sequelize.transaction();

  try {
    // 1. Crear usuario con password encriptada
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create(
      {
        username,
        email,
        password: hashedPassword,
      },
      { transaction: t },
    );

    // 2. Crear chispa de bienvenida
    await createWelcomeSpark(newUser.username, t);

    // 3. Confirmar transacción
    await t.commit();

    return newUser;
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

// ----------------------
// FIND USER
// ----------------------
export const findUserByEmail = async (email) => {
  return await User.findOne({
    where: { email },
  });
};

// ----------------------
// Obtener todos los usuarios (sin password)
// ----------------------
export const getAllUsersService = async () => {
  return await User.findAll({
    attributes: { exclude: ["password"] },
  });
};

// Obtener usuario por ID
export const getUserById = async (id) => {
  return await User.findByPk(id);
};

// ----------------------
// Actualizar usuario
// ----------------------
export const updateUserService = async (id, data) => {
  const user = await User.findByPk(id);

  if (!user) return null;

  await user.update(data);
  return user;
};

// ----------------------
// Eliminar usuario
// ----------------------
export const deleteUserService = async (id) => {
  const user = await User.findByPk(id);

  if (!user) return null;

  await user.destroy();
  return true;
};

// ----------------------
// Obtener usuario con sus chispas
// ----------------------
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
