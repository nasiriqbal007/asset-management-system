import type { Request, Response, NextFunction } from "express";
import AppError from "../Error/app-error.js";
import AppResponse from "../Response/app-response.js";
import {
  deleteEmp,
  getAllEmp,
  getEmpById,
  updateEmp,
} from "../services/employee-service.js";
import { createUser } from "../repositories/auth.repo.js";

export const getAllEmpController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const allEmp = await getAllEmp();
    AppResponse.GET_ALL_EMP.send(res, allEmp);
  } catch (error) {
    next(error);
  }
};
export const getEmpByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const empId = Number(req.params.id);

    const getEmp = await getEmpById(empId);
    AppResponse.PROFILE_RETRIEVED.send(res, getEmp);
  } catch (error) {
    next(error);
  }
};
export const createEmpController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const newEmp = await createUser(req.body);
    AppResponse.USER_REGISTERED.send(res, newEmp);
  } catch (error) {
    next(error);
  }
};
export const deleteEmpController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const empId = Number(req.params.id);
    const deletedEmp = await deleteEmp(empId);
    AppResponse.DELETED_USER.send(res, deletedEmp);
  } catch (error) {
    next(error);
  }
};
export const updateEmpController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const empId = Number(req.params.id);
    const updatedEmp = await updateEmp(empId, req.body);
    AppResponse.PROFILE_UPDATED.send(res, updatedEmp);
  } catch (error) {
    next(error);
  }
};
