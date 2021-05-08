import { getRepository } from "typeorm"
import { NeedHelp } from "../entity/NeedHelp"
import { NeedHelpLocation } from "../entity/NeedHelpLocation"
import { ProvideHelp } from "../entity/ProvideHelp"
import { ProvideHelpLocation } from "../entity/ProvideHelpLocation"
import { authMiddleware } from '../middlewares/auth'
import { createNeedHelpPostValidator, createProvideHelpPostValidator } from "../validators/post"
import { v4 as uuidv4 } from 'uuid';
import { Comment } from "../entity/Comment"
import { Upvote } from "../entity/Upvote"
import { Appreciate } from "../entity/Appreciate"

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

router.post('/need-help-comment', authMiddleware, async(req, res) => {
    const body = req.body;
    const userData = req.userData;

    try {
        const needhelpComment = new Comment();
        needhelpComment.comment = body.comment;
        needhelpComment.user = userData.user
        needhelpComment.needHelp = body.post;
        needhelpComment.save();
        res.send(needhelpComment);
    } catch (e) {
        res.send(e.toString());
    }
})

router.get('/need-help-comments/:id', async (req, res) => {
    try {
        const postRepo = getRepository(Comment);
        const result = await postRepo.find({
            where: [{ needHelp: req.params.id }],
            order: {
                'createdAt': 'DESC',
            },
            join: {
                alias: "comment",
                leftJoinAndSelect: {
                    user: "comment.user",
                }
            },
        });

        res.send(result);
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






// PROVIDE HELP POSTS CONTROLLERS

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


router.get('/provide-help-comments/:id', async (req, res) => {
    try {
        const postRepo = getRepository(Comment);
        const result = await postRepo.find({
            where: [{ provideHelp: req.params.id }],
            order: {
                'createdAt': 'DESC',
            },
            join: {
                alias: "comment",
                leftJoinAndSelect: {
                    user: "comment.user",
                }
            },
        });
        res.send(result);
    } catch (e) {
        res.send(e.toString());
    }
})



router.post('/provide-help-comment', authMiddleware, async(req, res) => {
    const body = req.body;
    const userData = req.userData;

    try {
        const provideHelpComment = new Comment();
        provideHelpComment.comment = body.comment;
        provideHelpComment.user = userData.user
        provideHelpComment.provideHelp = body.post;
        provideHelpComment.save();
        res.send(provideHelpComment);
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
                    locations: "ProvideHelp.locations"
                }
            }
        })
        res.send(result)
    } catch (e) {
        res.send(e.toString());
    }
})

router.post('/create-provide-help-post', authMiddleware, createProvideHelpPostValidator, (req, res) => {
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


router.post('/upvote/:id', authMiddleware, (req, res) => {
    try{
    const userData = req.userData;
    const upvote = new Upvote()
    upvote.user = userData.user;
    upvote.providehelp = req.params.id;
    upvote.save();
    res.status(200).send(upvote);
    }catch(e){
        res.staus(500).send(e.toString())
    }
})

router.post('/appreciate/:id', authMiddleware, (req, res) => {
    try{
    const userData = req.userData;
    const appreciate = new Appreciate()
    appreciate.user = userData.user;
    appreciate.proviehelp = req.params.id;
    appreciate.save();
    res.status(200).send(appreciate);
    }catch(e){
        res.staus(500).send(e.toString())
    }
})

router.post('/upload', authMiddleware, (req, res) => {
    let sampleFile;
    let uploadPath;
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    const id = uuidv4().toString();
    console.log("Uploading...");

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.file;
    uploadPath = __dirname + '/uploads/' + id + ".png";

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, function (err) {
        if (err)
            return res.status(500).send(err);

        res.send(id);
    });

    console.log("Uploaded file!");
});

module.exports = router


