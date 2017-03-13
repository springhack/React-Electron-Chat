/**
        Author: SpringHack - springhack@live.cn
        Last modified: 2017-03-13 16:20:34
        Filename: socket.io.js
        Description: Created by SpringHack using vim automatically.
**/
import io from 'socket.io';
import http from 'http';

import {connection} from './express_router.js';
import tuling from './tuling123.js';

const SocketQueue = {
    [tuling.getInfo()['mail']] : tuling.getSocket(connection)
};

let IDUPER = -1;

let SendTimer = () => {
    connection.execute("select `id`,`from`,`to`,`text` from `chats` where `read`=0 and `id`>? order by `time` desc", [IDUPER], (err, result, field) => {
        for (let chat of result)
        {
            if (chat.id > IDUPER)
                IDUPER = chat.id;
            if (SocketQueue[chat.to])
            {
                try {
                    SocketQueue[chat.to].emit('chat', {
                        from : chat.from,
                        to : chat.to,
                        text : chat.text
                    }, () => {
                        connection.execute("update `chats` set `read`=1 where `id`=?", [chat.id], (err, result, field) => {});
                    });
                } catch (e) {
                    //TODO
                }
            }
        }
        setTimeout(SendTimer, 1000)
    });
};

setTimeout(SendTimer, 1000);

export default app => {

    let server = http.Server(app);
    let IO = io(server);

    IO.on('connection', function (socket) {

        let mail = '';

        socket.on('data', data => {
            switch (data.type)
            {
                case 'login':
                    if (!data.mail || !data.pass)
                    {
                        socket.emit('data', {type : 'error', error : 'params required !'});
                        return;
                    }
                    connection.execute("select `mail` from `users` where `mail`=? and `pass`=?", [data.mail, data.pass], (err, result, field) => {
                        if (err || result.length < 1)
                        {
                            socket.emit('data', {type : 'error', error : 'login failed !'});
                            return;
                        }
                        socket.emit('data', {type : 'login_ok'});
                        mail = data.mail;
                        SocketQueue[mail] = socket;
                    });
                break;
                case 'list':
                    connection.execute("select `mail`,`user` from `users`", [], (err, result, field) => {
                        socket.emit('data', {type : 'list', list : [].concat([tuling.getInfo()], result)});
                    });
                break;
                case 'send':
                    if (!data.from || !data.to || !data.text)
                    {
                        socket.emit('data', {type : 'error', error : 'params required !'});
                        return;
                    }
                    connection.execute("insert into `chats` (`from`,`to`,`text`,`time`,`read`) values (?,?,?,?,0)", [
                        data.from, data.to, data.text, parseInt((new Date()).getTime()/1000)
                    ], (err, result, field) => {
                        if (err)
                        {
                            console.log(err);
                            socket.emit('data', {type : 'error', error : 'send failed !'});
                            return;
                        }
                    });
                break;
                default:
                    socket.emit('data', {type : 'error', error : 'Unknown type !'});
                break;
            }
        });

        socket.on('error', error => {
            try {
                socket.close();
                if (SocketQueue[mail])
                    delete SocketQueue[mail];
            } catch (e) {
                //TODO
            }
        });

        socket.on('disconnect', () => {
            try {
                if (SocketQueue[mail])
                    delete SocketQueue[mail];
            } catch (e) {
                //TODO
            }
        });

    });

    return server;

};
