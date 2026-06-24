import { NavLink, Outlet } from "react-router";
import { useProfile } from "../hooks/useAuth";

export const AdminLayout = () => {
  const { profile } = useProfile();

  return (
    <div className="flex h-screen bg-(--bg-page) text-(--text-primary) ">
      <aside className="w-64 flex flex-col border-r border-(--border) bg-(--primary-light)">
        <div className="p-4 text-xl font-bold">Asset Manager</div>
        <nav className="flex flex-col gap-1 p-4">
          <NavLink to="/admin/dashboard">Dashboard</NavLink>
          <NavLink to="/admin/employees">Employees</NavLink>
          <NavLink to="/admin/assets">Assets</NavLink>
          <NavLink to="/admin/requests">Requests</NavLink>
          <NavLink to="/admin/allocations">Allocations</NavLink>
          <NavLink to="/admin/logs">Logs</NavLink>
        </nav>
      </aside>

      <div className="flex flex-col flex-1">
        <header className="h-16 border-(--border) border-b flex items-center justify-end px-6">
          <span>Welcome, {profile?.name ?? "Loading..."}</span>
        </header>

        <main className="p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
