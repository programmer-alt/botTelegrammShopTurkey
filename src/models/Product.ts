import TelegramBot from 'node-telegram-bot-api';

export interface Product {
    id: number;
    name: string;
    price?: number;
    description?: string;
    image?: string;
}
