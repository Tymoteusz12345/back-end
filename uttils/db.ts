import {createPool} from "mysql2/promise";

export const pool = createPool({
    host: 'localhost',
    user: 'root',
    database: 'spaceX_users',
    namedPlaceholders: true,
    decimalNumbers: true,
})
