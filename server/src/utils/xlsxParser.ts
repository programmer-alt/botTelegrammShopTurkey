// Импорт типа Product из файла ../models/Product
import { Product } from "../models/Product";
// Импорт библиотеки xlsx для работы с Excel файлами
import xlsx from "xlsx";
// Импорт модуля path для работы с путями файлов
import path from "path";

// Экспорт функции parseXLSX, которая принимает путь к файлу и возвращает массив Product
export function parseXLSX(filePath: string): Product[] {
  try {
    // Чтение xlsx файла
    const workbook = xlsx.readFile(filePath);
    // Получение имени первого листа
    const sheetName = workbook.SheetNames[0];
    // Преобразование листа в JSON
    const worksheet = workbook.Sheets[sheetName];
    const jsonData: any[] = xlsx.utils.sheet_to_json(worksheet);
    // Вывод первой строки jsonData в консоль
    console.log('Первая строка jsonData:', jsonData[0]);

    return jsonData
      .map((row) => {
        // Нормализация ключей: приведение к нижнему регистру и удаление пробелов
        const normalizedRow: Record<string, any> = {};
        Object.keys(row).forEach(key => {
          normalizedRow[key.toLowerCase().trim()] = row[key];
        });
        return normalizedRow;
      })
      // Фильтрация строк: оставляем только те, у которых есть id и оно является числом
      .filter((row) => row.id && !isNaN(Number(row.id)))
      .map((row) => {
        // извлекаем путь изображения
       let imagePath = row.image_path;
       if (imagePath) {
        // из пути изображения извлекаем имя изображения
        const fileName = path.basename(imagePath);
        // создаем новый путь к изображению, который начинается с H:\Training\bot_Telegramm\src\imagesProducts\\
       imagePath = `H:\\Training\\bot_Telegramm\\src\\imagesProducts\\${fileName}`;
       }
        // Возвращение объекта Product с обработанными данными
        return {
          id: Number(row.id),
          name: row.name,
          price: row.price ? parseFloat(row.price) : undefined,
          description: row.description,
          image_path: imagePath,
        };
      });
      
  } catch (error) {
    // Обработка ошибок при парсинге файла
    console.error("Error parsing XLSX file:", error);
    return [];
  }
}