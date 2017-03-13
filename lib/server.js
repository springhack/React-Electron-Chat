'use strict';

require('babel-polyfill');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _express_config = require('./express_config.js');

var _express_config2 = _interopRequireDefault(_express_config);

var _express_middleware = require('./express_middleware.js');

var _express_middleware2 = _interopRequireDefault(_express_middleware);

var _express_router = require('./express_router.js');

var _express_router2 = _interopRequireDefault(_express_router);

var _socketIo = require('./socket.io.js');

var _socketIo2 = _interopRequireDefault(_socketIo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
        Author: SpringHack - springhack@live.cn
        Last modified: 2017-03-13 12:15:26
        Filename: src/server/server.js
        Description: Created by SpringHack using vim automatically.
**/
var app = (0, _express2.default)();

(0, _express_config2.default)(app);
(0, _express_middleware2.default)(app);
(0, _express_router2.default)(app);
var server = (0, _socketIo2.default)(app);

server.listen(process.env.PORT || 3000);