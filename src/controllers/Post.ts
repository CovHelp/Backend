import { getRepository } from "typeorm"
import { NeedHelp } from "../entity/NeedHelp"
import { ProvideHelp } from "../entity/ProvideHelp"
import {authMiddleware} from '../middlewares/auth'

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
            join: {
                alias: "needhelp",
                leftJoinAndSelect: {
                    user: "needhelp.user",
                    comments: "needhelp.comments",
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
                    location: "needhelp.location"
                }
            }
        })
        res.send(result)
    } catch (e) {
        res.send(e.toString());
    }
})

router.get('/provide-help-posts', async (req, res) => {
    try {
        const postRepo = getRepository(ProvideHelp);
        const result = await postRepo.find({
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

router.post('/create-need-help-post', authMiddleware, (req, res) => {
    console.log(req.headers.authorization)
    res.send('LOL')
});

router.post('/create-provide-help-post', (req, res) => {

});

module.exports = router