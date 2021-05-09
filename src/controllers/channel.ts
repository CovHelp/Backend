import { getRepository } from "typeorm";
import { Channel } from "../entity/Channel";
import { authMiddleware } from "../middlewares/auth"

var express = require('express')
var router = express.Router()

router.post('/create-need-channel', authMiddleware, async (req, res) => {
    const { user1ID, user2ID, postID } = req.body;

    const channelRepo = getRepository(Channel);
    const result = await channelRepo.find({
        where:
            { user1: user1ID, user2: user2ID, needHelp: postID, postType: 0 }
    })
    if (result.length == 0) {
        const channel = new Channel()
        channel.user1 = user1ID;
        channel.user2 = user2ID;
        channel.postType = 0
        channel.needHelp = postID;
        channel.save();
        res.status(200).send(channel);
    } else {
        res.status(200).send(result[0])
    }
})


router.post('/create-provide-channel', authMiddleware, async (req, res) => {
    const { user1ID, user2ID, postID } = req.body;

    const channelRepo = getRepository(Channel);
    const result = await channelRepo.find({
        where:
            { user1: user1ID, user2: user2ID, needHelp: postID, postType: 1 }
    })
    if (result.length == 0) {
        const channel = new Channel()
        channel.user1 = user1ID;
        channel.user2 = user2ID;
        channel.postType = 1
        channel.needHelp = postID;
        channel.save();
        res.status(200).send(channel);
    } else {
        res.status(200).send(result[0])
    }
})


router.get('/get-user-channels', authMiddleware, async (req, res) => {
    const userData = req.userData;
    const channelRepo = getRepository(Channel);
    const result = await channelRepo.find({
        where: [{ user1: userData.id }, { user2: userData.id }]
    })
    res.status(200).send(result);
});