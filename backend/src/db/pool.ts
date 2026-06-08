import pg from "pg";
import { config } from "../config/env.js";
const { Pool } = pg;
if (!config.dbUrl) {
  console.error("database string is not loaded yet");
  process.exit(1);
}
export const pool = new Pool({
  connectionString: config.dbUrl,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error(`Database connection failed: ${err}`);
  } else {
    console.log(" Database connected!");
  }
});
