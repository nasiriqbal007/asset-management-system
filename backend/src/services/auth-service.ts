import { config } from "../config/env.js";
import AppError from "../Error/app-error.js";
import {
  createUser,
  getAllDepartments,
  getUserByEmail,
} from "../repositories/auth.repo.js";
import type { CreateUserInput, LoginInput } from "../types/user-types.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getEmployeeById } from "../repositories/employee.repo.js";

export const registerUser = async (userData: CreateUserInput) => {
  const existingUser = await getUserByEmail(userData.email);
  if (existingUser) {
    throw AppError.ASSET_ALREADY_EXISTS;
  }

  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(userData.password, salt);
  userData.password = hashedPassword;

  const user = await createUser(userData);

  return user;
};

export const authenticate = async (data: LoginInput) => {
  const user = await getUserByEmail(data.email);
  if (!user) {
    throw AppError.USER_NOT_FOUND;
  }
  const isMatch = await bcrypt.compare(data.password, user.password);
  if (!isMatch) {
    throw AppError.INVALID_CREDENTIALS;
  }

  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
      role: user.role,
    },
    config.jwtSecret,
    { expiresIn: "1d" },
  );
  
return { user, token };
};
export const getUserProfile = async (id: number) => {
  const user = await getEmployeeById(id);
  if (!user) {
    throw AppError.USER_NOT_FOUND;
  }
  return user;
};
export const getAllDepService = async () => {
  const department = await getAllDepartments();
  if (!department) {
    throw AppError.NOT_FOUND;
  }
  return department;
};
