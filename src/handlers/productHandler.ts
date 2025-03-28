// Импортируем необходимые модули
import TelegramBot from "node-telegram-bot-api";
import { createMainKeyboard } from "../keyboards/keyboard";
import { config } from "../config/config";
import { getProducts } from "../database";

// Экспортируем асинхронную функцию для обработки продуктов
export const productHandler = async (
  // Принимаем бота, ID чата и строку поиска
  bot: TelegramBot,
  chatId: number,
  searchTerm: string,
): Promise<void> => {
  try {
    // Получаем список продуктов из базы данных
    const products = await getProducts();

    // Фильтруем продукты по введенной строке поиска
    const filteredProducts = searchTerm
      ? products.filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()))
      : products; // Если нет строки поиска, показываем все продукты

    // Проверяем, есть ли продукты
    if ( products.length === 0) {
      // Если продуктов нет, отправляем сообщение об этом
      await bot.sendMessage(chatId, "Продукт не найден.", {
        reply_markup: createMainKeyboard(), // Добавляем клавиатуру с основным меню
      });
      return; // Завершаем функцию
    }

    // Итерируемся по продуктам
    for (const product of products ) {
      // Если у продукта есть изображение, отправляем его
      if (product.image_path) {
        await bot.sendPhoto(chatId, product.image_path);
      }

      // Создаем текст о продукте
      let productText = `🔸 ${product.name}\n`; // Название продукта

      // Если у продукта цена, добавляем ее в текст
      if (product.price) {
        productText += `💵 Цена: ${product.price} руб.\n`;
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
  } catch (error) {
    console.error("Ошибка при обработке продуктов:", error);
  }
};