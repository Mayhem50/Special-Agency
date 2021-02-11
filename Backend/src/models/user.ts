import { Schema, model, Document } from "mongoose";
import Util from "util";

export interface User extends Document {
  _credential: Credential;
  email: string;
  firstName: String;
  lastName: String;
  gender: String;
  address: {
    number: String;
    street: String;
    state: String;
    zip: String;
  };
  agentID: String;
  avatar: String;
  rank: Number;
  birthDate: Number | undefined;
  missionsDone: Number;
}

const UserSchema = new Schema({
  _credential: { type: Schema.Types.ObjectId, required: false},
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: {
    number: String,
    street: String,
    state: String,
    zip: String
  },
  agentID: String,
  avatar: String,
  rank: Number,
  birthDate: {type: Date, transform: (value: any) => (new Date(value).getUTCDate())},
  missionsDone: Number,
});

const userModel = model<User>("User", UserSchema);

export default userModel;

export async function getUserById(id: string) {
  try {
    return await userModel.findOne({ _id: id });
  } catch (error) {
    console.error("User does not exist");
    return null;
  }
}

export async function getUserByEmail(email: string) {
  try {
    return await userModel.findOne({ email });
  } catch (error) {
    console.error("User does not exist");
    return null;
  }
}

async function countDocuments() {
  return await userModel.count({});
}

async function generateAgentId() {
  let agentCount = await countDocuments();
  const hundredThousand = agentCount / 100000;
  agentCount -= hundredThousand * 100000;
  const tenThousand = agentCount / 10000;
  agentCount -= tenThousand * 10000;
  const thousand = agentCount / 1000;
  agentCount -= thousand * 1000;
  const hundred = agentCount / 100;
  agentCount -= hundred * 100;
  const ten = agentCount / 10;
  agentCount -= ten * 10;
  const unit = agentCount;

  return Util.format("%d%d%d-%d%d%d", hundredThousand, tenThousand, thousand, hundred, ten, unit);
}

export async function addUser(payload: {
  id: any;
  firstName: String;
  lastName: String;
  gender: String;
  address?: { number: String; street: String; state: String; zip: String } | undefined;
  birthDate: string | number | Date;
  email: string;
}) {
  try {
    const newUser = new userModel(payload);

    if (payload.id) newUser.id = payload.id;

    newUser.firstName = payload.firstName;
    newUser.lastName = payload.lastName;
    newUser.gender = payload.gender;
    newUser.email = payload.email;

    if (payload.address !== undefined) {
      newUser.address.number = payload.address.number;
      newUser.address.street = payload.address.street;
      newUser.address.state = payload.address.state;
      newUser.address.zip = payload.address.zip;
    }

    newUser.agentID = await generateAgentId();
    newUser.avatar =
      "url('data:image/png;base64,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')";
    newUser.rank = 0;
    newUser.birthDate = payload.birthDate ? new Date(payload.birthDate).getUTCDate() : undefined;
    newUser.missionsDone = 0;

    return await newUser.save();
  } catch (error) {
    throw error;
  }
}
