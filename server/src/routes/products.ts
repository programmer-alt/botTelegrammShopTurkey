import express, { Request, Response, Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { parseFile } from '../utils/parserSelector';
import { insertParseProductstoBd } from '../utils/fileUploadBD';
import { getProducts } from '../database';

/**
 * Маршруты для работы с продуктами.
 * 
 * В этом файле определены API-эндпоинты для загрузки файлов с продуктами (POST /upload)
 * и получения списка продуктов (GET /). 
 * Здесь реализована логика обработки загрузки, парсинга и сохранения товаров в базу данных,
 * а также получения всех товаров для клиента.
 * 
 * Используется в качестве роутера Express и подключается к основному приложению на сервере.
 */

const router: Router = express.Router();

// Настраиваем multer для управления загрузкой файлов
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads');
    // Проверяем, существует ли папка uploads, если нет - создаем
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

// Обработчик для загрузки файлов
router.post('/upload', upload.single('file'), async (req: Request, res: Response) => {
  try {
    const { file } = req;
    console.log('Загрузка файла:', file);
    console.log('Имя файла:', file?.originalname);

    if (!file || !file.path) {
      console.log('Файл не передан');
      res.status(400).json({ error: 'Файл не передан' });
      return;
    }

    const filePath = path.resolve(file.path);
    console.log('Путь к файлу:', filePath);

    if (!fs.existsSync(filePath)) {
      console.log('Файл не найден:', filePath);
      res.status(404).json({ error: 'Файл не найден' });
      return;
    }

    try {
      fs.accessSync(filePath, fs.constants.R_OK);
    } catch (err) {
      console.log('Нет прав на чтение файла:', filePath);
      res.status(403).json({ error: 'Нет прав на чтение файла' });
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    console.log('Расширение файла:', ext);

    if (ext !== '.csv' && ext !== '.xlsx') {
      console.log('Неподдерживаемый формат файла:', ext);
      res.status(400).json({ error: 'Неподдерживаемый формат файла' });
      return;
    }

    console.log('Начинаем парсинг файла...');
    const parseProducts = await parseFile(filePath);
    console.log('Распарсенные продукты:', parseProducts);

    if (parseProducts.length > 0) {
      await insertParseProductstoBd(parseProducts);
      console.log('Продукты успешно добавлены в БД!!!');
    } else {
      console.log(' Не удалось добавить продукты в БД');
    }

  

    res.status(200).json(parseProducts);

  } catch (error) {
    console.error('Ошибка при обработке файла:', error);
    res.status(500).json({ error: 'Произошла ошибка при обработке файла' });
  }
});

// Маршрут для получения продуктов
router.get('/', async (_req: Request, res: Response) => {
  try {
    const products = await getProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error('Ошибка при получении продуктов:', error);
    res.status(500).json({ error: 'Ошибка при получении продуктов' });
  }
});

export default router;