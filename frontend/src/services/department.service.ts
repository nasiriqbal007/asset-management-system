import api from "../api/api";

export const getAllDepartments = () => api.get("auth/departments");
