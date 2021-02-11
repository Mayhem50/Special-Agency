import { Schema, model, Document } from "mongoose";

export interface Translation extends Document {
  lang: string;
  element: string;
  texts: Object;
}

const TranslationSchema = new Schema({
  lang: String,
  element: String,
  texts: Object
});

const translationModel = model<Translation>("Translation", TranslationSchema);

export default translationModel;

export async function getAllTranslations() {
  try {
    return await translationModel.find({});
  } catch (error) {
    throw error;
  }
}

export async function getTranslationElement(element: string, lang: string = 'en') {
  try {
    return await translationModel.findOne({
        element, lang
    });
  } catch (error) {
    throw error;
  }
}
