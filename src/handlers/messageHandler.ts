import TelegramBot from "node-telegram-bot-api";
import {config}  from '../config/config';

type Answer = { text: string};


export const messageHandler = (bot: TelegramBot) => {
bot.on('message', (msg: TelegramBot.Message) => {
  try {
    const chatId = msg.chat.id;
    const buttonTexts = Object.values(config.buttons);
    if (msg.text && !msg.text.startsWith('/') && !buttonTexts.includes(msg.text)) {
      const answer = randomGenerateAnswer(randomAnswers).text
      console.log(' ответ-', answer)
      bot.sendMessage(chatId, answer)
    }
  } catch (error) {
    console.error('Error handling message:', error);
  }
});

}

const randomAnswers: Answer[] = [
    {text: 'Бот не может отвечать на сообщения, воспользуйтесь навигацией'},
    {text: 'Спасибо за сообщение, бот не может вести диалог, ждём Вас в наш магазин!'},
    {text: 'Бот не может ответить вам, прошу воспользоваться контактными данными если есть вопросы'}
]

const randomGenerateAnswer = (randomAnswers: Answer[]): Answer => {
  return randomAnswers[Math.floor(Math.random() * randomAnswers.length)];
};

