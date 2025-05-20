
import TelegramBot from "node-telegram-bot-api";
import { productHandler } from "../handlers/productHandler";




export const productNavHandler = (bot: TelegramBot) => {
  bot.onText(/\/product/, async (msg: TelegramBot.Message) => {
    const chatId = msg.chat.id;
    
    await productHandler(bot, chatId, '');
  });
};
