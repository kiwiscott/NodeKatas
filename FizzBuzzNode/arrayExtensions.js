Array.prototype.firstOrDefault = function (callback, defaultReturn) {
    if (this.length == 0) {
        return undefined;
    }
    if (callback == null) {
        return this[0];
    } else {
        for (var i = 0; i < this.length; i++) {
            if (callback(this[i])) {
                return this[i];
            }
        }
    }
    return defaultReturn || null;
};

Array.fromNumberRange = function (start, end) {
    result = new Array();

    for (var i = start; i <= end; i++) {
        result.push(i);
    }
    return result;
}

Array.prototype.select = function (selector) {
    var outArray = new Array(this.length);

    for (var i = 0; i < this.length; i++) {
        outArray[i] = selector(this[i]);
    }
    return outArray;
}