import { Document, Schema } from "mongoose";

function autoPopulateAllFields(schema: Schema) {
    let paths = '';
    schema.eachPath(function process(pathname, schemaType) {
        if (pathname == '_id') return;
        if (schemaType instanceof Schema.Types.ObjectId)
            paths += ' ' + pathname;
    });
    
    schema.pre('find' as any, handler);
    schema.pre('findOne' as any, handler);
    schema.pre('save' as any, handler);
    
    function handler(this: Document, next: () => void) {
        this.populate(paths);
        next();
    }
};

export default autoPopulateAllFields;