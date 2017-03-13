/**
        Author: SpringHack - springhack@live.cn
        Last modified: 2017-03-13 10:29:12
        Filename: src/server/express_router.js
        Description: Created by SpringHack using vim automatically.
**/
import path from 'path';
import fs from 'fs';

import mysql from 'mysql2';

const connection = mysql.createConnection({
    host :'localhost',
    user : 'root',
    charset : 'utf8',
    password : 'sksks',
    database : 'chat'
});

export {connection};

export default app => {

    app.post('/api/register', (req, res) => {
        if (!req.body.mail || !req.body.pass || !req.body.user)
        {
            res.end(JSON.stringify({error : 'params required !'}));
            return;
        }
        if (/^[\w\.\-_]+\@[\w\.\-_]+[\w]$/.test(req.body.mail) && /^[\w\.\-_]{4,20}$/.test(req.body.user) && /^[\w\.\-_]{5,20}$/.test(req.body.pass))
        {
            connection.execute("insert into `users` (`mail`,`user`,`pass`) values (?,?,?)", [req.body.mail, req.body.user, req.body.pass], (err, result, field) => {
                if (err)
                {
                    res.end(JSON.stringify({error : 'register failed !'}));
                    return;
                }
                res.end(JSON.stringify({error : null}));
            });
        } else {
            res.end(JSON.stringify({error : 'illegal params !'}));
            return;
        }
    });

};
