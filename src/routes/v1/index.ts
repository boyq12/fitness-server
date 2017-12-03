var express = require('express');
var router = express.Router();
import * as v1 from "../../controllers/v1";
import {authenticate} from "auth";
import dataGather from "middlewares/data-gather";

// router.use(mIsAuthorized);
router.use(authenticate.mIsAuthorized);
router.use(dataGather.gatherData);

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
