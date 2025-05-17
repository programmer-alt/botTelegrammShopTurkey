import path from "path";
import { parseCSV } from './csvParser';
import { parseXLSX } from './xlsxParser';
import { Product } from "../models/Product";

export async function parseFile(filePath: string): Promise<Product[]> {
    const ext = path.extname(filePath).toLowerCase();
    switch(ext) {
        case '.csv':
            return await parseCSV(filePath);
        case '.xlsx': 
            return await parseXLSX(filePath);
        default:
            throw new Error('Не поддерживаемый формат');
    }
}