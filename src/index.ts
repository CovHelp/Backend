// Express
import * as express from "express";
var cors = require('cors')
const fileUpload = require('express-fileupload');

// TypeORM
import "reflect-metadata";
import { createConnection, getRepository } from "typeorm";
import { Channel } from "./entity/Channel";
import { Message } from "./entity/Message";
import { getDeviceTokensByUserID, getUsersByChannelID, sendNotification } from "./utils/notifier";
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
        socket.on('channel-join', async room => {
            console.log("Joining channel", room);
            socket.join(room);
            const messageRepo = getRepository(Message);
            const messageResult = await messageRepo.find({
                order: {
                    'createdAt': 'ASC',
                },
                where: [{ channel: room }],
                join: {
                    alias: 'message',
                    leftJoinAndSelect: {
                        sender: 'message.sender',
                        channel: 'message.channel'
                    }
                }
            })
            io.to(room).emit('on-init', messageResult)
        });
        socket.on('channel-leave', room => {
            socket.leave(room);
        })
        socket.on('send-message', async v => {
            console.log("Saving message for channel: ", v.channel)
            const message = new Message()
            message.message = v.msgData.text;
            message.sender = v.msgData.user;
            message.channel = v.channel;
            await message.save();
            io.to(v.channel).emit('on-message', message);

            const channelRepo = getRepository(Channel);
            const channel = await channelRepo.findOne({
                where: {id: v.channel}
            })

            if(channel){
                channel.updatedAt = new Date()
                await channel.save()
            }

            // notification handler
            const users = await getUsersByChannelID(v.channel);
            if (users) {
                if (users.user1.id != v.msgData.user) {
                    const deviceTokens = await getDeviceTokensByUserID(users.user1.id)
                    if (deviceTokens.length > 0) {
                        deviceTokens.forEach(async v => {
                            await sendNotification(v, {
                                url: 'https://covhelp.online/chat',
                                title: `${users.user2.firstName} sent you a message`,
                                body: `${message.message}`
                            })
                        })
                    }
                }

                else if (users.user2.id != v.msgData.user) {
                    const deviceTokens = await getDeviceTokensByUserID(users.user2.id)
                    if (deviceTokens.length > 0) {
                        deviceTokens.forEach(async v => {
                            await sendNotification(v, {
                                url: 'https://covhelp.online/chat',
                                title: `${users.user1.firstName} sent you a message`,
                                body: `${message.message}`
                            })
                        })
                    }
                }
            }
        })
    });
}

main()