import csv from 'csv-parser';
import fs from 'fs';
import { Product } from '../models/Product';

export function parseCSV(filePath: string): Promise<Product[]> {
    return new Promise((resolve, reject) => {
        const results: Product[] = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data: any) => {
                results.push({
                    id: Number(data.id),
                    name: data.name,
                    price: data.price ? parseFloat(data.price) : undefined,
                    description: data.description,
                    image_path: data.image_path,
                });
            })
            .on('end', () => {
                resolve(results);
            })
            .on('error', (err) => reject(err));
    });
}