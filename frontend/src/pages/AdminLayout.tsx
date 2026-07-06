import { NavLink, Outlet, useNavigate } from "react-router";
import { useProfile } from "../hooks/useAuth";

export const AdminLayout = () => {
  const navigate = useNavigate();
  const { profile } = useProfile();

  return (
    <div className="flex h-screen bg-(--bg-page) text-(--text-primary) ">
      <aside className="w-64 flex flex-col border-r border-(--border) bg-(--primary-light)">
        <div className="p-4 text-xl font-semibold">Asset Manager</div>
        <nav className="flex flex-col gap-1 p-4">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "bg-(--primary) text-xl font-semibold text-(--text-primary) py-2 rounded-md pl-2 transition duration-300 ease-in-out"
                : "bg-(--primary-light) text-xl  text-(--text-primary) py-2 hover:bg-(--primary-hover) hover:pl-2 rounded-md cursor-pointer transition duration-300 ease-in-out"
            }
            to="/admin/dashboard"
          >
            Dashboard
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "bg-(--primary) text-xl font-semibold text-(--text-primary) py-2 rounded-md pl-2 transition duration-300 ease-in-out"
                : "bg-(--primary-light) text-xl  text-(--text-primary) py-2 hover:bg-(--primary-hover) hover:pl-2 rounded-md cursor-pointer transition duration-300 ease-in-out"
            }
            to="/admin/employees"
          >
            Employees
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "bg-(--primary) text-xl font-semibold text-(--text-primary) py-2 rounded-md pl-2 transition duration-300 ease-in-out"
                : "bg-(--primary-light) text-xl  text-(--text-primary) py-2 hover:bg-(--primary-hover) hover:pl-2 rounded-md cursor-pointer transition duration-300 ease-in-out"
            }
            to="/admin/assets"
          >
            Assets
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "bg-(--primary) text-xl font-semibold text-(--text-primary) py-2 rounded-md pl-2 transition duration-300 ease-in-out"
                : "bg-(--primary-light) text-xl  text-(--text-primary) py-2 hover:bg-(--primary-hover) hover:pl-2 rounded-md cursor-pointer transition duration-300 ease-in-out"
            }
            to="/admin/requests"
          >
            Requests
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "bg-(--primary) text-xl font-semibold text-(--primary-light) py-2 rounded-md pl-2 transition duration-300 ease-in-out"
                : "bg-(--primary-light) text-xl  text-(--text-primary) py-2 hover:bg-(--primary-hover) hover:pl-2 rounded-md cursor-pointer transition duration-300 ease-in-out"
            }
            to="/admin/allocations"
          >
            Allocations
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "bg-(--primary) text-xl font-semibold text-(--text-primary) py-2 rounded-md pl-2 transition duration-300 ease-in-out"
                : "bg-(--primary-light) text-xl  text-(--text-primary) py-2 hover:bg-(--primary-hover) hover:pl-2 rounded-md cursor-pointer transition duration-300 ease-in-out"
            }
            to="/admin/logs"
          >
            Logs
          </NavLink>
        </nav>
      </aside>

      <div className="flex flex-col flex-1 ">
        <header className=" h-16 border-(--border) border-b flex items-center justify-end px-6 ">
          <span>Welcome, {profile?.name ?? "Loading..."}</span>

          <button
            className="primary-button ml-4 mb-4"
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

        <main className="px-6 pb-0 pt-0 overflow-hidden flex flex-col flex-1 ">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
