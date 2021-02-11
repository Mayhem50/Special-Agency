import { Schema, model, Document } from "mongoose";
import { User } from "./user";

export interface Socket extends Document {
  _user: User;
  socket: string;
}

const SocketSchema = new Schema({
  _user: { type: Schema.Types.ObjectId, ref: "User" },
  socket: String
});

const socketModel = model<Socket>("Socket", SocketSchema);

export default socketModel;

export async function remove(user: User) {
  try {
    await socketModel.findOneAndRemove({ _user: user._id });
  } catch (error) {
    throw error;
  }
}

export async function insertOrUpdate(user: User, socket: Socket) {
  try {
    await socketModel.findOneAndUpdate({ _user: user._id }, { socket: socket.id }, { upsert: true });
  } catch (error) {
    throw error;
  }
}
