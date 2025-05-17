import axios from "axios";
import { Product } from "../models/product";

const API_URL = 'http://localhost:3000/api';

export async function fetchProducts(): Promise<Product[]> {
    try {
        const response = await axios.get<Product[]>(`${API_URL}/products`);
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении продуктов:', error);
        throw error;
    }
}
/**
 * Сервис для работы с продуктами через API.
 * Содержит функции для получения списка продуктов и загрузки новых продуктов на сервер.
 */
export async function uploadProducts(file: File): Promise<Product[]> {
    try {
        const formData = new FormData();
        formData.append('file', file);
        const response = await axios.post<Product[]>(`${API_URL}/products/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Ошибка при загрузке файла:', error);
        throw error;
    }
}
