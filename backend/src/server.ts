import "dotenv/config";
import express from "express";
import { config } from "./config/env.js";
import { pool } from "./db/pool.js";
import { authRouter } from "./routes/auth-routes.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRouter);
app.use("/api/profile", authRouter);

app.listen(config.port, () => {
  console.log("server running on port ", config.port);
});
