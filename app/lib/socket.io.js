'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _express_router = require('./express_router.js');

var _tuling = require('./tuling123.js');

var _tuling2 = _interopRequireDefault(_tuling);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /**
                                                                                                                                                                                                                          Author: SpringHack - springhack@live.cn
                                                                                                                                                                                                                          Last modified: 2017-03-13 16:20:34
                                                                                                                                                                                                                          Filename: socket.io.js
                                                                                                                                                                                                                          Description: Created by SpringHack using vim automatically.
                                                                                                                                                                                                                  **/


var SocketQueue = _defineProperty({}, _tuling2.default.getInfo()['mail'], _tuling2.default.getSocket(_express_router.connection));

var IDUPER = -1;

var SendTimer = function SendTimer() {
    _express_router.connection.execute("select `id`,`from`,`to`,`text` from `chats` where `read`=0 and `id`>? order by `time` desc", [IDUPER], function (err, result, field) {
        var _loop = function _loop(chat) {
            if (chat.id > IDUPER) IDUPER = chat.id;
            if (SocketQueue[chat.to]) {
                try {
                    SocketQueue[chat.to].emit('chat', {
                        from: chat.from,
                        to: chat.to,
                        text: chat.text
                    }, function () {
                        _express_router.connection.execute("update `chats` set `read`=1 where `id`=?", [chat.id], function (err, result, field) {});
                    });
                } catch (e) {
                    //TODO
                }
            }
        };

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = result[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var chat = _step.value;

                _loop(chat);
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        setTimeout(SendTimer, 1000);
    });
};

setTimeout(SendTimer, 1000);

exports.default = function (app) {

    var server = _http2.default.Server(app);
    var IO = (0, _socket2.default)(server);

    IO.on('connection', function (socket) {

        var mail = '';

        socket.on('data', function (data) {
            switch (data.type) {
                case 'login':
                    if (!data.mail || !data.pass) {
                        socket.emit('data', { type: 'error', error: 'params required !' });
                        return;
                    }
                    _express_router.connection.execute("select `mail` from `users` where `mail`=? and `pass`=?", [data.mail, data.pass], function (err, result, field) {
                        if (err || result.length < 1) {
                            socket.emit('data', { type: 'error', error: 'login failed !' });
                            return;
                        }
                        socket.emit('data', { type: 'login_ok' });
                        mail = data.mail;
                        SocketQueue[mail] = socket;
                    });
                    break;
                case 'list':
                    _express_router.connection.execute("select `mail`,`user` from `users`", [], function (err, result, field) {
                        socket.emit('data', { type: 'list', list: [].concat([_tuling2.default.getInfo()], result) });
                    });
                    break;
                case 'send':
                    if (!data.from || !data.to || !data.text) {
                        socket.emit('data', { type: 'error', error: 'params required !' });
                        return;
                    }
                    _express_router.connection.execute("insert into `chats` (`from`,`to`,`text`,`time`,`read`) values (?,?,?,?,0)", [data.from, data.to, data.text, parseInt(new Date().getTime() / 1000)], function (err, result, field) {
                        if (err) {
                            console.log(err);
                            socket.emit('data', { type: 'error', error: 'send failed !' });
                            return;
                        }
                    });
                    break;
                default:
                    socket.emit('data', { type: 'error', error: 'Unknown type !' });
                    break;
            }
        });

        socket.on('error', function (error) {
            try {
                socket.close();
                if (SocketQueue[mail]) delete SocketQueue[mail];
            } catch (e) {
                //TODO
            }
        });

        socket.on('disconnect', function () {
            try {
                if (SocketQueue[mail]) delete SocketQueue[mail];
            } catch (e) {
                //TODO
            }
        });
    });

    return server;
};