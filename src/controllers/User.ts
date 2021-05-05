import { User } from "../entity/User"
import { createUserValidator } from "../validators/user"
var jwt = require('jsonwebtoken');
import { Token } from "../entity/Token"
import { authMiddleware } from "../middlewares/auth";
import {  getRepository } from "typeorm";

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
    const body = req.body
    const userRepo = getRepository(User);
    const userResult = await userRepo.find({
        where: [{ email: body.email }]
    })

    
    if (userResult.length > 0) {
        res.status(401).send("User email already exists");
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
            res.status(201).send({ user: user, token: tok });
        } catch (e) {
            console.log("LOL");
        }
    }
})


module.exports = router