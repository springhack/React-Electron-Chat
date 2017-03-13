/**
        Author: SpringHack - springhack@live.cn
        Last modified: 2017-03-13 15:48:25
        Filename: src/client/jsx/User.js
        Description: Created by SpringHack using vim automatically.
**/
import React from 'react';
import {autorun} from 'mobx';
import {observer} from 'mobx-react';

import Model from '../model/Model';

export default @observer class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count : 0,
            show : 0
        };
    }
    render() {
        return (
            <div className={(Model.state.to == this.props.mail)?'User current':'User'} onClick={() => this.setUser()}>
                <div className='Info'>
                    <div className='Name'>{this.props.user}</div>
                    <div className='Mail'>{this.props.mail}</div>
                </div>
                <div className={(this.state.show == 0)?'Count zero':'Count'}>{(this.state.show > 9)?'9+':this.state.show}</div>
            </div>
        );
    }
    componentDidMount() {
        autorun(() => {
            let count = 0;
            for (let chat of Model.message)
                if (chat.from == this.props.mail)
                    count++;
            if (this.state.count < count)
            {
                if (this.props.mail == Model.state.to)
                    this.setState({count : count, show : 0});
                else
                    this.setState({show : count - this.state.count});
            }
        });
    }
    setUser() {
        Model.setState({
            to : this.props.mail
        });
        this.setState({
            count : this.state.count + this.state.show,
            show : 0
        });
    }
}
