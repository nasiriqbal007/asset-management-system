import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/Signup";
import { AdminLayout } from "./pages/AdminLayout";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/login", element: <Login /> },

  { path: "/admin/signup", element: <SignUp /> },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "dashboard", element: <h1>Dashboard</h1> },
      { path: "employees", element: <h1>Employees</h1> },
      { path: "assets", element: <h1>Assets</h1> },
      { path: "requests", element: <h1>Requests</h1> },
      { path: "allocations", element: <h1>Allocations</h1> },
      { path: "logs", element: <h1>Logs</h1> },
    ],
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
);
