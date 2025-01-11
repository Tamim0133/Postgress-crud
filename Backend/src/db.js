import pg from "pg";
import env from "dotenv";

env.config();

const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
})

console.log("Connecting to the database...");
await db.connect();
console.log("Database connected successfully!");
db.on('error', (err) => {
    console.error("Unexpected error on idle client", err);
    process.exit(-1);
})

export const query = (text, params) => db.query(text, params);