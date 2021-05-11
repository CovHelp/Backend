import { body } from "express-validator";
import { getRepository } from "typeorm";
import { Channel } from "../entity/Channel";
import { authMiddleware } from "../middlewares/auth"
import { getDeviceTokensByUserID, sendNotification } from "../utils/notifier";

var express = require('express')
var router = express.Router()

router.post('/create-need-channel', authMiddleware, async (req, res) => {
    const { user1ID, user2ID, postID } = req.body;
    const userData = req.userData;
    console.log(req.body);
    const channelRepo = getRepository(Channel);
    const result = await channelRepo.find({
        where: [
            { user1: userData.user.id, user2: user2ID, needHelp: postID, postType: 0},
        ]
    })
    console.log(result);
    if (result.length == 0) {
        console.log("Creating need channel");

        const channel = new Channel()
        channel.user1 = userData.user.id;
        channel.user2 = user2ID;
        channel.postType = 0
        channel.needHelp = postID;
        await channel.save();
        try {
            const res = await getDeviceTokensByUserID(user2ID);
            if (res !== null) {
                res.forEach(async token => {
                    await sendNotification(token, {
                        postType: 0,
                        url: 'https://covhelp.online/chat',
                        postID: postID,
                        title: `Someone wants to help you!`,
                        body: `You got a help on one of your posts!`
                    })
                })
            }
        } catch (e) {

        }
        res.status(200).send(channel);
    } else {
        console.log("Creating exists");

        res.status(200).send(result[0])
    }
})


router.post('/create-provide-channel', authMiddleware, async (req, res) => {
    const { user1ID, user2ID, postID } = req.body;
    const userData = req.userData;

    const channelRepo = getRepository(Channel);
    const result = await channelRepo.find({
        where:
            { user1: userData.user.id, user2: user2ID, provideHelp: postID, postType: 1 }
    })
    console.log(result);

    if (result.length == 0) {
        console.log("Creating provide channel");
        const channel = new Channel()
        channel.user1 = userData.user.id;
        channel.user2 = user2ID;
        channel.postType = 1
        channel.provideHelp = postID;
        await channel.save();

        try {
            const res = await getDeviceTokensByUserID(user2ID);
            if (res !== null) {
                res.forEach(async token => {

                    await sendNotification(token, {
                        postType: 1,
                        url: 'https://covhelp.online/chat',
                        postID: postID,
                        title: `Someone wants your help`,
                        body: `You got a help request on one of your posts`
                    })
                })
            }
        } catch (e) {

        }
        res.status(200).send(channel);
    } else {
        console.log("Creating exists");

        res.status(200).send(result[0])
    }
})


router.get('/get-user-channels', authMiddleware, async (req, res) => {
    const userData = req.userData;
    console.log(userData.user.id);
    const channelRepo = getRepository(Channel);
    const result = await channelRepo.find({
        order: {
            updatedAt: 'ASC',
        },
        where: [{ user1: userData.user.id }, { user2: userData.user.id }],
        join: {
            alias: 'channel',
            leftJoinAndSelect: {
                user1: 'channel.user1',
                user2: 'channel.user2',
                needHelp: 'channel.needHelp',
                provideHelp: 'channel.provideHelp'
            }
        }
    })
    res.status(200).send(result);
});

module.exports = router
