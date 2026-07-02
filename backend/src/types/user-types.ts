export type User = {
  id: number;
  name: string;
  email: string;
  department: string;
  department_id: number;
  role: "employee" | "admin";
};

export type CreateUserInput = {
  name: string;
  email: string;
  department_id: number;
  password: string;
  role?: "employee" | "admin";
};

export type LoginInput = {
  email: string;
  password: string;
};

export type jwtPayload = {
  userId: number;
  role: "employee" | "admin";
  email: string;
};
export type UpdateEmpType = {
  name: string;
  email: string;
  department_id: number;
};

export type QueryUser = {
  name?: string;
  department_id?: number;
  page?: number;
  limit?: number;
};
