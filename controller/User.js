import Router from "express"; // import router from express
import multer from 'multer'
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

import { UserInfo } from "../db/connection.js";
import { FavoriteTracks } from "../db/connection.js";
import { SECRET } from "../app.js";

export const UserRouter = Router();

let rex_mail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

const emailTransporter = nodemailer.createTransport({
    service: 'mail.ru',
    auth: {
        user: 'kiber.one.official@mail.ru',
        pass: process.env.MAILPASS
    }
});

UserRouter.post("/reg", multer().single('picture'), async (req, res) => {
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
    }

    console.log("Верефикации пройдены")

    const host = process.env.HOST;
    const port = process.env.PORT;
    const emailToken = jwt.sign({
        user_name: (req.body.user_name),
        user_email: (req.body.user_email).toLowerCase(),
        user_password: (req.body.user_password),
    }, SECRET, { expiresIn: '1h' });

    console.log("Токен создан", emailToken)

    const verificationUrl = `http://${host}:${port}/valid?token=${emailToken}`
    console.log("Письмо создано")
    /*await emailTransporter.sendMail({
        from: 'kiber.one.official@mail.ru',
        to: JSON.stringify(req.body.user_email).toLowerCase(),
        subject: 'Подверждение Вашего Email',
        html: `
        <html lang="ru">
        <!DOCTYPE html>
        <div>
        <h1>Подверждение акаунта Trapify</h1>
        <p> <a href="${verificationUrl}">Я псина</a> </p>       
        </div>
        `
    });*/
    res.send({ stat: 1, info: "Регистрация успешна пожалуйста подвердите почту" });
});

UserRouter.get("/valid", async (req, res) => {
    try {
        if (!req.body) return res.sendStatus(400);
        const value = req.url.substring(req.url.lastIndexOf('=') + 1);
        if (!value) return res.sendStatus(400);
        console.log(value)

        let userdata
        jwt.verify(value, SECRET, async (err, user) => {
            try {
                console.log(user)
                if (!user) {
                    return
                }
                if (err) {
                    console.log(err)
                    res.send({ stat: 418, info: "Запрос некорректный" });
                    return
                }
                await UserInfo.create({
                    user_name: user.user_name,
                    user_email: user.user_email.toLowerCase(),
                    user_password: user.user_password,
                })
                userdata = await UserInfo.findOne({
                    where: {
                        user_email: user.user_email.toLowerCase(),
                        user_password: user.user_password,
                    }
                })
                if (userdata && userdata[0]) {
                    req.session.user_id = userdata[0].user_id;
                    console.log(req.session.user_id);
                }
            } catch {
                console.log("Ошибка верификации")
                return
            }
        })

        res.send({ stat: 200, info: "Выполнено" });
    } catch {
        res.send({ stat: 418, info: "Запрос некорректный" });
    }
})

UserRouter.post("/enter", async (req, res) => {
    if (!req.body) return res.sendStatus(400);
    console.log(req.body)
    let user = await UserInfo.findAll({
        where: {
            user_email: (req.body.user_email).toLowerCase(),
            user_password: (req.body.user_password),
        }
    })
    if (user && user[0]) {
        req.session.user_id = user[0].user_id;
        console.log(req.session.user_id);
        res.send({
            stat: 1, user: {
                user_id: (user[0].user_name),
                user_name: (user[0].user_name),
                user_email: (user[0].user_email).toLowerCase(),
                user_picture: (user[0].user_picture),
            }
        });
        console.log(user[0])
    } else {
        res.send({ stat: 400, info: "Пользователь не найден" });
    }
})

UserRouter.post("/like_music", async (req, res) => {
    try {
        if (!req.body && !req.session.user_id) return res.sendStatus(400);
        console.log(JSON.stringify(req.body))
        const find_like = await FavoriteTracks.findOne({
            where: {
                user_id: req.session.user_id,
                music_id: JSON.stringify(req.body.music_id),
            }
        })
        console.log(find_like)
        if (find_like) {
            await FavoriteTracks.destroy({
                where: {
                    user_id: req.session.user_id,
                    music_id: JSON.stringify(req.body.music_id),
                }
            })
            res.send({ stat: 200, info: "Лайк убран" });
        } else {
            await FavoriteTracks.create({
                user_id: req.session.user_id,
                music_id: JSON.stringify(req.body.music_id),
            })
            res.send({ stat: 200, info: "Лайк поставлен" });
        }
    } catch {
        res.send({ stat: 418, info: "Запрос некорректный" });
    }
})

UserRouter.post("/get_likes_music", async (req, res) => {
    if (!req.body) return res.sendStatus(400);
    console.log(req.body)
    let likes = await FavoriteTracks.findAll({
        where: {
            user_id: JSON.stringify(req.body.user_id)
        }
    })
    if (likes && likes[0]) {
        res.send({ stat: 200, likes: likes });
        console.log(likes[0])
    } else {
        res.send({ stat: 400 });
    }
})

UserRouter.post("/enter_admin", async (req, res) => {
    if (!req.body) return res.sendStatus(400);
    console.log(req.body)
    req.session.admin_session = true;
    console.log(req.session.admin_session);
    res.send({ stat: 200, info: "Сессия админа создана" });
})
