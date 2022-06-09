import {Router} from "express";
import {UserRecord} from "../records/user.record";

export const registerRouter = Router();

registerRouter
    .post('/', async (req, res) => {
        const newUser = new UserRecord(req.body);
        const returnedId =  await newUser.insert();
        res.json(returnedId);
    })
