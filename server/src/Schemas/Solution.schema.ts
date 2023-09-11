import { Schema, model, Document } from "mongoose";
import { SolutionStatus } from "src/global.types";
import { LangType } from "./Lang.schema";
import { QuestionType } from "./Questions.schema";
import { UserType } from "./Users.schema";

export interface SolType extends Document {
  Ques_id: QuestionType["_id"];
  User_id: UserType["_id"];
  Time_taken?: number;
  Lang_id: LangType["_id"];
  Status: SolutionStatus;
  Error?: string;
}

const SolSchema = new Schema<SolType>({
  Ques_id: { type: Schema.Types.ObjectId, required: true, ref: "questions" },
  User_id: { type: Schema.Types.ObjectId, required: true, ref: "users" },
  Time_taken: { type: Schema.Types.ObjectId, required: false },
  Lang_id: { type: Schema.Types.ObjectId, required: true, ref: "langs" },
  Status: { type: String, required: true },
  Error: { type: String, required: false },
});

export const SolModel = model<SolType>("solutions", SolSchema);
