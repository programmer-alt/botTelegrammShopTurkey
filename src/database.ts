import {Pool} from 'pg';
import dotenv from 'dotenv';
dotenv.config();

class Database {
    private static instance: Pool;
    private constructor () {}
    public static getInstance (): Pool {
        if (!Database.instance) {
            Database.instance = new Pool ({
                user: 'postgres',
                host: 'localhost',
                database: 'product_catalog',
                password: process.env.DB_PASSWORD,
                port: 5433,
            });
        }
        return Database.instance;
        }
}

export const getProducts =  async () => {
    const pool = Database.getInstance();
    const result = await pool.query('SELECT id, name, price, description, image_path FROM product');
    console.log('полученные продукты', result.rows);
    console.log(' количество продуктов', result.rows.length);
    return result.rows;
    
};

