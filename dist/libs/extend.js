String.prototype.contains = function (value) {
    return this.indexOf(value) > -1;
};
String.prototype.replaceAll = function (search, replacement) {
    return this.replace(new RegExp(search, 'g'), replacement);
};
String.prototype.capitalize = function (separate) {
    return this && this.split(separate || " ").map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(separate || " ") || this;
};
Array.prototype.count = function () {
    return this.length;
};
Array.prototype.contains = function (value) {
    return this.indexOf(value) > -1;
};

//# sourceMappingURL=extend.js.map
