import TelegramBot from 'node-telegram-bot-api';
import { config } from '../config/config';

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
    
     // Если пользователь нажимает кнопку "Продукты"
     if (text === config.buttons.products) {
       // Вызываем productHandler без строки поиска, чтобы показать все продукты
       const products = await productHandler(bot, chatId, "");
       
       // Проверяем, есть ли продукты
       if (!products) {
         // Если продуктов нет, отправляем сообщение об этом
         await bot.sendMessage(chatId, "Продукты не найдены.");
       }
       
       // Завершаем обработку этого сообщения
       return;
     }
      // Обработка других сообщений
      if (
        !text ||
        buttonTexts.includes(text) ||
        /^\/|\d+\./.test(text)
      ) {
        // Обработка команд или чисел
        return;
      }

      const foundProducts = await productHandler(bot,chatId, text);
      if (!foundProducts) {
        const answer = randomGenerateAnswer(config.randomAnswers).text;
        await bot.sendMessage(chatId, answer);
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