interface Array<T> {
  contains(obj: Object): boolean;
  count(): number;
}

interface String {
  contains(obj: Object): boolean;
  replaceAll(target: string, by: string);
  capitalize();
}

String.prototype.contains = function (value): boolean {
  return this.indexOf(value) > -1;
};

String.prototype.replaceAll = function (search, replacement): string {
  return this.replace(new RegExp(search, 'g'), replacement);
};

String.prototype.capitalize = function (separate?: string): string {
    return this && this.split(separate || " ").map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(separate || " ") || this;
}

Array.prototype.count = function (): number {
  return this.length;
};

Array.prototype.contains = function (value): boolean {
  return this.indexOf(value) > -1;
};

