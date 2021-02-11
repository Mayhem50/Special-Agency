import { Schema, model, Document } from "mongoose";
import { User } from "./user";

export interface Agenda extends Document {
  _user: User;
}

const AgendaSchema = new Schema({
  _user: { type: Schema.Types.ObjectId, ref: "User", autopopulate: true }
});

export default model("Agenda", AgendaSchema);
