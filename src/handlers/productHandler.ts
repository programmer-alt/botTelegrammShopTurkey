// Импортируем необходимые модули
import TelegramBot from "node-telegram-bot-api";
import { createMainKeyboard } from "../keyboards/keyboard";
import { config } from "../config/config";
import { getProducts } from "../database";

// Экспортируем асинхронную функцию для обработки продуктов
export const productHandler = async (
  bot: TelegramBot,
  chatId: number,
  productName: string,
): Promise<string | null> => {
  try {
    // Получаем актуальный список продуктов из базы данных
    const products = await getProducts();
    
    // Фильтруем продукты по введенной строке поиска
    const filteredProducts = productName
      ? products.filter((product) =>
          product.name.toLowerCase().includes(productName.toLowerCase()),
        )
      : products;

    // Проверяем, есть ли продукты
    if (filteredProducts.length === 0) {
      await bot.sendMessage(chatId, "Продукты не найдены", {
        reply_markup: createMainKeyboard(),
      });
      return null;
    }

    // Отправляем сообщение о количестве найденных продуктов
    await bot.sendMessage(
      chatId,
      `Найдено продуктов: ${filteredProducts.length}`
    );

    // Итерируемся по продуктам
    for (const product of filteredProducts) {
      // Если у продукта есть изображение, отправляем его
      if (product.image_path) {
        await bot.sendPhoto(chatId, product.image_path);
      }
      
      // Создаем текст о продукте
      let productText = `🏷️ ${product.name}\n`;
      // Если у продукта цена, добавляем ее в текст
      if (product.price) {
        productText += `💰 Цена: ${product.price} руб.\n`;
      }
      // Если у продукта описание, добавляем его в текст
      if (product.description) {
        productText += `📝 Описание: ${product.description}\n`;
      }
      
      // Отправляем текст о продукте с клавиатурой основного меню
      await bot.sendMessage(chatId, productText, {
        reply_markup: createMainKeyboard(),
      });
    }
    
    return filteredProducts.map((product) => product.name).join(", ");
  } catch (error) {
    console.error("Ошибка при обработке продуктов:", error);
    await bot.sendMessage(
      chatId,
      "Произошла ошибка при получении продуктов",
      { reply_markup: createMainKeyboard() }
    );
    return null;
  }
};
