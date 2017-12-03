'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const SequelizeStatic = require("sequelize");
var fs = require('fs');
var path = require('path');
const config = require("../libs/config");
const eventEmmiter = require("../events/event-emitter");
class Database {
    constructor() {
        this._basename = path.basename(module.filename);
        let dbConfig = config.database;
        this._sequelize = new SequelizeStatic(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);
        this._models = {};
        fs.readdirSync(__dirname).filter((file) => {
            return (file !== this._basename) && (file !== "interfaces") && (file != "hooks") && path.extname(file) != ".map" && file[0] != ".";
        }).forEach((file) => {
            let model = this._sequelize.import(path.join(__dirname, file));
            this._models[model.name] = model;
        });
        Object.keys(this._models).forEach((modelName) => {
            if (typeof this._models[modelName].associate === "function") {
                this._models[modelName].associate(this._models);
            }
        });
        fs.readdirSync(path.join(__dirname, "hooks")).filter((file) => {
            return path.extname(file) != ".map" && file[0] != ".";
        }).forEach((file) => {
            var hook = require(path.join(__dirname, "hooks", file));
            hook(this._models, eventEmmiter);
        });
    }
    getModels() {
        return this._models;
    }
    getSequelize() {
        return this._sequelize;
    }
}
const database = new Database();
exports.schemas = database.getModels();
exports.sequelize = database.getSequelize();

//# sourceMappingURL=index.js.map
