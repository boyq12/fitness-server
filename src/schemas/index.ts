'use strict';

import {Sequelize} from "sequelize";
import * as SequelizeStatic from "sequelize";


var fs = require('fs');
var path = require('path');
import * as config from "../libs/config";
import * as eventEmmiter from "../events/event-emitter";

class Database {
    private _basename: string;
    private _models: any;
    private _sequelize: Sequelize;

    constructor() {
        this._basename = path.basename(module.filename);

        let dbConfig = config.database;
        this._sequelize = new SequelizeStatic(dbConfig.database, dbConfig.username,
            dbConfig.password, dbConfig);
        this._models = ({} as any);

        fs.readdirSync(__dirname).filter((file: string) => {
            return (file !== this._basename) && (file !== "interfaces") && (file != "hooks") && path.extname(file) != ".map" && file[0] != ".";
        }).forEach((file: string) => {
            let model = this._sequelize.import(path.join(__dirname, file));
            this._models[(model as any).name] = model;
        });

        Object.keys(this._models).forEach((modelName: string) => {
            if (typeof this._models[modelName].associate === "function") {
                this._models[modelName].associate(this._models);
            }
        });

        fs.readdirSync(path.join(__dirname, "hooks")).filter((file: string) => {
            return path.extname(file) != ".map" && file[0] != ".";
        }).forEach((file: string) => {
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
export const schemas = database.getModels();
export const sequelize = database.getSequelize();
