import express from "express";
import dotenv from "dotenv";
import { Sequelize, DataTypes } from 'sequelize'
import multer from 'multer'

dotenv.config();

import { fileURLToPath } from "url";
import { dirname } from "path";
import { NULL } from "sass";

const sequelize = new Sequelize('MusicDB', 'postgres', 'admin', {
    host: process.env.HOST,
    dialect: 'postgres',
    operatorsAliases: 0,
    pool: {
        max: 5,
        min: 0,
        acquire: 3000,
        idle: 10000
    }
})

try {
    await sequelize.authenticate()
    console.log('Соединение с БД было успешно установлено')
} catch (e) {
    console.log('Невозможно выполнить подключение к БД: ', e)
}
const UserInfo = sequelize.define('userinfo', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        defaultValue: sequelize.Sequelize.literal("nextval('seq_userinfo')")
    },
    user_name: {
        type: DataTypes.STRING(255)
    },
    user_email: DataTypes.STRING(255),
    user_password: DataTypes.STRING(255),
    user_picture: DataTypes.BLOB,
}, { freezeTableName: true, timestamps: false });

const FavoriteTracks = sequelize.define('favoritetracks', {
    favoritetracks_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        defaultValue: sequelize.Sequelize.literal("nextval('seq_favoritetracks')")
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'userinfo',
            key: 'user_id',
        }
    },
    music_id: {
        type: DataTypes.INTEGER
    },
}, { freezeTableName: true, timestamps: false });

const Music = sequelize.define('music', {
    music_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        defaultValue: sequelize.Sequelize.literal("nextval('seq_music')")
    },
    music_name: DataTypes.STRING(255),
    music_author: DataTypes.STRING(255),
    music_file: DataTypes.BLOB,
    music_picture: DataTypes.BLOB,
}, { freezeTableName: true, timestamps: false });

const PORT = process.env.PORT;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let rex_mail = /^[\w\d%$:.-]+@\w+\.\w{2,5}$/;

class Server {
    constructor(port, app) {
        this.port = port;
        this.app = app;
    }
    get() {
        this.app.get('/', (req, res) => {
            console.log("To main page show");
            res.redirect(301, "main")
        });

        this.app.get('/main', async (req, res) => { // Вынести в отдельный класс все функции которые ты будешь прокидывать в server.use()
            try {
                res.sendFile(__dirname + "/main.html");
            } catch (err) {
                console.error(err);
            }
        });

        this.app.get('/add_song', (req, res) => {
            console.log("To main page show");
            res.redirect(301, "main")
        });

        this.app.get('/find', async (req, res) => {
            let user = await UserInfo.findAll()
            console.log(user);
        });
    }
    post() {
        this.app.post("/reg", async function (req, res) {
            if (!req.body) return res.sendStatus(400);
            console.log(req.body, JSON.stringify(req.body.user_id));
            let name = await UserInfo.findOne({
                where: {
                    user_name: JSON.stringify(req.body.user_name)
                }
            })
            if (name !== null) {
                console.log('Имя пользователя занято');
                res.send({ stat: 10 });
                return 0;
            } else {
                let email = await UserInfo.findOne({
                    where: {
                        user_email: JSON.stringify(req.body.user_email)
                    }
                })
                if (email !== null) {
                    console.log('Почта занята занята');
                    res.send({ stat: 20 });
                    return 0;
                } else {
                    await UserInfo.create({
                        user_name: JSON.stringify(req.body.user_name),
                        user_email: JSON.stringify(req.body.user_email),
                        user_password: JSON.stringify(req.body.user_password),
                        user_picture: JSON.stringify(req.body.user_picture),
                    })
                    console.log('Регистрация успешна')
                    res.send({ stat: 0 });
                }
            }
        });

        this.app.post("/like", async function (req, res) {
            if (!req.body) return res.sendStatus(400);
            console.log(req.body)
            await FavoriteTracks.create({
                user_id: JSON.stringify(req.body.user_id),
                music_id: JSON.stringify(req.body.music_id),
            })
            res.send({ stat: 0 });
        })

        this.app.post("/get_likes", async function (req, res) {
            if (!req.body) return res.sendStatus(400);
            console.log(req.body)
            let likes = await FavoriteTracks.findAll({
                where: {
                    user_id: JSON.stringify(req.body.user_id)
                }
            })
            if (likes !== null && likes[0] !== undefined) {
                res.send({ stat: 0, likes: likes });
                console.log(likes[0])
            } else {
                res.send({ stat: 400 });
            }
        })

        this.app.post("/upload_music", multer({ dest: "uploads" }).single('music'), async function (req, res) {
            if (!req.body) return res.sendStatus(400);
            console.log(JSON.stringify(req.body));
            console.log(JSON.stringify(req.file));

            res.send({ stat: 400 });
            /*
            let music = Buffer.from(JSON.stringify(req.body.music), 'binary').toString('base64');

            await Music.create({
                music_name: JSON.stringify(req.body.music_name),
                music_author: JSON.stringify(req.body.music_author),
                music_file: music,
                music_picture: picture,
            })
            */
        })
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

server.get();
server.post();
server.listen();
