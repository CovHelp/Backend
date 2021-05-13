import { authMiddleware } from "../middlewares/auth";
import { v4 as uuidv4 } from 'uuid';
import { createOrganizationValidator } from "../validators/oganization";
import { Organization } from "../entity/Organization";
import { OrganizationLocation } from "../entity/OrganizationLocation";
import { getRepository } from "typeorm";

var express = require('express')
var router = express.Router()

router.post('/upload', authMiddleware, (req, res) => {
    let sampleFile;
    let uploadPath;
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    const id = uuidv4().toString();

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

router.post('/create', authMiddleware, createOrganizationValidator, async (req, res) => {
    const userData = req.userData;
    const body = req.body;
    // console.log(userData)
    const organization = new Organization()
    organization.contact = body.contact;
    organization.website = body.website;
    organization.image = body.image;
    organization.address = body.address;
    organization.name = body.name;
    organization.category = body.category;
    organization.donation = body.donation;
    organization.user = userData.user;

    await organization.save()

    for (var i = 0; i < body.locations.length; i++){
        const location = new OrganizationLocation()
        location.city = body.locations[i].city.name;
        location.state = body.locations[i].state.name;
        location.lat = body.locations[i].city.latitude;
        location.long = body.locations[i].city.longitude;
        location.country = "IN";
        location.organization = organization
        await location.save()
    }

    res.status(201).send(organization)
})


router.get('/', async (req, res) => {
    const orgRepo = getRepository(Organization);
    const orgResult = await orgRepo.find({
        order: {
            createdAt: 'DESC'
        },
        join: {
            alias: 'org',
            leftJoinAndSelect: {
                locations: 'org.locations'
            }
        }
    })

    res.status(200).send(orgResult);
})

module.exports = router
