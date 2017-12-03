"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = require("./config");
exports.default = {
    generateSchedule(duration, gymList, preScheduleGyms, isBeginner, frequency, frequencyCount, gymLike, caloriesLimit, gender, weight, height, age) {
        let result = [];
        let brmr = this.calculateBRM(gender, weight, height, age);
        for (let i = 0; i < duration; i++) {
            console.log(`Generate for ${i}th day`);
            let each = [];
            let totalCalories = 0;
            while (totalCalories < caloriesLimit && each.length != gymList.length) {
                let priorityGyms = [];
                for (let j = 0; j < gymList.length; j++) {
                    let pointBeginer = 0;
                    let pointPreScheduleDay = 0;
                    let pointSameType = 0;
                    let pointMuscleCount = 0;
                    let pointFrequency = 0;
                    let pointLike = 0;
                    let selectGym = gymList[j];
                    for (let t = 0; t < preScheduleGyms.length; t++) {
                        let exist = preScheduleGyms[t].filter(g => g.id == selectGym.id);
                        if (exist) {
                            pointPreScheduleDay = (t + 1) / preScheduleGyms.length;
                        }
                    }
                    let sameTypeGyms = each.filter(g => g.muscle_id == selectGym.muscle_id);
                    pointSameType = sameTypeGyms.length / each.length || 0;
                    pointMuscleCount = sameTypeGyms.length ? 0 : 1;
                    pointFrequency = frequency / frequencyCount || 0;
                    let point = this.calculateGymPoint(pointBeginer, pointPreScheduleDay, pointSameType, pointMuscleCount, pointLike, pointFrequency);
                    let index = this.findPosition(priorityGyms, point);
                    priorityGyms.splice(index, 0, {
                        point: point,
                        gym: selectGym
                    });
                }
                console.log("#######################", priorityGyms.length);
                priorityGyms = priorityGyms.filter(g => each.filter(e => e.id == g.gym.id).length == 0);
                console.log("#######################", priorityGyms.length);
                if (priorityGyms.length == 0) {
                    break;
                }
                else {
                    console.log(priorityGyms[0].gym);
                    each.push(priorityGyms[0].gym);
                    totalCalories += this.calculateCaloriesBurn(priorityGyms[0].gym.met_2, brmr, weight, 30);
                }
            }
            result[i] = each;
        }
        return result;
    },
    findPosition(array, value) {
        for (let i = 0; i < array.length; i++) {
            if (array[i].point < value) {
                return i;
            }
        }
        return 0;
    },
    calculateGymPoint(pointBeginer, pointPreScheduleDay, pointSameType, pointMuscleCount, pointLike, pointFrequency) {
        let sum = pointBeginer * config.schedule.beginerFactor +
            pointPreScheduleDay * config.schedule.limitDateFactor +
            pointSameType * config.schedule.sameTypeFactor +
            pointMuscleCount * config.schedule.moreTypeFactor +
            pointLike * config.schedule.likeFactor +
            pointFrequency * config.schedule.frequencyFactor;
        return sum;
    },
    calculateBRM(gender, weight, height, age) {
        //male gender == 1
        if (gender == 1) {
            return 66.4730 + 5.0033 * height + 13.7516 * weight - 6.7550 * age;
        }
        else {
            return 655.0955 + 1.8496 * height + 9.5634 * weight - 4.6756 * age;
        }
    },
    calculateCaloriesBurn(met, brmr, weight, duration) {
        let correct_met = this.calculateCorrectedMet(met, brmr, weight);
        return duration * correct_met * brmr / 1440;
    },
    calculateCorrectedMet(met, brmr, weight) {
        return met * 3.5 / (brmr / (1.440 * 5 * weight));
    }
};

//# sourceMappingURL=schedule_engine.js.map
