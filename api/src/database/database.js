import mysql from "promise-mysql";
import config from "../config.js";


const connection = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
})

const getConnection = async () => {
    return await connection;
}

export const methods = {
    getConnection
}