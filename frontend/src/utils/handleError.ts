import axios from "axios";

import toast from "react-hot-toast";
import type { ApiError } from "../types/apiError";

export const handleError = (error: unknown) => {
  if (axios.isAxiosError<ApiError>(error) && error.response?.data) {
    console.log("toast is opeont");
    const apiError = error.response.data;
    console.log(apiError);
    toast.error(
      `Error ${apiError.error.statusCode}: ${apiError.error.message}`,
    );
  } else {
    toast.error("Something went wrong. Please try again.");
  }
};
