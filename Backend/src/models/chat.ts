import { Schema, model, Document } from "mongoose";
import { Mission } from "./mission";
import { User } from "./user";

export interface Chat extends Document {
  _mission: Mission;
  _agent: User;
  _sponsor: User;
  messages: {
    _sender: User;
    _receiver: User;
    date: number;
    message: string;
    tag: string;
  }[];
  date: string;
  sponsorUnreads: number;
  agentUnreads: number;
}

const ChatSchema = new Schema({
  _mission: { type: Schema.Types.ObjectId, ref: "Mission", autopopulate: true },
  _agent: { type: Schema.Types.ObjectId, ref: "User", autopopulate: true },
  _sponsor: { type: Schema.Types.ObjectId, ref: "User", autopopulate: true },
  messages: [
    {
      _sender: { type: Schema.Types.ObjectId, required: true, ref: "User" },
      _receiver: { type: Schema.Types.ObjectId, required: true, ref: "User" },
      date: { type: Date, default: Date.now, required: true },
      message: { type: String },
      tag: { type: String }
    }
  ],
  date: { type: Date, default: Date.now },
  sponsorUnreads: { type: Number, default: 0, required: true },
  agentUnreads: { type: Number, default: 0, required: true }
});

ChatSchema.plugin(require("mongoose-autopopulate"));

const chatModel = model<Chat>("Chat", ChatSchema);

export default chatModel;

export async function addChat(chat: Chat) {
  try {
    const newChat = new chatModel(chat);
    await newChat.save();
  } catch (error) {
    throw error;
  }
}

export async function getUserChats(userId: string) {
  try {
    return await chatModel.find({ $or: [{ _sponsor: userId as any }, { _agent: userId as any }] });
  } catch (error) {
    throw error;
  }
}

export async function getUserMissionChat(userId: string, missionId: string) {
  try {
    return await chatModel.findOne({ _mission: missionId as any, _agent: userId as any });
  } catch (error) {
    throw error;
  }
}
