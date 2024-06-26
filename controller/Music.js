import Router from "express"; // import router from express
import multer from 'multer'

export const MusicRouter = Router();

        MusicRouter.post("/upload_music", multer().single('music'), async (req, res) => {
            if (!req.body) return res.sendStatus(400);

            console.log(JSON.stringify(req.file))

            res.send({ stat: 200 });

            await Music.create({
                music_name: JSON.stringify(req.file.originalname),
                //music_author: JSON.stringify(req.file.author),
                music_file: JSON.stringify(req.file.buffer),
                //music_picture: picture,
            })
        })

        MusicRouter.post("/get_music", async (req, res) => {
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

