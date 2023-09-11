import { Schema, model, Document } from "mongoose";
import { QuestionType } from "./Questions.schema";

export interface TestcaseType extends Document {
  Input: string;
  Output: string;
  Timelimit: number;
  MemoryLimit: number;
  Ques_id: QuestionType["_id"];
}

const TestcaseSchema = new Schema<TestcaseType>({
  Input: { type: String, required: true },
  Output: { type: String, required: true },
  Timelimit: { type: Number, required: true },
  MemoryLimit: { type: Number, required: true },
  Ques_id: { type: Schema.Types.ObjectId, required: true, ref: "questions" },
});

export const TestcaseModel = model<TestcaseType>("testcases", TestcaseSchema);
