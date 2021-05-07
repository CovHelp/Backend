import { getRepository } from "typeorm"
import { NeedHelp } from "../entity/NeedHelp"
import { NeedHelpLocation } from "../entity/NeedHelpLocation"
import { ProvideHelp } from "../entity/ProvideHelp"
import { ProvideHelpLocation } from "../entity/ProvideHelpLocation"
import { authMiddleware } from '../middlewares/auth'
import { createNeedHelpPostValidator } from "../validators/post"

var express = require('express')
var router = express.Router()

router.get('/', (req, res) => {
    res.send('Posts module working!')
})

// Need help post routes
router.get('/need-help-posts', async (req, res) => {
    try {
        const postRepo = getRepository(NeedHelp);
        const result = await postRepo.find({
            order: {
                'createdAt': 'DESC',
            },
            join: {
                alias: "needhelp",
                leftJoinAndSelect: {
                    user: "needhelp.user",
                    comments: "needhelp.comments",
                    location: "needhelp.location",
                }
            },
            
        })
        res.send(result)
    } catch (e) {
        res.send(e.toString());
    }
})

router.post('/user-need-help-posts', authMiddleware, async (req, res) => {
    const userData = req.userData;
    try {
        const postRepo = getRepository(NeedHelp);
        const result = await postRepo.find({
            order: {
                'createdAt': 'DESC',
            },
            where: [{ user: userData.user.id }],
            join: {
                alias: "needhelp",
                leftJoinAndSelect: {
                    user: "needhelp.user",
                    comments: "needhelp.comments",
                    location: "needhelp.location",
                }
            }
        })
        res.send(result)
    } catch (e) {
        res.send(e.toString());
    }
})

router.get('/need-help-post/:id', async (req, res) => {
    try {
        const postRepo = getRepository(NeedHelp);
        const result = await postRepo.find({
            where: [{ id: req.params.id }],
            join: {
                alias: "needhelp",
                leftJoinAndSelect: {
                    user: "needhelp.user",
                    comments: "needhelp.comments",
                    location: "needhelp.location",

                }
            }
        })
        res.send(result)
    } catch (e) {
        res.send(e.toString());
    }
})


router.post('/create-need-help-post', authMiddleware, createNeedHelpPostValidator, async (req, res) => {
    const body = req.body;
    const userData = req.userData;

    const location = new NeedHelpLocation()
    location.city = body.city;
    location.state = body.state;
    location.lat = body.lat;
    location.long = body.long;
    location.country = "IN";
    location.save()

    const needHelp = new NeedHelp()
    needHelp.body = body.body;
    needHelp.category = body.category;
    needHelp.phoneNumber = body.phoneNumber;
    needHelp.isPhoneNumberPublic = body.isPhoneNumberPublic;
    needHelp.urgency = body.urgency;
    needHelp.isClosed = false;
    needHelp.picture = body.picture;

    // setting relationship
    needHelp.location = location;
    needHelp.user = userData.user;

    needHelp.save()
    res.status(200).send(needHelp);
})

router.get('/provide-help-posts', async (req, res) => {
    try {
        const postRepo = getRepository(ProvideHelp);
        const result = await postRepo.find({
            order: {
                'createdAt': 'DESC',
            },
            join: {
                alias: "providehelp",
                leftJoinAndSelect: {
                    user: "providehelp.user",
                    comments: "providehelp.comments",
                    upvotes: "providehelp.upvotes",
                    appreciations: "providehelp.appreciations",
                    locations: "providehelp.locations"
                }
            }
        });
        res.send(result);
    } catch (e) {
        res.send(e.toString());
    }
})


router.get('/provide-help-post/:id', async (req, res) => {
    try {
        const postRepo = getRepository(ProvideHelp);
        const result = await postRepo.find({
            where: [{ id: req.params.id }],
            join: {
                alias: "providehelp",
                leftJoinAndSelect: {
                    user: "providehelp.user",
                    comments: "providehelp.comments",
                    upvotes: "providehelp.upvotes",
                    appreciations: "providehelp.appreciations"
                }
            }
        });
        res.send(result);
    } catch (e) {
        res.send(e.toSting());
    }
})

router.post('/user-provide-help-posts', authMiddleware, async (req, res) => {
    const userData = req.userData;
    try {
        const postRepo = getRepository(ProvideHelp);
        const result = await postRepo.find({
            order: {
                'createdAt': 'DESC',
            },
            where: [{ user: userData.user.id }],
            join: {
                alias: "ProvideHelp",
                leftJoinAndSelect: {
                    user: "ProvideHelp.user",
                    comments: "ProvideHelp.comments",
                    locations: "providehelp.locations"
                }
            }
        })
        res.send(result)
    } catch (e) {
        res.send(e.toString());
    }
})

router.post('/create-provide-help-post', authMiddleware, (req, res) => {
    const body = req.body;
    const userData = req.userData;

    const provideHelp = new ProvideHelp()
    provideHelp.body = body.body;
    provideHelp.category = body.category;
    provideHelp.phoneNumber = body.phoneNumber;
    provideHelp.isPhoneNumberPublic = body.isPhoneNumberPublic;
    provideHelp.urgency = body.urgency;
    provideHelp.isClosed = false;
    provideHelp.picture = body.picture;

    // setting relationship
    provideHelp.user = userData.user;

    provideHelp.save()

    for (var i = 0; i < body.locations.length; i++) {
        const location = new ProvideHelpLocation()
        location.city = body.locations[i].city.name;
        location.state = body.locations[i].state.name;
        location.lat = body.locations[i].city.latitude;
        location.long = body.locations[i].city.longitude;
        location.country = "IN";
        location.provideHelp = provideHelp;
        location.save()
    }


    res.status(200).send(provideHelp);
});

module.exports = router


