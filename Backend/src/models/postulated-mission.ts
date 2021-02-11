import { Schema, model, Document } from "mongoose";
import { Mission } from "./mission";
import { User } from "./user";

export interface PostulatedMission extends Document {
    _user: User;
    _mission: Mission;
}

const PostulatedMissionSchema = new Schema({
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    _mission : { type: Schema.Types.ObjectId, ref: 'Mission' }
});

const postulatedModel = model<PostulatedMission>(
    'Postulated-Mission', PostulatedMissionSchema
);

export async function getPostulatedMissions(user: User) {
    try {
        return await postulatedModel.find({_user: user._id});
    } catch (error) {
        throw error;
    }
}

export async function addPostulatedMission(user: User, mission: Mission){
    try {
        let draft = await postulatedModel.findOne({_user: user._id, _mission: mission._id});
        if(draft) return;
        draft = new postulatedModel({
            _user: user._id,
            _mission: mission._id
        });
        await draft.save();
    } catch (error) {
        throw error;
    }
}

export async function deletePostulatedMission(user: User, mission: Mission) {
    try {
        const draft = await postulatedModel.findOne({_user: user._id, _mission: mission._id});
        if(!draft) throw new Error('Object does not exist');
        await draft.remove();
    } catch (error) {
        throw error;
    }
}