import { Schema, model, Document } from "mongoose";
import { User } from "../models/user";
import { Kind } from "./kind";

export interface Mission extends Document {
  _sponsor: User;
  _kind: Kind;
  _subKind: Kind;
  _agent: User;
  title: string;
  level: number;
  reward: number;
  descritpion: string;
  shortDescritpion: string;
  status: string; // 0. Free, 1. Accepted, 2. Ended, 3. Favorite, 10. Draft
  creationDate: number;
  wishDates: [
    {
      timestamp: number;
      laps: Boolean;
    }
  ];
  finishDate: number;
  proOnly: Boolean;
  place: {
    longitude: number;
    latitude: number;
    address: string;
  };
  rank: number;
  photos: string[];
  tasks: {
    order: number;
    description: string;
    comment: string;
  }[];
}

const MissionSchema = new Schema({
  _sponsor: { type: Schema.Types.ObjectId, ref: "User", autopopulate: true },
  _kind: { type: Schema.Types.ObjectId, ref: "Kind", autopopulate: true },
  _subKind: { type: Schema.Types.ObjectId, ref: "Kind", autopopulate: true },
  _agent: { type: Schema.Types.ObjectId, ref: "User" },
  title: String,
  level: Number,
  reward: Number,
  descritpion: String,
  shortDescritpion: String,
  status: { type: String, default: "free", required: true }, // 0. Free, 1. Accepted, 2. Ended, 3. Favorite, 10. Draft
  creationDate: { type: Date, default: Date.now },
  wishDates: [
    {
      timestamp: Number,
      laps: [{ type: Boolean }]
    }
  ],
  finishDate: Number,
  proOnly: { type: Boolean, default: false, required: true },
  place: {
    longitude: Number,
    latitude: Number,
    address: String
  },
  rank: Number,
  photos: [String],
  tasks: [
    {
      order: Number,
      description: String,
      comment: String
    }
  ]
});

MissionSchema.plugin(require("mongoose-autopopulate"));

const MissionModel = model<Mission>("Mission", MissionSchema);

export default MissionModel;

export async function addMission(mission: Mission, userId: string) {
  try {
    const newMission = new MissionModel({ ...mission, _sponsor: userId });
    await newMission.save();
  } catch (error) {
    throw error;
  }
}

export async function getMissions(query: any, page: number, pageSize: number) {
  try {
    return await MissionModel.find({
      _kind: query.kind,
      _subKind: query.subKind,
      _sponsor: query.sponsory,
      _agent: query.agent,
      level: query.level,
      reward: query.reward,
      proOnly: query.proOnly,
      status: query.status
    })
      .skip(isNaN(page) || isNaN(pageSize) ? 0 : page * pageSize)
      .limit(isNaN(pageSize) ? 1000 : pageSize)
      .populate("_type _subType _sponsor")
      .exec();
  } catch (error) {
    throw error;
  }
}

export async function updateMission(mission: Mission) {
  try {
    return await MissionModel.findOneAndUpdate({ _id: mission._id }, mission, null);
  } catch (error) {
    throw error;
  }
}

export async function deleteMission(missionId: string) {
  try {
    return await MissionModel.findOneAndRemove({ _id: missionId });
  } catch (error) {
    throw error;
  }
}
