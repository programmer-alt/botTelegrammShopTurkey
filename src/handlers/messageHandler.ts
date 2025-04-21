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
    
  
            // Обработка других сообщений
            if (
              !text || 
              buttonTexts.includes(text) || 
              /^\/|\d+\./.test(text)
            ) {
              return;
            }
      if (text && /^[0-9]+$/.test(text)) {
        const answer = randomGenerateAnswer(config.randomAnswers).text;
                await bot.sendMessage(chatId, answer);
              
      }
            const foundProducts = await productHandler(bot, chatId, text);
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