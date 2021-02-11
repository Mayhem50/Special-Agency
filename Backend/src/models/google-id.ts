import { Document, model, Schema } from "mongoose";

export interface GoogleId extends Document {
  id: string;
  email: string;
  name: string;
  token: string;
}

const GoogleIdSchema = new Schema({
  id: { type: String, required: true },
  email: { type: String, lowercase: true, required: true },
  name: String,
  token: String
});

export default model<GoogleId>("Google-ID", GoogleIdSchema);
