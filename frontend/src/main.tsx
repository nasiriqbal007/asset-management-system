import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/Signup";
import { AdminLayout } from "./pages/AdminLayout";
import { Dashboard } from "./pages/Dashboard";
import { Employees } from "./pages/Employees";
import { Employee } from "./pages/Employee";
import { Assets } from "./pages/Assets";
import { Requests } from "./pages/Requests";
import { Allocations } from "./pages/Allocations";
import { Logs } from "./pages/Logs";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },

{path: "/login", element: <Login /> },

  { path: "/admin/signup", element: <SignUp /> },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "employees", element: <Employees /> },
      { path: "assets", element: <Assets /> },
      { path: "requests", element: <Requests /> },
      { path: "allocations", element: <Allocations /> },
      { path: "logs", element: <Logs /> },
    ],
  },
  { path: "/employee", element: <Employee /> },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
);
