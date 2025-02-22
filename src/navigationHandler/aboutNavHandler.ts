import TelegramBot from "node-telegram-bot-api";
import {aboutHandler} from "../handlers/aboutHandler";


export const aboutNavHandler = (bot: TelegramBot) => {
    bot.onText(/\/about/, async (msg: TelegramBot.Message) => {
        try {
            const chatId = msg.chat.id;
            await aboutHandler(bot, chatId);
        } catch (error) {
            console.log('Ошибка в обработчике aboutNavHandlertsts:', error);
        }
    });
}

