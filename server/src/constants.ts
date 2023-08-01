import { config } from "dotenv";
import { z } from "zod";
config();
export const PORT = process.env.PORT || 8080;
export const JWT_SECRET = process.env.JWT_SECRET!;
z.string().parse(JWT_SECRET);
// export const MONGODB_URL = process.env.MONGODB_URL!;
// z.string().parse(MONGODB_URL); // This will throw error if MONGODB_URL is not a valid string
