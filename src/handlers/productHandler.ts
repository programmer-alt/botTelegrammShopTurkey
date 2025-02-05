import TelegramBot from 'node-telegram-bot-api';
import { products } from '../data/products';
import { createMainKeyboard } from '../keyboards/keyboard';
import { config } from '../config/config';



export const handleProducts = async (bot: TelegramBot, chatId: number) => {
    try {
        const productList = products.map(product => `🔸 ${product.name}`).join('\n');

   await bot.sendMessage(chatId, `${config.messages.products}\n${productList}`, {
        reply_markup: createMainKeyboard()
    });
    } catch (error) {
        console.error('Ошибка при отправке сообщения:', error);
    }
}