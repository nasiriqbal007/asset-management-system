import api from "../api/api";

export const LoginService = (data: { email: string; password: string }) =>
  api.post(`auth/login`, data);
export const SignUpService = (data: {
  name: string;
  email: string;
  password: string;
  role: "admin";
  departmentId: number;
}) => api.post(`/auth/register`, data);
export const Profile = () => api.get(`/auth/profile`);
export const getAllDep = () => api.get(`/auth/departments`);
