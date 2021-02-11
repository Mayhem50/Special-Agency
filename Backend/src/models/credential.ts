import { Document, model, Schema } from "mongoose";
import { User } from "./user";

export interface Credential extends Document {
  email: string;
  password: string;
}

const CredentialSchema = new Schema({
  email: { type: String, lowercase: true, required: true },
  password: { type: String, required: true }
});

const credentialModel = model<Credential>("Credential", CredentialSchema);

export default credentialModel;

export async function getCredential(email: string) {
  try {
    return await credentialModel.findOne({ email });
  } catch (error) {}
}

export async function addCredential(email: string, password: string) {
  try {
    const newCredential = new credentialModel({
      email,
      password
    });

    return await newCredential.save();
  } catch (error) {}
}
