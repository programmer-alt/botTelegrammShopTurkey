import  TelegramBot  from "node-telegram-bot-api";
import {contactHandler} from "../handlers/contactHandler";

export const contactNavHandler = (bot: TelegramBot) => {
    bot.onText(/\/contacts/, async (msg: TelegramBot.Message) => {
        try {
            await contactHandler(bot, msg.chat.id)
        } catch (error) {
            console.log('Ошибка в обработчике contactNavHandler:', error);
        }
    });
}