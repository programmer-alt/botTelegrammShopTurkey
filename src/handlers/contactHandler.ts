import { config } from '../config/config';
import { createMainKeyboard } from '../keyboards/keyboard';
import TelegramBot from 'node-telegram-bot-api';

export const contactHandler = async (bot: TelegramBot, chatId: number) => {
try {
    await bot.sendMessage(chatId, config.messages.contacts, {
        reply_markup: createMainKeyboard()
    });
} catch (error) {
    console.error('Ошибка в обработчике контактов:', error);
}
};
