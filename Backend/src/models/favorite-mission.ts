import { Schema, model, Document } from "mongoose";
import { Mission } from "./mission";
import { User } from "./user";

export interface FavoriteMission extends Document {
    _user: User;
    _mission: Mission;
}

const FavoriteMissionSchema = new Schema({
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    _mission : { type: Schema.Types.ObjectId, ref: 'Mission' }
});

const favoriteModel = model<FavoriteMission>(
    'Favorite-Mission', FavoriteMissionSchema
);

export async function getFavoriteMissions(user: User) {
    try {
        return await favoriteModel.find({_user: user._id});
    } catch (error) {
        throw error;
    }
}

export async function addFavoriteMission(user: User, mission: Mission){
    try {
        let draft = await favoriteModel.findOne({_user: user._id, _mission: mission._id});
        if(draft) return;
        draft = new favoriteModel({
            _user: user._id,
            _mission: mission._id
        });
        await draft.save();
    } catch (error) {
        throw error;
    }
}

export async function deleteFavoriteMission(user: User, mission: Mission) {
    try {
        const draft = await favoriteModel.findOne({_user: user._id, _mission: mission._id});
        if(!draft) throw new Error('Object does not exist');
        await draft.remove();
    } catch (error) {
        throw error;
    }
}
