import { Loader } from "lucide-react";

export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Loader className="animate-spin text-(--primary)" size={48} />
    </div>
  );
};
