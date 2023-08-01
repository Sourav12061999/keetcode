import { Schema, model, Document } from "mongoose";
import { DescriptionType } from "./Description.schema";
import { TagType } from "./Tag.schema";
import { UserType } from "./Users.schema";

export interface QuestionType extends Document {
  Title: string;
  Tags: TagType["_id"][];
  Difficulty: "Easy" | "Medium" | "Hard";
  Description_id: DescriptionType["_id"];
  Creator_id: UserType["_id"];
}

const QuestionSchema = new Schema<QuestionType>({
  Title: { type: String, required: true, unique: true },
  Tags: [{ type: Schema.Types.ObjectId, required: true, ref: "tags" }],
  Difficulty: { type: String, required: true },
  Description_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "descriptions",
  },
  Creator_id: { type: Schema.Types.ObjectId, required: true, ref: "users" },
});
export const QuestionModel = model<QuestionType>("questions", QuestionSchema);
