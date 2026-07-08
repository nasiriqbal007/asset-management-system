import { NavLink, Outlet, useNavigate } from "react-router";
import { useState } from "react";
import { useProfile } from "../hooks/useAuth";

export const AdminLayout = () => {
  const navigate = useNavigate();
  const { profile } = useProfile();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-(--bg-page) text-(--text-primary) flex-col md:flex-row">
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-(--primary-light) border-r border-(--border) transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 md:top-0 md:z-auto`}
      >
        <div className="flex items-center justify-between border-b border-(--border) p-4 md:justify-center">
          <div className="text-xl font-semibold">Asset Manager</div>
          <button
            className="primary-button md:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            Close
          </button>
        </div>
        <nav className="flex flex-col gap-1 p-4">
          <NavLink
            className={({ isActive }) =>
              isActive ? "sidebar-link-active" : "sidebar-link-inactive"
            }
            to="/admin/dashboard"
          >
            Dashboard
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "sidebar-link-active" : "sidebar-link-inactive"
            }
            to="/admin/employees"
          >
            Employees
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "sidebar-link-active" : "sidebar-link-inactive"
            }
            to="/admin/assets"
          >
            Assets
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "sidebar-link-active" : "sidebar-link-inactive"
            }
            to="/admin/requests"
          >
            Requests
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "sidebar-link-active" : "sidebar-link-inactive"
            }
            to="/admin/allocations"
          >
            Allocations
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "sidebar-link-active" : "sidebar-link-inactive"
            }
            to="/admin/logs"
          >
            Logs
          </NavLink>
        </nav>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex flex-col flex-1 md:pl-0">
        <header className="h-16 border-(--border) border-b flex items-center justify-between gap-4 px-4 md:px-6">
          <button
            className="primary-button md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            Menu
          </button>
          <span className="flex-1 text-sm md:text-base">
            Welcome, {profile?.name ?? "Loading..."}
          </span>

          <button
            className="primary-button"
            onClick={() => {
              if (window.confirm("Are you sure you want to logout?")) {
                localStorage.removeItem("token");
                localStorage.removeItem("role");
                navigate("/login", { replace: true });
              }
            }}
          >
            Logout
          </button>
        </header>

        <main className="px-4 pb-4 pt-4 overflow-auto flex flex-col flex-1 md:px-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
