import TelegramBot from "node-telegram-bot-api";
import { handleProducts } from "../handlers/productHandler";


export const productNavNandler = (bot: TelegramBot) => {
    bot.onText(/\/product/, async (msg: TelegramBot.Message) => {
        try {
            
            await handleProducts(bot, msg.chat.id);
        } catch (error) {
            console.error("Ошибка при обработке продуктов:", error);
        }
    });
};
