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
  const [isLoading, setIsLoading] = useState(false);

  const onLogin = async (data: LoginInput) => {
    setIsLoading(true);
    try {
      const res = await LoginService(data);

      return res.data.payload;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  return { register, handleSubmit, errors, onLogin, isLoading };
};

export const useSignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInput>();
  const [isLoading, setIsLoading] = useState(false);
  const onSignUp = async (data: SignUpInput) => {
    setIsLoading(true);
    try {
      const res = await SignUpService(data);
      return res.data;
    } catch (error) {
      console.error("SignUp error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { register, handleSubmit, errors, onSignUp, isLoading };
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
