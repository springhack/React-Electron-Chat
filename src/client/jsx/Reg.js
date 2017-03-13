/**
        Author: SpringHack - springhack@live.cn
        Last modified: 2017-03-13 14:42:35
        Filename: Reg.js
        Description: Created by SpringHack using vim automatically.
**/
import React from 'react';
import {observer} from 'mobx-react';
import {Link} from 'react-router-dom';

import Config from '../config/Config';

import Model from '../model/Model.js';
import IOModel from '../model/WebSocket.js';

export default @observer class Reg extends React.Component {
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
            <section className='App' onKeyDown={e => this.down(e)}>
                <div className='Flex'>
                    <input placeholder='e-mail address' type='text' onChange={e => this.setState({mail : e.target.value})} />
                    <input placeholder='username' type='text' onChange={e => this.setState({user : e.target.value})} />
                    <input placeholder='password' type='password' onChange={e => this.setState({pass : e.target.value})} />
                    <input placeholder='repeat password' type='password' onChange={e => this.setState({verp : e.target.value})} />
                    <button onClick={() => this.reg()}>Register</button>
                    <div className='Link left'>
                        <Link to='/'>Login</Link>
                    </div>
                </div>
            </section>
        );
    }
    reg() {
        if (this.state.pass != this.state.verp || ['user', 'pass', 'mail'].some(key => (this.state[key].trim() == '')))
        {
            alert('Password verify failed !');
            return;
        }
        fetch(Config.getRegister(), {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(this.state)
        })
        .then(res => res.json())
        .then(json => {
            if (json.error)
            {
                alert(json.error);
                return;
            }
            alert('register success !');
            IOModel.login(this.state.mail, this.state.pass);
        })
        .catch(error => alert('error while register !'));
    }
    down(e) {
        if (e.keyCode == 13)
        {
            e.preventDefault();
            this.reg();
        }
    }
}
