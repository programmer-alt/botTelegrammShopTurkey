
import { Product } from 'models/product';
import xlsx from 'xlsx';




/**
 * Функция для парсинга Excel файла в массив объектов типа Product
 * @param filePath Путь к Excel файлу
 * @returns Массив объектов типа Product
 */
export function parseXLSX(filePath: string): Product[] {
  // Читаем Excel файл
  const workbook = xlsx.readFile(filePath);
  
  // Получаем имя первой страницы в книге
  const sheetName = workbook.SheetNames[0];
  
  // Получаем объект рабочей страницы по имени
  const worksheet = workbook.Sheets[sheetName];
  
  // Преобразуем данные страницы в JSON массив
  const jsonData: any[] = xlsx.utils.sheet_to_json(worksheet);

  // Создаем массив продуктов из преобразованных данных
  const products: Product[] = jsonData.map((row) => ({
    id: row.id,
    name: row.name,
    price: row.price ? parseFloat(row.price) : undefined,
    description: row.description,
    image_path: row.image_path,
  }));

  // Возвращаем массив созданных продуктов
  return products;
}