
import { Product } from 'models/product';
// импорт базы данных с помощью алиаса
import {Database }from '@Db';

export async function insertParseProductstoBd(parseProducts: Product[]): Promise<void> {
    // Получаем экземпляр пула подключений к базе данных
    const pool = Database.getInstance();
    // Получаем клиентский сокет для выполнения запросов к базе данных
    const client = await pool.connect();

    try {
        // Используем транзакцию для выполнения нескольких запросов
        await client.query('BEGIN');
        // Добавляем товары в базу данных
        for (const product of parseProducts) {
            await client.query(
                'INSERT INTO products (id, name, price, description, image) VALUES ($1, $2, $3, $4, $5)',
                [product.id, product.name, product.price, product.description, product.image_path],
            );
        }
        // Подтверждаем транзакцию
        await client.query('COMMIT');
    } catch (error) {
        // В случае ошибки откатываем транзакцию
        await client.query('ROLLBACK');
        throw error;
    } finally {
        // Возвращаем соединение в пул
        client.release();
    }
   
}