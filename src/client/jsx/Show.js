/**
        Author: SpringHack - springhack@live.cn
        Last modified: 2017-03-13 12:01:11
        Filename: src/client/jsx/Show.js
        Description: Created by SpringHack using vim automatically.
**/
import React from 'react';
import {observer} from 'mobx-react';

import Model from '../model/Model';
import IOModel from '../model/WebSocket';

export default @observer class Show extends React.Component {
    element = null;
    constructor(props) {
        super(props);
        this.state = {
            toSend : ''
        };
    }
    render() {
        return (
            <section className='Main'>
                <div className='Title'>{(Model.state.to.trim() == '')?'Select a user to talk':`Talk with e-mail: ${Model.state.to}`}</div>
                <div className='Send' ref={e => this.element = e}>
                    {
                        Model.message
                            .filter(x => ((x.from == Model.state.mail && x.to == Model.state.to) || (x.from == Model.state.to && x.to == Model.state.mail)))
                            .map((x, i) => <div className={(x.from == Model.state.mail)?'from':'to'} key={i}><pre>{x.text}</pre></div>)
                    }
                </div>
                <div className='Edit'>
                    <textarea value={this.state.toSend} onChange={e => this.setState({toSend : e.target.value})} onKeyDown={e => this.down(e)} />
                    <button onClick={() => this.send()}>SEND</button>
                </div>
            </section>
        );
    }
    componentDidMount() {
        this.scroll();
    }
    componentDidUpdate() {
        this.scroll();
    }
    send() {
        if (this.state.toSend.trim() == '') return;
        if (Model.state.to.trim() == '')
        {
            alert('please select a user !');
            return;
        }
        IOModel.send({from : Model.state.mail, to : Model.state.to, text : this.state.toSend});
        this.setState({toSend : ''});
    }
    down(e) {
        if (13 == e.keyCode && !e.shiftKey)
        {
            this.send();
            e.preventDefault();
        }
    }
    scroll() {
        this.element && (this.element.scrollTop = this.element.scrollHeight);
    }
}
