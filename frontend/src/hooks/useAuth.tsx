import { useForm } from "react-hook-form";
import { LoginService, Profile, SignUpService } from "../services/auth.service";
import { useEffect, useState } from "react";
import type { User } from "../types/user";
import { handleError } from "../utils/handleError";
import toast from "react-hot-toast";

type LoginInput = { email: string; password: string };
type SignUpInput = {
  name: string;
  email: string;
  password: string;
  role: "admin";
  department_id: number;
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

      toast.success("Login successful");
      return res.data.payload;
    } catch (error) {
      handleError(error);
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
      toast.success("Sign up successful");
      return res.data;
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { register, handleSubmit, errors, onSignUp, isLoading };
};

export const useProfile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<User | null>(null);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const res = await Profile();
        return setProfile(res.data.payload);
      } catch (error) {
        handleError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { profile, isLoading };
};
