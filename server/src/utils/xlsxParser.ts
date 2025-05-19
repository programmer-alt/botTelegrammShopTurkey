import { Product } from "../models/Product";
import xlsx from "xlsx";

export function parseXLSX(filePath: string): Product[] {
  // чтение файла xlsx
  const workbook = xlsx.readFile(filePath);
  // получение данных из первой таблицы
  const sheetName = workbook.SheetNames[0];
  // преобразование данных в массив объектов
  const worksheet = workbook.Sheets[sheetName];
  //
  const jsonData: any[] = xlsx.utils.sheet_to_json(worksheet);
console.log('Первая строка jsonData:', jsonData[0]);
  return jsonData
    .map((row) => {
      // Приводим все ключи к нижнему регистру и убираем пробелы по краям
      const normalizedRow: Record<string, any> = {};
      Object.keys(row).forEach(key => {
        normalizedRow[key.toLowerCase().trim()] = row[key];
      });
      return normalizedRow;
    })
    .filter((row) => row.id && !isNaN(Number(row.id)))
    .map((row) => ({
      id: Number(row.id),
      name: row.name,
      price: row.price ? parseFloat(row.price) : undefined,
      description: row.description,
      image_path: row.image_path,
    }));
}