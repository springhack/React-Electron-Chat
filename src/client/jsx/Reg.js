/**
        Author: SpringHack - springhack@live.cn
        Last modified: 2017-03-11 21:02:09
        Filename: src/client/jsx/Reg.js
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
            user : '',
            pass : '',
            verp : ''
        };
    }
    render() {
        return (
            <section className='App'>
                <div className='Flex'>
                    <input placeholder='e-mail address' type='text' onChange={e => this.setState({mail : e.target.value})} />
                    <input placeholder='username' type='text' onChange={e => this.setState({user : e.target.value})} />
                    <input placeholder='password' type='password' onChange={e => this.setState({pass : e.target.value})} />
                    <input placeholder='repeat password' type='password' onChange={e => this.setState({verp : e.target.value})} />
                    <button onClick={() => this.reg()}>Login</button>
                    <div className='Link left'>
                        <a href='#/'>Login</a>
                    </div>
                </div>
            </section>
        );
    }
    reg() {
        //TODO
    }
}
