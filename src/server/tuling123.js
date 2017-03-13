/**
        Author: SpringHack - springhack@live.cn
        Last modified: 2017-03-13 16:27:18
        Filename: src/server/tuling123.js
        Description: Created by SpringHack using vim automatically.
**/
import fetch from 'node-fetch';

const Tuling = {
    getInfo() {
        return {
            mail : 'i-am-robot@dosk.win',
            user : 'Tuling-Robot'
        }
    },
    getSocket(connection) {
        return {
            emit(type, chat, func) {
                func();
                fetch('http://www.tuling123.com/openapi/api', {
                    method : 'POST',
                    headers : {
                        'Content-Type' : 'applicaiont/json'
                    },
                    body : JSON.stringify({
                        key : '1d2e1ae593f0bc92aec78963335234ec',
                        info : chat.text,
                        userid : chat.from
                    })
                })
                .then(res => res.json())
                .then(json => {
                    connection.execute("insert into `chats` (`from`,`to`,`text`,`time`,`read`) values (?,?,?,?,0)", [
                        Tuling.getInfo()['mail'], chat.from, json.text, parseInt((new Date()).getTime()/1000)
                    ], (err, result, field) => {
                        if (err)
                        {
                            console.log(err);
                            return;
                        }
                    });
                })
                .catch(error => {
                    connection.execute("insert into `chats` (`from`,`to`,`text`,`time`,`read`) values (?,?,?,?,0)", [
                        Tuling.getInfo()['mail'], chat.from, `Robot error: ${error.toString()}`, parseInt((new Date()).getTime()/1000)
                    ], (err, result, field) => {
                        if (err)
                        {
                            console.log(err);
                            return;
                        }
                    });
                });
            }
        };
    }
};

export default Tuling;
