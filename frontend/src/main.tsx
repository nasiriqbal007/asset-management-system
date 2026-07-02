import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/Signup";
import { AdminLayout } from "./pages/AdminLayout";
import { Dashboard } from "./pages/Dashboard";
import { Employees } from "./pages/Employees";
import { EmployeeLayout } from "./pages/EmployeeLayout";
import { Assets } from "./pages/Assets";
import { Requests } from "./pages/Requests";
import { Allocations } from "./pages/Allocations";
import { ActivityLogs } from "./pages/ActivityLogs";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { MyAssets } from "./pages/MyAssets";
import { AvailableAssets } from "./pages/AvailableAssets";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },

  { path: "/login", element: <Login /> },

  { path: "/admin/signup", element: <SignUp /> },
  {
    path: "/admin",

    element: (
      <ProtectedRoute role="admin">
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "employees", element: <Employees /> },
      { path: "assets", element: <Assets /> },
      { path: "requests", element: <Requests /> },
      { path: "allocations", element: <Allocations /> },
      { path: "logs", element: <ActivityLogs /> },
    ],
  },
  {
    path: "/employee",
    element: (
      <ProtectedRoute role="employee">
        <EmployeeLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "available-assets",
        element: <AvailableAssets />,
      },
      { path: "my-assets", element: <MyAssets /> },
    ],
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster position="top-right" />
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
);
