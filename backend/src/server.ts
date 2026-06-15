import "dotenv/config";
import type { Request, NextFunction, Response } from "express";
import { config } from "./config/env.js";
import express from "express";
import { authRouter } from "./routes/auth-routes.js";
import AppError from "./Error/app-error.js";
import { empRouter } from "./routes/emp-routes.js";
import { assetRoute } from "./routes/assets-routes.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//routes
app.use("/api/auth", authRouter);

app.use("/api/employees", empRouter);
app.use("/api/assets", assetRoute);
//errorMiddleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message = err.message || "Something went wrong";
  res.status(statusCode).json({
    success: false,
    error: {
      statusCode,
      message,
    },
  });
});

app.listen(config.port, () => {
  console.log("server running on port ", config.port);
});
