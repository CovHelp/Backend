import axios from "axios"
import { getRepository } from "typeorm";
import { Post } from "../entity/base/Post";
import { Channel } from "../entity/Channel";
import { DeviceToken } from "../entity/DeviceTokens";
import { NeedHelp } from "../entity/NeedHelp";
import { ProvideHelp } from "../entity/ProvideHelp";

export const sendNotification = async (token, payload) => {
    console.log(`Sending notification to ${token}`);
    const res = await axios.post('https://fcm.googleapis.com/fcm/send', {
        data: payload,
        to: token
    }, {
        headers: {
            Authorization: `key=${process.env.FCM_TOKEN}`
        }
    })
    console.log(`Notification sent to ${token}`);

    return res;
}

export const getDeviceTokensByNeedPostID = async (postID) => {
    const postRepo = getRepository(NeedHelp);
    const result = await postRepo.findOne({
        where: [{ id: postID }],
        join: {
            alias: 'needHelp',
            leftJoinAndSelect: {
                user: "needHelp.user"
            }
        }
    })

    const deviceTokenRepo = getRepository(DeviceToken);
    const deviceTokenResult = await deviceTokenRepo.find({
        where: [{ user: result.user }]
    })
    if (deviceTokenResult.length > 0)
        return deviceTokenResult.map(tok => tok.token)
    else
        return null;
}


export const getDeviceTokensByProvidePostID = async (postID) => {
    const postRepo = getRepository(ProvideHelp);
    const result = await postRepo.findOne({
        where: [{ id: postID }],
        join: {
            alias: 'provideHelp',
            leftJoinAndSelect: {
                user: "provideHelp.user"
            }
        }
    })

    const deviceTokenRepo = getRepository(DeviceToken);
    const deviceTokenResult = await deviceTokenRepo.find({
        where: [{ user: result.user }]
    })
    if (deviceTokenResult.length > 0)
        return deviceTokenResult.map(tok => tok.token)
    else
        return null;
}

export const getDeviceTokensByUserID = async (userID) => {
    const deviceTokenRepo = getRepository(DeviceToken);
    const deviceTokenResult = await deviceTokenRepo.find({
        where: [{ user: userID }]
    })
    if (deviceTokenResult.length > 0)
        return deviceTokenResult.map(tok => tok.token)
    else
        return null;
}

export const getUsersByChannelID = async (channelID) => {
    const channelRepo = getRepository(Channel);
    const channelResult = await channelRepo.findOne({
        where: {id: channelID},
        join: {
            alias: 'channel',
            leftJoinAndSelect: {
                user1: 'channel.user1',
                user2: 'channel.user2'
            }
        }
    })
    
    return channelResult;
}