// Express
import * as express from "express";
var cors = require('cors')
const fileUpload = require('express-fileupload');

// TypeORM
import "reflect-metadata";
import { createConnection } from "typeorm";
require('dotenv').config()





//Resource.validate = validate;
//AdminBro.registerAdapter({ Database, Resource });
//import { Database, Resource } from "admin-bro-typeorm";
//const AdminBro = require('admin-bro')
//const AdminBroExpress = require('@admin-bro/express')


const app = express();
var http = require('http').createServer(app);
app.use(cors())
app.use(fileUpload());


async function main() {
    const connection = await createConnection();
    // const adminBro = new AdminBro({
    //   databases: [connection],
    //  rootPath: '/admin',
    //  })
    //const router = AdminBroExpress.buildRouter(adminBro)
    // comment the below line in prod
    //  createPost(connection);
    //  createProvideHelpPost(connection);
    // app.use('/admin', router)
    // comment line end

    app.use(express.json());
    app.use(require('./controllers'))
    http.listen(3001, ()=>console.log("Listening on port 3001"));
}


main()