import { Request, Response, Router } from 'express';
import path from 'path';
import fs from 'fs';
/**
 * Модуль обработки изображений продуктов
 
 * Структура:
 * - Создает Express роутер для обработки запросов
 * - Определяет путь к директории с изображениями
 * - Реализует обработчик GET-запроса для получения изображения
 * - Проверяет наличие файла и возвращает 404 при отсутствии
 * - Отправляет файл клиенту при успешной проверке
 * 
 * Используется в серверной части приложения для предоставления доступа к изображениям продуктов через API
 */
const router = Router();

const imagesDir = path.join(__dirname, '../../src/imagesProducts');

router.get('/:filename', (req: Request, res: Response) => {
  const { filename } = req.params;
  const filePath = path.join(imagesDir, filename);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ error: 'Изображение не найдено' });
    }
    res.sendFile(filePath);
  });
});

export default router;