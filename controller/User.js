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
        user_name: JSON.stringify(req.body.user_name),
        user_email: JSON.stringify(req.body.user_email).toLowerCase(),
        user_password: JSON.stringify(req.body.user_password),
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
    if (!req.body) return res.sendStatus(400);
    const value = req.url.substring(req.url.lastIndexOf('=') + 1);
    console.log(value)

    jwt.verify(value, SECRET, async (err, user) => {
        console.log(user)
        if (!user) {
            res.send({ stat: 400, info: err });
            return
        }
        await UserInfo.create({
            user_name: user.user_name,
            user_email: user.user_email.toLowerCase(),
            user_password: user.user_password,
        })
    })

    console.log('Регистрация успешна')
    res.send({ stat: 1, info: "Регистрация успешна" });
})

UserRouter.post("/enter", async (req, res) => {
    if (!req.body) return res.sendStatus(400);
    console.log(req.body)
    let user = await UserInfo.findAll({
        where: {
            user_email: JSON.stringify(req.body.user_email).toLowerCase(),
            user_password: JSON.stringify(req.body.user_password),
        }
    })
    if (user && user[0]) {
        req.session.user_id = user[0].user_id;
        console.log(user[0].user_id)
        console.log(req.session.user_id);
        res.send({ stat: 1, user: user[0] });
        console.log(user[0])
    } else {
        res.send({ stat: 400, info: "Пользователь не найден" });
    }
})

UserRouter.post("/like", async (req, res) => {
    if (!req.body) return res.sendStatus(400);
    console.log(req.body)
    await FavoriteTracks.create({
        user_id: JSON.stringify(req.body.user_id),
        music_id: JSON.stringify(req.body.music_id),
    })
    res.send({ stat: 0 });
})

UserRouter.post("/get_likes", async (req, res) => {
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
