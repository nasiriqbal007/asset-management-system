import { Search } from "lucide-react";
import type { InputHTMLAttributes } from "react";

export const SearchInput = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div className="relative flex items-center flex-1 min-w-50">
      <Search className="absolute left-3 text-(--text-secondary) w-4 h-4 pointer-events-none" />
      <input
        type="text"
        className="w-full pl-10 pr-4 py-2 text-sm bg-(--primary-light) border border-(--border) rounded-full placeholder:text-(--text-secondary) focus:outline-none focus:ring-2 focus:ring-(--primary) focus:border-transparent transition-all duration-300"
        {...props}
      />
    </div>
  );
};
