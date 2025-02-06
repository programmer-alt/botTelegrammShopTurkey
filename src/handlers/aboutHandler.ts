import { config } from '../config/config';
import { createMainKeyboard } from '../keyboards/keyboard';
import TelegramBot from 'node-telegram-bot-api';


export const aboutHandler = async (bot: TelegramBot, chatId: number) => {
    try {
        await bot.sendMessage(chatId, config.messages.about, {
            reply_markup: createMainKeyboard()
        });
    } catch (error) {
        console.error(`Ошибка при отправке сообщения: ${error}`);
    }
};
 