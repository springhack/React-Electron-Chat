'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
        Author: SpringHack - springhack@live.cn
        Last modified: 2017-03-13 10:53:28
        Filename: src/server/express_middleware.js
        Description: Created by SpringHack using vim automatically.
**/
var upload = (0, _multer2.default)();

exports.default = function (app) {

    app.use((0, _compression2.default)());
    app.use(_bodyParser2.default.json());
    app.use(_bodyParser2.default.urlencoded({ extended: true }));
    app.use((0, _expressSession2.default)({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: true
        }
    }));
    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'X-Requested-With');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
    });
    app.use(_express2.default.static(_path2.default.resolve(__dirname, '../dist')));

    app.post('/upload', upload.array(), function (req, res, next) {
        console.log(req.body);
        res.json(req.body);
    });
};