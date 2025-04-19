import TelegramBot from "node-telegram-bot-api";
import { getProducts } from "../database";
import { createMainKeyboard } from "../keyboards/keyboard";

export const productHandler = async (
  bot: TelegramBot,
  chatId: number,
  productName: string,
): Promise<string | null> => {
  try {
    // Отправляем сообщение о загрузке только один раз
    const loadingMessage = await bot.sendMessage(chatId, "⏳ Загружаю продукты...");
    
    const products = await getProducts();
    const totalProductsCount = products.length;

    const filteredProducts = productName
      ? products.filter((product) =>
          product.name.toLowerCase().includes(productName.toLowerCase()),
        )
      : products;

    // Удаляем сообщение о загрузке (приводим message_id к number)
    await bot.deleteMessage(chatId, Number(loadingMessage.message_id));

 
    if (!products.length) {
      await bot.sendMessage(chatId, "❌ По вашему запросу товары не найдены");
      return null;
    }
    
    

    // Отправляем сообщение только если есть продукты
    await bot.sendMessage(
      chatId,
      `✅ Найдено товаров: ${filteredProducts.length}\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `Сейчас покажем...`,
      {parse_mode: 'Markdown'},
    );


    const productResults = [];
    
    for (const product of filteredProducts) {
      if (product.image_path) {
        await bot.sendPhoto(chatId, product.image_path);
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