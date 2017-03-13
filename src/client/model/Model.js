/**
        Author: SpringHack - springhack@live.cn
        Last modified: 2017-03-13 15:37:15
        Filename: src/client/model/Model.js
        Description: Created by SpringHack using vim automatically.
**/
import {useStrict, action, observable} from 'mobx'

useStrict(true);

class Model {

    @observable
    state = {
        to : '',
        mail : '',
        mailToLogin : ''
    };

    @observable
    message = [];

    @observable
    userlist = [];

    @action
    setState(o) {
        for (let k in o)
            this.state[k] = o[k];
    }

    @action
    pushMessage(msg) {
        this.message.push(msg);
    }

    @action
    updateUser(list) {
        this.userlist.splice(0, this.userlist.length, ...list);
    }

}

export default new Model();
