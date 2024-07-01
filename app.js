import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import multer from 'multer'

import { UserRouter } from "./controller/User.js";
import { PageRouter } from "./controller/Page.js";
import { MusicRouter } from "./controller/Music.js";

dotenv.config();

import { fileURLToPath } from "url";
import { dirname } from "path";

const PORT = process.env.PORT;
export const SECRET = process.env.SECRETWORD;
console.log(PORT, SECRET)

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class Server {
    constructor(port, app) {
        this.port = port;
        this.app = app;
    }
    listen() {
        this.app.listen(this.port, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log(`http://localhost:${this.port}`);
            }
        });
    }
}

let server = new Server(PORT, express());


server.app.use(express.json());
server.app.use(express.static(__dirname));

server.app.use(session({
    secret: 'somevalue',
    resave: true, 
    saveUninitialized: false,
}));

server.app.use("/user", UserRouter);
server.app.use("/main", PageRouter);
server.app.use("", PageRouter);
server.app.use("/music", MusicRouter);

server.listen();

