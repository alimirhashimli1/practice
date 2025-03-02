import { Pool } from "pg";
const config = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT, 10),
};
const pool = new Pool(config);
export const query = async (text, params) => {
    return pool.query(text, params);
};
