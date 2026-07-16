import { NavLink, Outlet, useNavigate } from "react-router";
import { useState } from "react";
import { useProfile } from "../hooks/useAuth";
import logo from "../assets/Logo_ast.png";
import {
  ClipboardList,
  FileText,
  LayoutDashboard,
  LogOutIcon,
  Menu,
  Package,
  Search,
  Users,
  Zap,
} from "lucide-react";

export const AdminLayout = () => {
  const navigate = useNavigate();
  const { profile } = useProfile();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-(--bg-page) text-(--text-primary) flex-col md:flex-row">
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-48 transform bg-linear-to-b from-(--sidebar-gradient-top) to-(--sidebar-gradient-bottom) border-r border-(--border) transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-center w-full h-18 border-b border-(--border)">
          <img src={logo} alt="AST" className="h-18 w-full" />
        </div>

        <nav className="flex flex-col gap-1 p-4">
          <NavLink
            className={({ isActive }) =>
              isActive ? "sidebar-link-active" : "sidebar-link-inactive"
            }
            to="/admin/dashboard"
          >
            <div className="flex items-center gap-2">
              <LayoutDashboard size={24} /> Dashboard
            </div>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "sidebar-link-active" : "sidebar-link-inactive"
            }
            to="/admin/employees"
          >
            <div className="flex items-center gap-2">
              <Users size={24} />
              Employees
            </div>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "sidebar-link-active" : "sidebar-link-inactive"
            }
            to="/admin/assets"
          >
            <div className="flex items-center gap-2">
              <Package size={24} />
              Assets
            </div>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "sidebar-link-active" : "sidebar-link-inactive"
            }
            to="/admin/requests"
          >
            <div className="flex items-center gap-2">
              <ClipboardList size={24} />
              Requests
            </div>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "sidebar-link-active" : "sidebar-link-inactive"
            }
            to="/admin/allocations"
          >
            <div className="flex items-center gap-2">
              <Zap size={24} />
              Allocations
            </div>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "sidebar-link-active" : "sidebar-link-inactive"
            }
            to="/admin/logs"
          >
            <div className="flex items-center gap-2">
              <FileText size={24} />
              Logs
            </div>
          </NavLink>
        </nav>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`flex flex-col flex-1 transition-all duration-300 ${sidebarOpen ? "md:pl-48" : "md:pl-0"}`}
      >
        <header className="h-auto md:h-16 border-(--border) border-b flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4 px-4 md:px-6 py-2">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <button
              className="text-(--text-primary) hover:cursor-pointer shrink-0"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu size={24} />
            </button>

            <div className="flex flex-col text-left leading-tight truncate">
              <span className="text-xs text-(--secondary)">Welcome back</span>
              <span className="text-(--text-primary) font-semibold">
                {profile?.name ?? "Loading..."}
              </span>
            </div>
          </div>
          <div className="relative flex items-center w-full md:max-w-xs">
            <Search
              className="absolute left-3 text-gray-400 pointer-events-none"
              size={18}
            />

            <input
              type="text"
              placeholder="Search anything..."
              className="w-full bg-(--bg-card) py-2 pl-10 pr-4 rounded-lg border border-(--border) focus:outline-hidden focus:ring-0 placeholder:text-sm text-sm"
            />
          </div>
          <button
            className="bg-(--bg-card) py-2 px-4 rounded-lg border border-(--border) hover:bg-(--bg-card-hover) hover:cursor-pointer transition-colors duration-200 ease-in-out"
            onClick={() => {
              if (window.confirm("Are you sure you want to logout?")) {
                localStorage.removeItem("token");
                localStorage.removeItem("role");
                navigate("/login", { replace: true });
              }
            }}
          >
            <div className="flex gap-2">
              <LogOutIcon />
              Logout
            </div>
          </button>
        </header>

        <main className=" pb-4 pt-4 overflow-auto flex flex-col flex-1 md:px-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
