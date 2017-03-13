'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
        Author: SpringHack - springhack@live.cn
        Last modified: 2017-03-11 15:09:51
        Filename: express_config.js
        Description: Created by SpringHack using vim automatically.
**/
var config = ['truse proxy'];

exports.default = function (app) {
    for (var key in config) {
        app.set(key, config[key]);
    }
};