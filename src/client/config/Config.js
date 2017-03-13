/**
        Author: SpringHack - springhack@live.cn
        Last modified: 2017-03-13 16:29:48
        Filename: src/client/config/Config.js
        Description: Created by SpringHack using vim automatically.
**/
export default {
    PublicServer : 'http://115.159.151.158:3080',
    getRegister() {
        return (process.env.NODE_ENV == 'production')?this.PublicServer + '/api/register':'http://localhost:3000/api/register';
    },
    getWebSocket() {
        return (process.env.NODE_ENV == 'production')?this.PublicServer:'http://localhost:3000';
    }
};
