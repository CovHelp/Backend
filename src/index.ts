// Express
import * as express from "express";
// TypeORM
import "reflect-metadata";
import { createConnection } from "typeorm";
import { Database, Resource } from "admin-bro-typeorm";
const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')
import { validate } from 'class-validator'
import { User } from "./entity/User";
import { NeedHelp } from "./entity/NeedHelp";
import { ProvideHelp } from "./entity/ProvideHelp";
require('dotenv').config()



Resource.validate = validate;
AdminBro.registerAdapter({ Database, Resource });


const createPost = async (connection) => {
    const firstUser = await connection
    .getRepository(User)
    .createQueryBuilder("user")
    .where("user.id = :id", { id: 1 })
    .getOne();
    console.log(firstUser);
    const repository = connection.getRepository(NeedHelp);
    const post = new NeedHelp()
    post.body = "1";
    post.isClosed = false;
    post.isPhoneNumberPublic = false;
    post.phoneNumber = 1212121;
    post.picture = "LOL"
    post.category = 1;
    post.type = 1;
    post.urgency = 1;
    post.user  = firstUser;
    console.log("Creating post: ", post);
    try{
    await repository.save(post);
    console.log("Post created");
    }catch(e){
        console.log(e);
    }
}

const createProvideHelpPost = async (connection) => {
    const firstUser = await connection
    .getRepository(User)
    .createQueryBuilder("user")
    .where("user.id = :id", { id: 1 })
    .getOne();
    console.log(firstUser);
    const repository = connection.getRepository(ProvideHelp);
    const post = new ProvideHelp()
    post.body = "1";
    post.isClosed = false;
    post.isPhoneNumberPublic = false;
    post.phoneNumber = 1212121;
    post.picture = "LOL"
    post.category = 1;
    post.type = 1;
    post.urgency = 1;
    post.user  = firstUser;
    console.log("Creating post: ", post);
    try{
    await repository.save(post);
    console.log("Post created");
    }catch(e){
        console.log(e);
    }
}


const app = express();

async function main() {
    const connection = await createConnection();
    const adminBro = new AdminBro({
        databases: [connection],
        rootPath: '/admin',
    })
    const router = AdminBroExpress.buildRouter(adminBro)
    // comment the below line in prod
    //  createPost(connection);
    //  createProvideHelpPost(connection);
    app.use('/admin', router)
    // comment line end

    app.use(express.json());
    app.use(require('./controllers'))
    app.listen(3001);
    console.log("Server started");
}



main()