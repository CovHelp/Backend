import { User } from "../entity/User"
import { createUserValidator } from "../validators/user"
var jwt = require('jsonwebtoken');
import { Token } from "../entity/Token"
import { authMiddleware } from "../middlewares/auth";
import { getRepository } from "typeorm";

var express = require('express')
var router = express.Router()

router.get('/', (req, res) => {
    console.log(process.env.SECRET_KEY);
    res.send('Users module working!')
})

router.get('/@me', authMiddleware, async (req, res, next) => {
    res.status(200).send(req.userData)
})

router.post('/create-account', createUserValidator, async (req, res) => {
    console.log("Creating new user record");
    const body = req.body
    const userRepo = getRepository(User);
    const userResult = await userRepo.find({
        where: [{ email: body.email }],
        join: {
            alias: 'user',
            leftJoinAndSelect: {
                token: 'user.token'
            }
        }
    })

    if (userResult.length > 0) {

        delete userResult[0].googleId;
        delete userResult[0].token.createdAt;
        delete userResult[0].token.updatedAt;
        var userResponse = {
            id: userResult[0].id,
            firstName: userResult[0].firstName,
            lastName: userResult[0].lastName,
            email: userResult[0].email,
            profile_pic: userResult[0].profile_pic
        };

        const response = { user: userResponse, token: userResult[0].token };
        res.status(201).send(response);
    } else {
        try {

            const user = new User();
            user.firstName = body.givenName;
            user.lastName = body.familyName ? body.familyName : '';
            user.email = body.email;
            user.googleId = body.googleId;
            user.profile_pic = body.imageUrl ? body.imageUrl : ' ';
            user.save();

            const tok = jwt.sign({ email: body.email, googleId: body.googleId }, process.env.SECRET_KEY);
            const token = new Token()
            token.token = tok;
            token.user = user;
            token.save()

            var userResponse = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                profile_pic: user.profile_pic
            };
            res.status(201).send({ user: userResponse, token: { token: tok } });
        } catch (e) {
            console.log("LOL");
        }
    }
})


module.exports = router