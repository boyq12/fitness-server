"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var router = express.Router();
const v1 = require("../../controllers/v1");
const auth_1 = require("auth");
const data_gather_1 = require("middlewares/data-gather");
// router.use(mIsAuthorized);
router.use(auth_1.authenticate.mIsAuthorized);
router.use(data_gather_1.default.gatherData);
let ignores = ["default", "token", "helper"];
for (let key of Object.keys(v1)) {
    if (ignores.contains(key))
        continue;
    let api = v1[key];
    console.log(key);
    router.get(`/${key}`, api.list);
    router.get(`/${key}/:id`, api.retrieve);
    router.post(`/${key}`, api.create);
    router.put(`/${key}/:id?`, api.update);
    router.delete(`/${key}/:id`, api.destroy);
}
let schedule = v1[`schedule`];
router.post(`/schedule/gym`, schedule.createGymSchedule);
module.exports = router;

//# sourceMappingURL=index.js.map
