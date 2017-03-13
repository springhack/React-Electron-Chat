/**
        Author: SpringHack - springhack@live.cn
        Last modified: 2017-03-13 15:38:46
        Filename: WebSocket.js
        Description: Created by SpringHack using vim automatically.
**/
import io from 'socket.io-client';

import Model from './Model';
import Config from '../config/Config';

let socket = io(Config.getWebSocket());

window.MM = Model;

socket.on('error', error => {
    alert(error.toString());
});

socket.on('chat', (msg, callback) => {
    Model.pushMessage(msg);
    callback();
});

socket.on('data', data => {
    switch (data.type)
    {
        case 'error':
            alert(data.error);
        break;
        case 'login_ok':
            Model.setState({mail : Model.state.mailToLogin});
            location.href = '#/chat';
        break;
        case 'list':
            Model.updateUser(data.list);
        break;
        default:
            alert('unknown server response !');
        break;
    }
});

export default {
    login(mail, pass) {
        Model.setState({mailToLogin : mail});
        socket.emit('data', {
            type : 'login',
            mail : mail,
            pass : pass
        });
    },
    list() {
        socket.emit('data', {
            type : 'list'
        });
        setTimeout(() => this.list(), 10*1000);
    },
    send(msg) {
        socket.emit('data', Object.assign({
            type : 'send'
        }, msg));
        Model.pushMessage(msg);
    }
};
