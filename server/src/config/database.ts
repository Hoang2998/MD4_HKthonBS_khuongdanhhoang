import mysql,{PoolOptions,Pool} from 'mysql2/promise'
import dotenv from 'dotenv'
dotenv.config()

const dbConfig:PoolOptions ={
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT)
}

export const pool:Pool = mysql.createPool(dbConfig)