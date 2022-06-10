import {pool} from '../uttils/db'
import {UserRegisterType, RecordUserType} from "../types"
import {ValidationError} from "../uttils/errors";
import {v4 as uuid} from "uuid";
import {FieldPacket} from "mysql2";
const bcrypt = require('bcryptjs');
const saltRounds = 10;

type userResults = [RecordUserType[],FieldPacket[]]

export class UserRecord implements RecordUserType {
    id: string;
    email: string;
    password: string

    constructor(obj: UserRegisterType) {
        if(obj.email.length > 50 || obj.email.length <= 4){
            throw new ValidationError(`Email length should be no more than 50 and at least 5.`)
        }
        if(obj.password.length > 50 ||  obj.password.length <= 4){
            throw new ValidationError(`Password length should be no more than 50 and at least 5.`)
        }
        this.id = obj.id;
        this.email = obj.email;
        this.password = obj.password;

    }

    static async getOne(email: string,password:string): Promise<boolean> {

        const [results] = await pool.execute("SELECT * FROM `users` WHERE `email` = :email", {
            email,
        }) as userResults

        if(results.length > 0){
              const match = await bcrypt.compare(password,results[0].password);
              console.log(match)
              return match

        } else {
            return false
        }

    }

    async insert(): Promise<string>{
        if(!this.id){
            this.id = uuid();
        } else {
            throw new Error(`this element has ID already, and cannot be inserted again.`)
        }
        bcrypt.hash(this.password, saltRounds, async (err: any,hash: any) => {
            if(err) {
                console.log(err)
            }
            const [results] = await pool.execute("INSERT INTO `users` values(:id,:email,:password)",{
                id: this.id,
                email:this.email,
                password: hash
            })
        })



        return this.id
    }



}
