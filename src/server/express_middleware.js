/**
        Author: SpringHack - springhack@live.cn
        Last modified: 2017-03-13 10:53:28
        Filename: src/server/express_middleware.js
        Description: Created by SpringHack using vim automatically.
**/
import compression from 'compression';
import bodyparser from 'body-parser';
import session from 'express-session';
import express from 'express';
import multer from 'multer';
import path from 'path';

const upload = multer();

export default app => {

    app.use(compression());
    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({ extended: true }));
    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: true
        }
    }));
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'X-Requested-With');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
    });
    app.use(express.static(path.resolve(__dirname, '../dist')));

    app.post('/upload', upload.array(), (req, res, next) => {
        console.log(req.body);
        res.json(req.body);
    });

};
