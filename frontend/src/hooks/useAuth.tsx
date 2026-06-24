import { useForm } from "react-hook-form";
import {
  getAllDep,
  LoginService,
  Profile,
  SignUpService,
} from "../services/auth.service";
import { useEffect, useState } from "react";
import type { User } from "../types/user";

type LoginInput = { email: string; password: string };
type SignUpInput = {
  name: string;
  email: string;
  password: string;
  role: "admin";
  departmentId: number;
};

export const useLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>();

  const onLogin = async (data: LoginInput) => {
    try {
      const res = await LoginService(data);
      console.log("Login response:", res.data.payload);
      return res.data.payload;
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  return { register, handleSubmit, errors, onLogin };
};

export const useSignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInput>();

  const onSignUp = async (data: SignUpInput) => {
    try {
      const res = await SignUpService(data);
      return res.data;
    } catch (error) {
      console.error("SignUp error:", error);
    }
  };

  return { register, handleSubmit, errors, onSignUp };
};

export const useProfile = () => {
  const [profile, setProfile] = useState<User | null>();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await Profile();
        return setProfile(res.data.payload);
      } catch (error) {
        console.error("Profile error:", error);
      }
    };

    fetchProfile();
  }, []);

  return { profile };
};
export const useFetchAllDep = () => {
  const [departments, setDepartments] = useState<
    { id: number; department_name: string }[]
  >([]);
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getAllDep();

        setDepartments(res.data.payload);
      } catch (error) {
        console.error("Get Departments error:", error);
      }
    };
    fetch();
  }, []);

  return { departments };
};
