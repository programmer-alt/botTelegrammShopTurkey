import { config } from '../config/config';
import TelegramBot from 'node-telegram-bot-api';
import { createMainKeyboard } from '../keyboards/keyboard';

export const welcomeHandler = async (bot: TelegramBot, chatId: number) => {
try {
    await bot.sendMessage(chatId, config.messages.welcome, {
        reply_markup: createMainKeyboard()
    });
} catch (error) {
    console.error('Ошибка в обработчике приветствия:', error);
}
};
