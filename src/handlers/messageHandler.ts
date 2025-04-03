import TelegramBot from "node-telegram-bot-api";
import { config } from "../config/config";
import { productHandler } from "./productHandler";

type Answer = { text: string };

export const messageHandler = (bot: TelegramBot) => {
  bot.on("message", async (msg: TelegramBot.Message) => {
    try {
      const {
        chat: { id: chatId },
        text,
      } = msg;
      const buttonTexts = Object.values(config.buttons);
      console.log('тексты кнопок', buttonTexts);
      console.log(`Текст введенный пользователем "${text}":`, buttonTexts.includes(text ?? ''));
      // Если пользователь нажимает кнопку "Продукты"
      if (text === config.buttons.products) {
        // Вызываем productHandler без строки поиска, чтобы показать все продукты
        const productNames = await productHandler(bot, chatId, "");
        if (!productNames) {
          await bot.sendMessage(chatId, "Продукты не найдены.");
        }
        return;
      }

      // Обработка других сообщений
      if (!text || !isNaN(Number(text)) || buttonTexts.includes(text) || /^\/|\d+\./.test(text))   {
        // Обработка команд или чисел
        return;
      }

      let inProductMode = false;
      const answer = randomGenerateAnswer(config.randomAnswers).text;

      if (config.buttons.products) {
        inProductMode = true;
        const result = await productHandler(bot, chatId, text ?? '');

        if (result === null) {
          await bot.sendMessage(chatId, answer);
        } else {
          await bot.sendMessage(chatId, `Найденные продукты: ${result}`);
        }

        return;
      } else if (!config.buttons.products) {
        await bot.sendMessage(chatId, answer);
        inProductMode = false;
      }
    } catch (error) {
      console.error("Ошибка обработчика сообщений messageHandler:", error);
      await bot.sendMessage(
        msg.chat.id,
        "Произошла ошибка при обработке сообщения",
      );
    }
  });
};

const randomGenerateAnswer = (randomAnswers: Answer[]): Answer => {
  return randomAnswers[Math.floor(Math.random() * randomAnswers.length)];
};
