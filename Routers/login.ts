import {Router} from "express";
import {UserRecord} from "../records/user.record";

export const loginRouter = Router();

loginRouter
    .post('/',  async (req, res) => {
        const {email,password} = req.body
        const data = await UserRecord.getOne(email,password);
        console.log("im data in router", data)
        res.json(data);
    })
