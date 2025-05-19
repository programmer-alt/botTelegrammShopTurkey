import { Product } from '../models/Product';
import { Database } from '../database';

/**
 * Вставляет массив продуктов в базу данных.
 * 
 * Для каждого продукта из массива выполняется вставка в таблицу products.
 * Вся операция выполняется в рамках одной транзакции:
 * - Если все вставки проходят успешно, транзакция фиксируется (COMMIT).
 * - Если возникает ошибка, все изменения откатываются (ROLLBACK).
 * После завершения работы соединение с базой возвращается в пул.
 * !экспортируется функция insertParseProductstoBd.
 * @param parseProducts - массив продуктов для вставки в базу данных
 */
export async function insertParseProductstoBd (parseProducts: Product[]): Promise<void> {
    const pool = Database.getInstance();
    const client = await pool.connect();

    try {
        console.log('Вставляем продукты в БД:', parseProducts);
        if (!parseProducts.length) {
            console.warn('Массив продуктов для вставки пустой!');
            return;
        }
        await client.query('BEGIN');
        for (const product of parseProducts) {
            console.log('Вставка продукта:', product);
            await client.query(
                'INSERT INTO product (id, name, price, description, image_path) VALUES ($1, $2, $3, $4, $5)',
                [product.id, product.name, product.price, product.description, product.image_path],
            );
        }
        await client.query('COMMIT');
        console.log('Вставка завершена успешно!');
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Ошибка при вставке в БД:', error);
        throw error;
    } finally {
        client.release();
    }
}