"use strict";
var express = require('express');
var router = express.Router();
var v1 = require("./v1");
router.use("/api/v1", v1);
router.all('/test', function (req, res) {
    res.send({
        query: req.query,
        body: req.body,
        params: req.params,
        headers: req.headers,
        files: req.files
    });
});
router.get('/home', function (req, res) {
    res.render('index');
});
router.get('/socket', function (req, res) {
    res.render('socket-console');
});
module.exports = router;

//# sourceMappingURL=index.js.map
