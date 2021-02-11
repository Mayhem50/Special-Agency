import { Schema, model, Document } from "mongoose";
import { Mission } from "./mission";
import { User } from "./user";

export interface DrafMission extends Document {
    _user: User;
    _mission: Mission;
}

const DraftMissionSchema = new Schema({
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    _mission : { type: Schema.Types.ObjectId, ref: 'Mission' }
});

const draftModel = model<DrafMission>(
    'Draft-Mission', DraftMissionSchema
);

export async function getDraftMissions(user: User) {
    try {
        return await draftModel.find({_user: user._id});
    } catch (error) {
        throw error;
    }
}

export async function addDraftMission(user: User, mission: Mission){
    try {
        let draft = await draftModel.findOne({_user: user._id, _mission: mission._id});
        if(draft) return;
        draft = new draftModel({
            _user: user._id,
            _mission: mission._id
        });
        await draft.save();
    } catch (error) {
        throw error;
    }
}

export async function deleteDraftMission(user: User, mission: Mission) {
    try {
        const draft = await draftModel.findOne({_user: user._id, _mission: mission._id});
        if(!draft) throw new Error('Object does not exist');
        await draft.remove();
    } catch (error) {
        throw error;
    }
}