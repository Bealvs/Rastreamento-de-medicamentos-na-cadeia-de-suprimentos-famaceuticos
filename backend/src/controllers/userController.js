// Handles operations related to user management, such as registration, authentication, and profile management.
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Retrieves the profile of the currently authenticated user.
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    res.status(200).json({
      id: user.id,
      name: user.name,
      cpf: user.cpf,
      cnpj: user.cnpj,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar perfil", error: error.message });
  }
};

// Registers a new user in the system.
export const registerUser = async (req, res) => {
  const { name, cpf, cnpj, email, password } = req.body;
  try {
    const user = await User.create({ name, cpf, cnpj, email, password });
    res
      .status(201)
      .json({
        message: "Usuário registrado",
        user: { name, cpf, cnpj, email },
      });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Erro ao registrar usuário", error: error.message });
  }
};

// Authenticates a user and provides a JWT for subsequent requests.
export const loginUser = async (req, res) => {
  const { cpf, password } = req.body; 

  try {
    const user = await User.findOne({ where: { cpf } });

    if (!user) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({ token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro interno do servidor", error: error.message });
  }
};

// Updates the profile information of the currently authenticated user.
export const updateUserProfile = async (req, res) => {
  const { name, cpf, cnpj, email, password } = req.body;
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const updatedData = {
      name: name || user.name,
      cpf: cpf || user.cpf,
      cnpj: cnpj || user.cnpj,
      email: email || user.email,
    };

    if (password) {
      updatedData.password = await bcrypt.hash(password, 10);
    }

    await user.update(updatedData);
    res.status(200).json({
      message: "Perfil atualizado com sucesso",
      user: {
        id: user.id,
        name: updatedData.name,
        cpf: updatedData.cpf,
        cnpj: updatedData.cnpj,
        email: updatedData.email,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao atualizar perfil", error: error.message });
  }
};
