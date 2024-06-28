import Router from "express"; // import router from express
import multer from 'multer'
const upload = multer()

import { Music, PlayList, PlayListMusic } from "../db/connection.js";

export const MusicRouter = Router();

const musicup = upload.fields([{ name: 'music', maxCount: 1 }, { name: 'picture', maxCount: 1 }])

MusicRouter.post("/upload_music", musicup, async (req, res) => {
    try {
        if (!req.body) return res.sendStatus(400);
        if (!req.file && !req.files['picture'][0]) return res.sendStatus(400);

        console.log(req.body)

        await Music.create({
            music_name: (req.body.music_name),
            music_author: (req.body.music_author),
            music_picture: JSON.stringify(req.files['picture'][0]),
            music_file: JSON.stringify(req.files['music'][0]),
        })
        res.send({ stat: 200, info: "Песня добавлена" });
    } catch {
        res.send({ stat: 418, info: "Запрос некорректный" });
    }
})

MusicRouter.post("/get_music", multer().single("music"), async (req, res) => {
    if (!req.body) return res.sendStatus(400);
    console.log(JSON.stringify(req.body));

    let blob = await Music.findAll({
        where: {
            music_id: JSON.stringify(req.body.music_id)
        }
    })

    if (blob && blob[0]) {
        let music_file = {
            music_name: (blob[0].music_name),
            music_author: (blob[0].music_author),
            music_picture: blob[0].music_picture,
            music_file: blob[0].music_file
        }
        res.send({ music: music_file });
    } else {
        res.send({ stat: 404, info: "Такой песни не существует" });
    }
})

MusicRouter.get("/get_all_music", async (req, res) => {
    if (!req.body) return res.sendStatus(400);
    console.log(JSON.stringify(req.body));

    let blob = await Music.findAll();

    if (blob && blob[0]) {
        let all_music = []

        blob.forEach((item, i, blob) => {

            all_music[i] = {
                music_id: blob[i].music_id,
                music_author: blob[i].music_author,
                music_picture: blob[i].music_picture,
                originalname: blob[i].music_name,
            }

        })

        console.log(blob);
        console.log(all_music);
        res.send((all_music));
    } else {
        res.send({ stat: 404, info: "Песен не найдено" });
    }
})

MusicRouter.post("/create_playlist", musicup, async (req, res) => {
    try {
        if (!req.body) return res.sendStatus(400);
        if (!req.body.playlist_name) return res.sendStatus(400);
        if (!req.file && !req.files['picture'][0]) return res.sendStatus(400);

        res.send({ stat: 200 });
        console.log(req.body);

        await PlayList.create({
            playlist_name: (req.body.playlist_name),
            playlist_pic: JSON.stringify(req.files['picture'][0]),
        });
    } catch {
        res.send({ stat: 418, info: "Запрос некорректный" });
    }
})

MusicRouter.post("/add_song_in_playlist", async (req, res) => {
    try {
        if (!req.body) return res.sendStatus(400);

        const find_this = await PlayListMusic.findAll({
            where: {
                playlist_id_mus: JSON.stringify(req.body.playlist_id_mus),
                music_id: JSON.stringify(req.body.music_id)
            }
        });

        if (find_this && find_this[0]) {
            res.send({ stat: 400, info: "Такая песня уже в плейлисте" });
        } else {
            try {
                await PlayListMusic.create({
                    playlist_id_mus: JSON.stringify(req.body.playlist_id_mus),
                    music_id: JSON.stringify(req.body.music_id),
                });
                res.send({ stat: 200, info: "Песня добавлена" });
            } catch {
                res.send({ stat: 404, info: "Нет такого плейлиста или песни" });
            }

        }
    } catch {
        res.send({ stat: 418, info: "Запрос некорректный" });
    }

})

MusicRouter.post("/delete_song", async (req, res) => {
    try {
        if (!req.body) return res.sendStatus(400);

        await Music.destroy({
            where: {
                music_id: JSON.stringify(req.body.music_id)
            }
        })

        res.send({ stat: 200, info: "Песня удаленна" })
    } catch {
        res.send({ stat: 418, info: "Запрос некорректный" });
    }
})

MusicRouter.post("/update_music", musicup, async (req, res) => {
    try {
        if (!req.body) return res.sendStatus(400);

        await Music.update(
            {
                music_author: (req.body.music_author),
                music_name: (req.body.music_name),
                music_picture: JSON.stringify(req.files['picture'][0]),
                music_file: JSON.stringify(req.files['music'][0])
            },
            {
                where: {
                    music_id: req.body.music_id
                }
            }
        )

        res.send({ stat: 200, info: "Обновление выполнено" });

    } catch {
        res.send({ stat: 418, info: "Запрос некорректный" });
    }
})