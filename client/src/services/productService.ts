import axios from "axios";
import { Product } from "models/product";

export async function fetchProducts (): Promise<Product[]> {
    try {
        // в response сохраняем 
    const response = await axios.get<Product[]>('/api/products');
    return response.data;
    } catch (error) {
        console.log( ' Ошибка при получение продуктов:', error);
        throw error;
    }
}