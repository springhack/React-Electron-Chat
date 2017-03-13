/**
        Author: SpringHack - springhack@live.cn
        Last modified: 2017-03-13 14:39:53
        Filename: src/client/jsx/App.js
        Description: Created by SpringHack using vim automatically.
**/
import React from 'react';
import {observer} from 'mobx-react';
import {Link} from 'react-router-dom';

import Model from '../model/Model.js';
import IOModel from '../model/WebSocket.js';

export default @observer class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mail : '',
            pass : ''
        };
    }
    render() {
        return (
            <section className='App' onKeyDown={e => this.down(e)}>
                <div className='Flex'>
                    <input placeholder='e-mail address' type='text' onChange={e => this.setState({mail : e.target.value})} />
                    <input placeholder='password' type='password' onChange={e => this.setState({pass : e.target.value})} />
                    <button onClick={() => this.login()}>Login</button>
                    <div className='Link right'>
                        <Link to='/reg'>Register</Link>
                    </div>
                </div>
            </section>
        );
    }
    login() {
        IOModel.login(this.state.mail, this.state.pass)
    }
    down(e) {
        if (e.keyCode == 13)
        {
            e.preventDefault();
            this.login();
        }
    }
}
