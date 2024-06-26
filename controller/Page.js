import Router from "express"; // import router from express

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const PageRouter = Router();

        PageRouter.get('/registration', async (req, res) => {     
            res.send({ stat: 200 });
        });   

        PageRouter.get('/', async (req, res) => {
            const user_id = req.session.user_id
            console.log(user_id)
            if (user_id){
                try {
                    res.sendFile(__dirname + "/main.html");
                } catch (err) {
                    console.error(err);
                }
            } else {
                console.log("Вы пидорас")
                res.redirect("/registration")
            }

        });