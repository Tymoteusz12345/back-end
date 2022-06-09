import express, {json} from "express";
import cors from "cors";
import 'express-async-errors';
import {handleError} from "./uttils/errors";
import {loginRouter} from "./Routers/login";
import {registerRouter} from "./Routers/Register";

const app = express();

app
    .use(cors({
        origin: 'http://localhost:3000',
        methods: ['GET','POST'],

    }))
    .use(json())
    .use('/login', loginRouter)
    .use('/register', registerRouter)
    .use(handleError)
    .listen(3003, '0.0.0.0', () => {
        console.log('Listening on port http://localhost:3000')
    })
