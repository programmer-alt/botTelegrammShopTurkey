import csv from 'csv-parser'; // Импортируем модуль 'csv-parser', который используется для обработки CSV файлов.
import fs from 'fs'; // Импортируем встроенный модуль 'fs' для работы с файловой системой.
import { Product } from 'models/product';



export function parseCSV(filePath: string): Promise<Product[]> { // Экспортируем функцию 'parseCSV', которая принимает путь к файлу и возвращает промис с массивом объектов 'Product'.
    return new Promise((resolve, reject) => { // Возвращаем новый промис, который будет разрешен или отклонен в зависимости от результата обработки файла.
      const results: Product[] = []; // Создаем пустой массив 'results' для хранения объектов 'Product', извлеченных из CSV файла.
      fs.createReadStream(filePath) // Создаем поток чтения из файла по указанному пути.
        .pipe(csv()) // Передаем поток данных через 'csv-parser' для обработки CSV формата.
        .on('data', (data: any) => { // Обрабатываем каждую строку данных из CSV файла.
          results.push({ // Добавляем новый объект 'Product' в массив 'results'.
            name: data.name, // Извлекаем и сохраняем название продукта из текущей строки данных.
            price: data.price ? parseFloat(data.price) : undefined, // Извлекаем и сохраняем цену продукта, если она существует, преобразуя её в число.
            description: data.description, // Извлекаем и сохраняем описание продукта.
            image_path: data.image_path, // Извлекаем и сохраняем путь к изображению продукта.
            id: Number(data.id), // Извлекаем и сохраняем идентификатор продукта, преобразуя его в число.
          });
        })
        .on('end', () => { // Обработчик события завершения чтения файла.
          resolve(results); // Разрешаем промис, возвращая массив 'results'.
        })
        .on('error', (err) => reject(err)); // Обработчик ошибки, отклоняем промис, передавая ошибку.
    });
}
