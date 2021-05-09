// Express
import * as express from "express";
var cors = require('cors')
const fileUpload = require('express-fileupload');

// TypeORM
import "reflect-metadata";
import { createConnection, getRepository } from "typeorm";
import { Channel } from "./entity/Channel";
require('dotenv').config()


const CHANNEL1 = 'CHANNEL1';
const CHANNEL2 = 'CHANNEL2';
var channel1Messages = [];
const channel2Messages = [];



//Resource.validate = validate;
//AdminBro.registerAdapter({ Database, Resource });
//import { Database, Resource } from "admin-bro-typeorm";
//const AdminBro = require('admin-bro')
//const AdminBroExpress = require('@admin-bro/express')


const app = express();
app.use(cors())
app.use(fileUpload());


var http = require('http').createServer(app);
var io = require('socket.io')(http, {
    cors: {
        origin: '*',
    }
});

async function main() {
    const connection = await createConnection();
    // const adminBro = new AdminBro({
    //   databases: [connection],
    //  rootPath: '/admin',
    //  })
    //const router = AdminBroExpress.buildRouter(adminBro)
    // comment the below line in prod
    //  createPost(connection);
    //  createProvideHelpPost(connection);
    // app.use('/admin', router)
    // comment line end

    app.use(express.json());
    app.use(require('./controllers'))
    http.listen(3001, () => console.log("Listening on port 3001"));

    // Chat handler
    io.on('connection', (socket) => { /* socket object may be used to send specific messages to the new connected client */
        console.log('new client connected');
        socket.emit('connection', null);
        socket.on('channel-join', room => {
            socket.join(room);
            io.to(room).emit('on-message', channel1Messages)
        });
        socket.on('channel-leave', room => {
            socket.leave(room);
        })
        socket.on('send-message', v => {
            channel1Messages = [...channel1Messages, v.msg]
            io.to(v.channel).emit('on-message', channel1Messages);
        })
    });
}

main()