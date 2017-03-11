/**
        Author: SpringHack - springhack@live.cn
        Last modified: 2017-03-11 21:06:54
        Filename: src/client/jsx/App.js
        Description: Created by SpringHack using vim automatically.
**/
import React from 'react';
import {observer} from 'mobx-react';

import Model from '../model/Model.js';

export default @observer class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mail : '',
            pass : ''
        };
    }
    render() {
        return (
            <section className='App'>
                <div className='Flex'>
                    <input placeholder='e-mail address' type='text' onChange={e => this.setState({mail : e.target.value})} />
                    <input placeholder='password' type='password' onChange={e => this.setState({pass : e.target.value})} />
                    <button onClick={() => this.login()}>Login</button>
                    <div className='Link right'>
                        <a href='#/reg'>Register</a>
                    </div>
                </div>
            </section>
        );
    }
    login() {
        //TODO
    }
}
