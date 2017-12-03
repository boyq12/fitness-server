"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AController_1 = require("../interfaces/AController");
const schemas_1 = require("../../schemas");
const response_template_1 = require("../../helpers/common/response-template");
const config = require("../../libs/config");
const schedule_engine_1 = require("../../libs/schedule_engine");
class Schedule extends AController_1.AController {
    async retrieve(req, res) {
        try {
            let id = req.params.id;
            return res.send(response_template_1.default.success({
                success: true,
                data: {}
            }));
        }
        catch (error) {
            console.error(error.stack);
            return res.send(response_template_1.default.error({
                code: 404,
                message: "Internal Error",
                error: error
            }));
        }
    }
    async createGymSchedule(req, res) {
        try {
            let { duration, userId } = req.body;
            let target = await schemas_1.schemas.Target.findOne({
                where: {
                    user_id: userId
                }
            });
            let user = await schemas_1.schemas.User.findOne({
                where: {
                    id: userId
                },
                include: [{ model: schemas_1.schemas.Information }]
            });
            if (!target) {
                return res.send(response_template_1.default.error({
                    code: 404,
                    message: "No target found",
                    error: null
                }));
            }
            let gyms = await schemas_1.schemas.Gym.findAll({
                where: {
                    muscle_id: {
                        in: target.muscle_ids
                    }
                }
            });
            if (!gyms) {
                gyms = await schemas_1.schemas.Gym.findAll();
            }
            console.log("111111111111111111111111111111111");
            let timeNow = new Date();
            timeNow.setHours(0);
            timeNow.setMinutes(0);
            let dateNow = timeNow.getDate();
            let beginnerTime = new Date();
            beginnerTime.setDate(dateNow - config.schedule.beginnerTime);
            beginnerTime.setHours(0);
            beginnerTime.setMinutes(0);
            let scheduleInPreBeginnerTime = await schemas_1.schemas.Schedule.findOne({
                where: {
                    time: {
                        $lt: beginnerTime
                    },
                    user_id: userId
                }
            });
            console.log("111111111111111111111111111111111");
            let limitTimeForGym = new Date();
            limitTimeForGym.setDate(dateNow - config.schedule.limitDate);
            limitTimeForGym.setHours(0);
            limitTimeForGym.setMinutes(0);
            let preLimitScheduleDay = await schemas_1.schemas.Schedule.findAll({
                where: {
                    time: {
                        $gt: limitTimeForGym
                    },
                    user_id: userId
                }
            });
            let limitTimeFrequency = new Date();
            limitTimeFrequency.setDate(dateNow - config.schedule.frequencyRange);
            limitTimeFrequency.setHours(0);
            limitTimeFrequency.setMinutes(0);
            let frequency = await schemas_1.schemas.Schedule.findAll({
                where: {
                    time: {
                        $gt: limitTimeFrequency
                    },
                    user_id: userId
                },
                group: ["gym_id", "id"],
                attribute: ["gym_id", [schemas_1.sequelize.fn("COUNT", "gym_id"), "gym_count"]]
            });
            //result
            let result = [];
            //get preDayGyms
            let preScheduleByDate = [];
            for (let i = 0; i < config.schedule.limitDate; i++) {
                let selectTime = new Date();
                selectTime.setDate(dateNow - (i + 1));
                selectTime.setHours(0);
                selectTime.setMinutes(0);
                preLimitScheduleDay[i] = preLimitScheduleDay.filter(g => (g.created_at >= selectTime && g.created_at < timeNow));
            }
            //isBeginner
            let beginner = true;
            if (scheduleInPreBeginnerTime) {
                beginner = false;
            }
            //fequency
            let sumCount = 0;
            if (!frequency) {
                frequency.forEach(f => {
                    sumCount += f.gym_count;
                });
            }
            let gender = user.gender;
            let weight = user.Information.filter(v => v.name == "Weight")[0].value;
            let height = user.Information.filter(v => v.name == "Height")[0].value;
            let age = user.Information.filter(v => v.name == "Age")[0].value;
            let newSchedule = schedule_engine_1.default.generateSchedule(7, gyms, preScheduleByDate, beginner, frequency, sumCount, [], 800, gender, weight, height, age);
            //generated newSchedule
            await schemas_1.schemas.Schedule.destroy({
                where: {
                    time: {
                        $gte: timeNow
                    },
                    user_id: userId
                }
            });
            for (let i = 0; i < newSchedule.length; i++) {
                let time = new Date();
                time.setHours(0);
                time.setMinutes(0);
                time.setDate(dateNow + i);
                let a = newSchedule[i].map(g => ({
                    time: time,
                    gym_id: g.id,
                    user_id: userId
                }));
                await schemas_1.schemas.Schedule.bulkCreate(a);
            }
            let resultData = await schemas_1.schemas.Schedule.findAll({
                where: {
                    time: {
                        $gte: timeNow
                    },
                    user_id: userId
                },
                order: ["time"]
            });
            return res.send(response_template_1.default.success({
                success: true,
                data: resultData
            }));
        }
        catch (error) {
            console.error(error.stack);
            return res.send(response_template_1.default.error({
                code: 404,
                message: "Internal Error",
                error: error
            }));
        }
    }
}
const schedule = new Schedule();
module.exports = schedule;

//# sourceMappingURL=schedule.js.map
