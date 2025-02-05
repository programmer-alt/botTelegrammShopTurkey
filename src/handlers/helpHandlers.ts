import TelegramBot from "node-telegram-bot-api";
import {config}  from '../config/config';
import {createMainKeyboard} from '../keyboards/keyboard';

export const helpHandler = async (bot: TelegramBot, chatId: number) => {
    try {
        await bot.sendMessage(chatId, config.messages.help, {
            reply_markup: createMainKeyboard()
        });
    } catch (error) {
        console.error('Ошибка при отправке сообщения:', error);
    }
}


