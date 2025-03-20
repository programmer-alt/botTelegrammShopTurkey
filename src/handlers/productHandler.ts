import TelegramBot from "node-telegram-bot-api";
import { createMainKeyboard } from "../keyboards/keyboard";
import { config } from "../config/config";
import { getProducts } from "../database";
export const handleProducts = async (bot: TelegramBot, chatId: number) => {
  try {
    const products = await getProducts();
    if (products.length === 0) {
      await bot.sendMessage(chatId, "На данный момент нет доступных продуктов.", {
        reply_markup: createMainKeyboard(),
      });
      return;
    }
    for (const product of products) {
       // Отправляем изображение
      if (product.image_path) {
        await bot.sendPhoto(chatId, product.image_path);
      }
      // Формируем текст с информацией о продукте
      let productText = `🔸 ${product.name}\n`;
      if (product.price) {
        productText += `💵 Цена: ${product.price} руб.\n`;
      }
      if (product.description) {
        productText += `📝 Описание: ${product.description}\n`;
      }
      await bot.sendMessage(chatId, productText, {
        reply_markup: createMainKeyboard(),
      });
    }
  } catch (error) {
    console.error("Ошибка при отправке сообщения:", error);
  }
};
