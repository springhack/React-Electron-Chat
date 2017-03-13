'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.connection = undefined;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _mysql = require('mysql2');

var _mysql2 = _interopRequireDefault(_mysql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var connection = _mysql2.default.createConnection({
    host: 'localhost',
    user: 'root',
    charset: 'utf8',
    password: 'sksks',
    database: 'chat'
}); /**
            Author: SpringHack - springhack@live.cn
            Last modified: 2017-03-13 10:29:12
            Filename: src/server/express_router.js
            Description: Created by SpringHack using vim automatically.
    **/
exports.connection = connection;

exports.default = function (app) {

    app.post('/api/register', function (req, res) {
        if (!req.body.mail || !req.body.pass || !req.body.user) {
            res.end(JSON.stringify({ error: 'params required !' }));
            return;
        }
        if (/^[\w\.\-_]+\@[\w\.\-_]+[\w]$/.test(req.body.mail) && /^[\w\.\-_]{4,20}$/.test(req.body.user) && /^[\w\.\-_]{5,20}$/.test(req.body.pass)) {
            connection.execute("insert into `users` (`mail`,`user`,`pass`) values (?,?,?)", [req.body.mail, req.body.user, req.body.pass], function (err, result, field) {
                if (err) {
                    res.end(JSON.stringify({ error: 'register failed !' }));
                    return;
                }
                res.end(JSON.stringify({ error: null }));
            });
        } else {
            res.end(JSON.stringify({ error: 'illegal params !' }));
            return;
        }
    });
};