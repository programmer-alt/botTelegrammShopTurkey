// Импортируем необходимые модули из express и multer
import express, { NextFunction, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { parseFile } from './services/parserSelector';
import { insertParseProductstoBd } from 'services/fileUploadBD';
import { getProducts } from '../../src/database';


// Создаем экземпляр Express-приложения
const app = express();

// Устанавливаем путь для сохранения загруженных файлов
const uploadPath = path.join(__dirname, '..', 'client', 'src', 'uploads');

// Настраиваем multer для управления загрузкой файлов
const upload = multer({ dest: uploadPath });

// Определяем асинхронную функцию-обработчик для загрузки файлов
export const uploadHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Извлекаем информацию об загруженном файле из запроса
    const { file } = req;

    // Проверяем, был ли файл успешно загружен
    if (!file || !file.path) {
      // Если файл не был загружен, отправляем ошибку с кодом 400
      res.status(400).json({ error: 'Файл не передан' });
      return;
    }

    // Получаем полный путь к загруженному файлу
    const filePath = path.resolve(file.path);

    // Проверяем, существует ли файл по указанному пути
    if (!fs.existsSync(filePath)) {
      // Если файл не существует, отправляем ошибку 404
      res.status(404).json({ error: 'Файл не найден' });
      return;
    }

    // Проверяем права на чтение файла
    try {
      fs.accessSync(filePath, fs.constants.R_OK);
    } catch (err) {
      // Если нет прав на чтение файла, отправляем ошибку с кодом 403
      res.status(403).json({ error: 'Нет прав на чтение файла' });
      return;
    }

    // Получаем расширение файла
    const ext = path.extname(filePath).toLowerCase();

    // Проверяем, поддерживается ли формат файла (.csv или .xlsx)
    if (ext !== '.csv' && ext !== '.xlsx') {
      // Если не поддерживаемый формат, отправляем ошибку с кодом 400
      res.status(400).json({ error: 'Неподдерживаемый формат файла' });
      return;
    }

    // Парсим файл и возвращаем результат
    const parseProducts = await parseFile(filePath);
    await insertParseProductstoBd(parseProducts);
    res.status(200).json(parseProducts);

  } catch (error) {
    // Логируем ошибку при обработке файла
    console.error('Ошибка при обработке файла:', error);
    // Отправляем клиенту сообщение об ошибке с кодом 500
    res.status(500).json({ error: 'Произошла ошибка при обработке файла' });
  }
};

// Регистрируем маршрут для обработки POST-запросов на '/upload'
app.post('api/products/upload', upload.single('file'), uploadHandler);

// маршрут для получения продуктов
app.get('/api/products', async (req: Request, res: Response) => {
  try {
    const products = await getProducts();
    res.status(200).json(products);
  } catch (error) {
    console.log( ' Ошибка при получение продуктов:', error);
    res.status(500).json({ error: 'Ошибка при получении продуктов' });
  }
});

// Устанавливаем порт для запуска сервера
const PORT = 3000;

// Запускаем сервер на указанном порту
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});