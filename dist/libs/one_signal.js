"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = require("./config");
const request_1 = require("./request");
const url = "https://onesignal.com/api/v1/notifications";
const app_id = config.one_signal && config.one_signal.app_id || null;
const rest_key = config.one_signal && config.one_signal.rest_key || null;
const request = new request_1.default({
    headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": `Basic ${rest_key}`
    }
});
exports.default = {
    send(data) {
        return request.post(url, Object.assign({}, data, {
            app_id: app_id
        }));
    },
    sendTo(registrationToken, payload) {
        return this.send(Object.assign({}, payload, {
            include_player_ids: [registrationToken]
        }));
    },
    sendAll(payload) {
        return this.send(Object.assign({}, payload, {
            included_segments: ["All"]
        }));
    },
    broadcast(registrationTokens, payload) {
        return this.send(Object.assign({}, payload, {
            include_player_ids: registrationTokens
        }));
    },
    sendToGroup(groupName, payload) {
        return this.send(Object.assign({}, payload, {
            included_segments: [groupName]
        }));
    },
    broadcastGroup(groupNames, payload) {
        return this.send(Object.assign({}, payload, {
            included_segments: groupNames
        }));
    },
    sendToCondition(conditions, payload) {
        return this.send(Object.assign({}, payload, {
            filters: conditions
        }));
    }
};

//# sourceMappingURL=one_signal.js.map
