'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tuling = {
    getInfo: function getInfo() {
        return {
            mail: 'i-am-robot@dosk.win',
            user: 'Tuling-Robot'
        };
    },
    getSocket: function getSocket(connection) {
        return {
            emit: function emit(type, chat, func) {
                func();
                (0, _nodeFetch2.default)('http://www.tuling123.com/openapi/api', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'applicaiont/json'
                    },
                    body: JSON.stringify({
                        key: '1d2e1ae593f0bc92aec78963335234ec',
                        info: chat.text,
                        userid: chat.from
                    })
                }).then(function (res) {
                    return res.json();
                }).then(function (json) {
                    connection.execute("insert into `chats` (`from`,`to`,`text`,`time`,`read`) values (?,?,?,?,0)", [Tuling.getInfo()['mail'], chat.from, json.text, parseInt(new Date().getTime() / 1000)], function (err, result, field) {
                        if (err) {
                            console.log(err);
                            return;
                        }
                    });
                }).catch(function (error) {
                    connection.execute("insert into `chats` (`from`,`to`,`text`,`time`,`read`) values (?,?,?,?,0)", [Tuling.getInfo()['mail'], chat.from, 'Robot error: ' + error.toString(), parseInt(new Date().getTime() / 1000)], function (err, result, field) {
                        if (err) {
                            console.log(err);
                            return;
                        }
                    });
                });
            }
        };
    }
}; /**
           Author: SpringHack - springhack@live.cn
           Last modified: 2017-03-13 16:27:18
           Filename: src/server/tuling123.js
           Description: Created by SpringHack using vim automatically.
   **/
exports.default = Tuling;