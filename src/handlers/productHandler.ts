import TelegramBot from "node-telegram-bot-api";
import axios from "axios";
import { createMainKeyboard } from "../keyboards/keyboard";
import { config } from "../config/config";
import { Product } from "../../common/models/product";
import fs from "fs";

export const productHandler = async (
  bot: TelegramBot,
  chatId: number,
  productName: string,
): Promise<string | null> => {
  try {
    // Отправляем сообщение о загрузке только один раз
    const loadingMessage = await bot.sendMessage(
      chatId,
      "⏳ Загружаю продукты..."
    );

    const response = await axios.get("http://localhost:3001/api/products");
    const products = response.data;
    const totalProductsCount = products.length;

    const filteredProducts = productName
      ? products.filter((product: Product) =>
          product.name.toLowerCase().includes(productName.toLowerCase())
        )
      : products;

    // Удаляем сообщение о загрузке (приводим message_id к number)
    await bot.deleteMessage(chatId, Number(loadingMessage.message_id));
    await bot.sendMessage(
      chatId,
      `📊 Всего продуктов в базе: ${totalProductsCount} 🛒\n\n🔹 Все продукты: ${products
        .map((p: Product) => p.name)
        .join(", ")}`,
      { parse_mode: "Markdown" }
    );

    const productResults = [];

    for (const product of filteredProducts) {
      if (product.image_path) {
        // проверяет наличие файла по указанному пути
        if (fs.existsSync(product.image_path)) {
          // отправление фото если файл существует
          await bot.sendPhoto(chatId, fs.createReadStream(product.image_path));
        } else {
          await bot.sendMessage(chatId, "Фото не найдено на сервере.");
        }
      }

      const productText = [
        `🏷️ ${product.name}`,
        product.price && `💰 Цена: ${product.price} руб.`,
        product.description && `📝 Описание: ${product.description}`,
      ]
        .filter(Boolean)
        .join("\n");

      await bot.sendMessage(chatId, productText, {
        reply_markup: createMainKeyboard(),
      });

      productResults.push(product.name);
    }

    return productResults.join(", ");
  } catch (error) {
    console.error("Ошибка при обработке продуктов:", error);
    await bot.sendMessage(chatId, "Произошла ошибка при получении продуктов", {
      reply_markup: createMainKeyboard(),
    });
    return null;
  }
};

export default productHandler;
