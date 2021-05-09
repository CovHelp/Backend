import { getRepository } from "typeorm";
import { Channel } from "../entity/Channel";
import { authMiddleware } from "../middlewares/auth"

var express = require('express')
var router = express.Router()

router.post('/create-need-channel', authMiddleware, async (req, res) => {
    const { user1ID, user2ID, postID } = req.body;
    const userData = req.userData;

    const channelRepo = getRepository(Channel);
    const result = await channelRepo.find({
        where:
            { user1: user1ID, user2: user2ID, needHelp: postID, postType: 0 }
    })
    if (result.length == 0) {
        console.log("Creating need channel");

        const channel = new Channel()
        channel.user1 = userData.user.id;
        channel.user2 = user2ID;
        channel.postType = 0
        channel.needHelp = postID;
        channel.save();
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
            { user1: user1ID, user2: user2ID, provideHelp: postID, postType: 1 }
    })
    if (result.length == 0) {
        console.log("Creating provide channel");
        const channel = new Channel()
        channel.user1 = userData.user.id;
        channel.user2 = user2ID;
        channel.postType = 1
        channel.needHelp = postID;
        channel.save();
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
