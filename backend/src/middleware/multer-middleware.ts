import multer, { type StorageEngine } from "multer";
import path from "path";
import { fileURLToPath } from "url";
import type { Request } from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const storage: StorageEngine = multer.diskStorage({
  destination: (_req: Request, _file: Express.Multer.File, cb) => {
    cb(null, path.join(__dirname, "..", "..", "uploads"));
  },

  filename: (_req: Request, file: Express.Multer.File, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e6);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 4 * 1024 * 1024 },
});
