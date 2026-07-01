import { NavLink, Outlet, useNavigate } from "react-router";
import { useProfile } from "../hooks/useAuth";

export const AdminLayout = () => {
  const navigate = useNavigate();
  const { profile } = useProfile();

  return (
    <div className="flex h-screen bg-(--bg-page) text-(--text-primary) ">
      <aside className="w-64 flex flex-col border-r border-(--border) bg-(--primary-light)">
        <div className="p-4 text-xl font-bold">Asset Manager</div>
        <nav className="flex flex-col gap-1 p-4">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "bg-(--primary) text-xl font-bold text-(--text-primary) py-2 rounded-md pl-2 transition duration-300 ease-in-out"
                : "bg-(--primary-light) text-xl  text-(--text-primary) py-2 hover:bg-(--primary-hover) rounded-md cursor-pointer transition duration-300 ease-in-out"
            }
            to="/admin/dashboard"
          >
            Dashboard
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "bg-(--primary) text-xl font-bold text-(--text-primary) py-2 rounded-md pl-2 transition duration-300 ease-in-out"
                : "bg-(--primary-light) text-xl  text-(--text-primary) py-2 hover:bg-(--primary-hover) rounded-md cursor-pointer transition duration-300 ease-in-out"
            }
            to="/admin/employees"
          >
            Employees
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "bg-(--primary) text-xl font-bold text-(--text-primary) py-2 rounded-md pl-2 transition duration-300 ease-in-out"
                : "bg-(--primary-light) text-xl  text-(--text-primary) py-2 hover:bg-(--primary-hover) rounded-md cursor-pointer transition duration-300 ease-in-out"
            }
            to="/admin/assets"
          >
            Assets
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "bg-(--primary) text-xl font-bold text-(--text-primary) py-2 rounded-md pl-2 transition duration-300 ease-in-out"
                : "bg-(--primary-light) text-xl  text-(--text-primary) py-2 hover:bg-(--primary-hover) rounded-md cursor-pointer transition duration-300 ease-in-out"
            }
            to="/admin/requests"
          >
            Requests
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "bg-(--primary) text-xl font-bold text-(--text-primary) py-2 rounded-md pl-2 transition duration-300 ease-in-out"
                : "bg-(--primary-light) text-xl  text-(--text-primary) py-2 hover:bg-(--primary-hover) rounded-md cursor-pointer transition duration-300 ease-in-out"
            }
            to="/admin/allocations"
          >
            Allocations
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "bg-(--primary) text-xl font-bold text-(--text-primary) py-2 rounded-md pl-2 transition duration-300 ease-in-out"
                : "bg-(--primary-light) text-xl  text-(--text-primary) py-2 hover:bg-(--primary-hover) rounded-md cursor-pointer transition duration-300 ease-in-out"
            }
            to="/admin/logs"
          >
            Logs
          </NavLink>
        </nav>
      </aside>

      <div className="flex flex-col flex-1">
        <header className="h-16 border-(--border) border-b flex items-center justify-end px-6">
          <span>Welcome, {profile?.name ?? "Loading..."}</span>

          <button
            className="ml-4 bg-(--primary) text-(--text-primary) py-1 px-3 rounded-md hover:bg-(--primary-hover) transition duration-300 ease-in-out"
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

        <main className="p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
