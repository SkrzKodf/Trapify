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


const User_authDTO = (sequelize) => {
    const User = sequelize.define('userinfo', {
        user_email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_picture: {
            type: DataTypes.BLOB,
            allowNull: true
        }
    });
    return User;
};

const PORT = process.env.PORT;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let rex_mail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

class Page {
    static redirect_to_main_paige() {
        server.app.get('/', (req, res) => {
            console.log("To main page show");
            res.redirect(301, "main")
        });
    }

    static show_main_page() {
        server.app.get('/main', async (req, res) => {
            try {
                res.sendFile(__dirname + "/main.html");
            } catch (err) {
                console.error(err);
            }
        });
    }
}

class User {
    static registration() {
        server.app.post("/reg", multer().single('picture'), async (req, res) => {
            if (!req.body) return res.sendStatus(400);

            if ((JSON.stringify(req.body.user_name)).length < 3) {
                res.send({ stat: 33, info: "Имя пользователя меньше 3 символов" });
                return 0;
            }

            if ((JSON.stringify(req.body.user_password)).length < 8) {
                res.send({ stat: 88, info: "Пароль пользователя меньше 8 символов" });
                return 0;
            }

            let check = rex_mail.test(String(JSON.stringify(req.body.user_email).toLowerCase()))
            if (!check) {
                res.send({ stat: 1488, info: "Ошибка почты, мы о таких не слышали" });
                return 0;
            }

            let name = await UserInfo.findOne({
                where: {
                    user_name: JSON.stringify(req.body.user_name)
                }
            })

            if (name) {
                console.log('Имя пользователя занято');
                res.send({ stat: 10, info: "Имя пользователя занято" });
                return;
            }

            let email = await UserInfo.findOne({
                where: {
                    user_email: JSON.stringify(req.body.user_email).toLowerCase()
                }
            })

            if (email) {
                console.log('Почта занята занята');
                res.send({ stat: 20, info: "Почта занята занята" });
                return;
            } else {
                await UserInfo.create({
                    user_name: JSON.stringify(req.body.user_name),
                    user_email: JSON.stringify(req.body.user_email).toLowerCase(),
                    user_password: JSON.stringify(req.body.user_password),
                    user_picture: JSON.stringify(req.file),
                })
                console.log('Регистрация успешна')
                res.send({ stat: 1, info: "Регистрация успешна" });
            }
        });
    }

    static auth() {
        server.app.post("/enter", async (req, res) => {
            if (!req.body) return res.sendStatus(400);
            console.log(req.body)
            let user = await User_authDTO.findAll({
                where: {
                    user_email: JSON.stringify(req.body.user_email).toLowerCase(),
                    user_password: JSON.stringify(req.body.user_password),
                }
            })
            if (user && user[0]) {
                res.send({ stat: 0, user: user[0] });
                console.log(user[0])
            } else {
                res.send({ stat: 400 });
            }
        })
    }

    static like() {
        server.app.post("/like", async (req, res) => {
            if (!req.body) return res.sendStatus(400);
            console.log(req.body)
            await FavoriteTracks.create({
                user_id: JSON.stringify(req.body.user_id),
                music_id: JSON.stringify(req.body.music_id),
            })
            res.send({ stat: 0 });
        })
    }

    static get_like() {
        server.app.post("/get_likes", async (req, res) => {
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
    }
}

class cMusic {
    static upload_music() {
        server.app.post("/upload_music", multer().single('music'), async (req, res) => {
            if (!req.body) return res.sendStatus(400);

            console.log(JSON.stringify(req.file))

            res.send({ stat: 400 });

            await Music.create({
                music_name: JSON.stringify(req.file.originalname),
                //music_author: JSON.stringify(req.file.author),
                music_file: JSON.stringify(req.file.buffer),
                //music_picture: picture,
            })
        })
    }

    static get_music() {
        server.app.post("/get_music", async (req, res) => {
            if (!req.body) return res.sendStatus(400);
            console.log(JSON.stringify(req.body));

            let blob = await Music.findOne({
                where: {
                    music_id: JSON.stringify(req.body.music_id)
                }
            })

            let music_file = JSON.stringify({
                "fieldname": "music",
                "originalname": blob.music_name,
                "encoding": "7bit",
                "mimetype": "audio/mpeg",
                "buffer": blob.music_file
            })

            console.log(music_file)
            res.sendFile(multer(music_file));
        })
    }
}

class Server {
    constructor(port, app) {
        this.port = port;
        this.app = app;
    }
    get() {
        Page.redirect_to_main_paige();
        Page.show_main_page();
    }
    post() {
        User.registration();
        User.auth();
        User.like();
        User.get_like();

        cMusic.upload_music();
        cMusic.get_music();
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
