import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";
dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
});

console.log("DB_USER:", process.env.DB_USER);
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_PASSWORD:", typeof process.env.DB_PASSWORD, process.env.DB_PASSWORD ? "Loaded" : "NOT LOADED");
console.log("DB_PORT:", process.env.DB_PORT);


export const query = (text: string, params?: any[]) => pool.query(text, params);
