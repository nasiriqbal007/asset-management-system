export type User = {
  id: number;
  name: string;
  email: string;
  department: string;
  role: "employee" | "admin";
};

export type CreateUserInput = {
  name: string;
  email: string;
  departmentId: number;
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
