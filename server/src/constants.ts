import { config } from "dotenv";
import { z } from "zod";
config();
export const PORT = process.env.PORT || 8080;
export const JWT_SECRET = process.env.JWT_SECRET!;
export const SQS_URL = process.env.SQS_URL!;
export const AWS_REGION = process.env.AWS_REGION!;
export const RUNNER_INTERVAL_IN_MS = +process.env.RUNNER_INTERVAL_IN_MS!;

z.number().parse(RUNNER_INTERVAL_IN_MS);
z.string().parse(SQS_URL);
z.string().parse(JWT_SECRET);

export const DIRPATH = __dirname;
// export const MONGODB_URL = process.env.MONGODB_URL!;
// z.string().parse(MONGODB_URL); // This will throw error if MONGODB_URL is not a valid string
