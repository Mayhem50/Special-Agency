import { Schema, model, Document } from "mongoose";

export interface Kind extends Document {
  name: {
    en: string;
    fr: string;
  };

  image: {
    path: string;
    xOffset: string;
    yOffset: string;
    scale: string;
    toolBarXOffset: string;
    toolBarYOffset: string;
    toolbarScale: string;
  };
  color: string;
  css: string;
  isTop: Boolean;
  size: number;
  count: number;
  _parent?: Kind;
}

const KindSchema = new Schema({
  name: {
    en: { type: String, lowercase: true, required: true },
    fr: { type: String, lowercase: true }
  },
  image: {
    path: String,
    xOffset: String,
    yOffset: String,
    scale: String,
    toolBarXOffset: String,
    toolBarYOffset: String,
    toolbarScale: String
  },
  color: String,
  css: String,
  isTop: Boolean,
  size: Number,
  count: Number,
  _parent: { type: Schema.Types.ObjectId, ref: "Kind" }
});

const kindModel = model<Kind>("Kind", KindSchema);

export default kindModel;

export async function addKind(kind: Kind) {
  try {
    const newKind = new kindModel(kind);
    newKind.name.en = kind.name.en.replace(/^./, kind.name.en[0].toUpperCase());
    newKind.name.fr = kind.name.fr.replace(/^./, kind.name.fr[0].toUpperCase());
    await newKind.save();
  } catch (error) {
    throw error;
  }
}

export async function getKinds() {
  try {
    return await kindModel.find({isTop: true});
  } catch (error) {}
}

export async function getSubKinds(id: string) {
  try {
    return await kindModel.findOne({_parent: id as any, isTop: false});
  } catch (error) {}
}
