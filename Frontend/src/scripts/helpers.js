Array.prototype.indexOfObject = function (property, value) {
    for (var i = 0, len = this.length; i < len; i++) {
        if (this[i][property] === value) return i;
    }
    return -1;
};

var getIndexInArrayFromPath = function (path){    
    var substrs = path.split('.');
    return parseInt(substrs[1][substrs[1].length - 1]);
}
