import Router from "express"; // import router from express
import multer from 'multer'

import { Music } from "../db/connection.js";

export const MusicRouter = Router();


MusicRouter.post("/upload_music", multer().single('music'), async (req, res) => {
    if (!req.body) return res.sendStatus(400);

    console.log(JSON.stringify(req.file))

    res.send({ stat: 200 });

    await Music.create({
        music_name: JSON.stringify(req.file.originalname),
        //music_author: JSON.stringify(req.file.author),
        music_file: JSON.stringify(req.file),
        //music_picture: picture,
    })
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
        let music_file = JSON.stringify({
            fieldname: "music",
            originalname: blob[0].music_name,
            file: blob[0].music_file
        })
        console.log(blob)
        console.log(music_file[0])
        //res.sendFile(multer(music_file));
        res.send((music_file));
    } else {
        res.send({ stat: 400, info: "Такой песни не существует" });
    }
})
