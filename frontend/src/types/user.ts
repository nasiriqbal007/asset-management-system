export type User = {
  id: string;
  name: string;
  email: string;
  department: string;
  role: "admin" | "employee";
  created_at: string;
};
