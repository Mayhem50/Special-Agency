
function autoPopulateAllFields(schema) {
    var paths = '';
    schema.eachPath(function process(pathname, schemaType) {
        if (pathname == '_id') return;
        if (schemaType.options.ref)
            paths += ' ' + pathname;
    });
    
    schema.pre('find', handler);
    schema.pre('findOne', handler);
    schema.pre('save', handler);
    
    function handler(next) {
        this.populate(paths);
        next();
    }
};

module.exports = autoPopulateAllFields;