/**
        Author: SpringHack - springhack@live.cn
        Last modified: 2017-03-13 14:17:58
        Filename: src/client/main.js
        Description: Created by SpringHack using vim automatically.
**/
import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Switch, HashRouter} from 'react-router-dom';

import Config from './config/Config.js';
import Chat from './jsx/Chat.js';
import App from './jsx/App.js';
import Reg from './jsx/Reg';

import './less/App.less';

ReactDOM.render(
    <HashRouter>
        <Switch>
            <Route exact strict path='/' component={App} />
            <Route exact strict path='/reg' component={Reg} />
            <Route exact strict path='/chat' component={Chat} />
        </Switch>
    </HashRouter>
, document.getElementById('app'));
