import { Pool } from 'pg';
import dotenv from 'dotenv';

const envServerPath = { path: 'server/.env.server' };
dotenv.config(envServerPath);

export class Database {
    private static instance: Pool;
    private constructor() {}
    
    public static getInstance(): Pool {
        if (!Database.instance) {
            Database.instance = new Pool({
                user: process.env.DB_USER,
                host: process.env.DB_HOST,
                database: process.env.DB_NAME,
                password: process.env.DB_PASSWORD,
                port: Number(process.env.DB_PORT),
            });
        }
        return Database.instance;
    }
}

export const getProducts = async () => {
    const pool = Database.getInstance();
    const result = await pool.query('SELECT id, name, price, description, image_path FROM product');
    return result.rows;
};
