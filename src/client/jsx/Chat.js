/**
        Author: SpringHack - springhack@live.cn
        Last modified: 2017-03-13 10:55:01
        Filename: src/client/jsx/Chat.js
        Description: Created by SpringHack using vim automatically.
**/
import React from 'react';
import {observer} from 'mobx-react';

import User from './User';
import Show from './Show';

import Model from '../model/Model';
import IOModel from '../model/WebSocket';

const electron = imports('electron');

export default @observer class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <section className='Chat'>
                <aside>
                    {Model.userlist.filter(x => (x.mail != Model.state.mail)).map((u, i) => <User {...u} key={i} index={i} />)}
                </aside>
                <Show />
            </section>
        );
    }
    componentDidMount() {
        if (Model.state.mail == '' || Model.state.mailToLogin != Model.state.mail)
        {
            location.href = '#/';
            return;
        }
        if (electron)
            electron.ipcRenderer.send('chat', '');
        IOModel.list();
    }
}
