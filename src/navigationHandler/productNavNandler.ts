import TelegramBot from "node-telegram-bot-api";
import { handleProducts } from "../handlers/productHandler";

export const productNavNandler = (bot: TelegramBot) => {
  bot.onText(/\/product/, async (msg: TelegramBot.Message) => {
    try {
      // Запрашиваем у пользователя текст для поиска
      await bot.sendMessage(
        msg.chat.id,
        "Введите название продукта для поиска:",
      );
      // Ожидаем ответ от пользователя
      bot.on("message", async (response: TelegramBot.Message) => {
        const searchTerm = response.text || ""; // получаем текст введенный пользователем
        await handleProducts(bot, msg.chat.id, searchTerm);
      });
    } catch (error) {
      console.error("Ошибка при обработке продуктов:", error);
    }
  });
};
