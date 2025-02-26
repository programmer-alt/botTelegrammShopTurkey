import TelegramBot from "node-telegram-bot-api";
import {config}  from '../config/config';

type Answer = { text: string};


export const messageHandler = (bot: TelegramBot) => {
bot.on('message', (msg: TelegramBot.Message) => {
  try {
    const { chat: { id: chatId }, text } = msg;
    const buttonTexts = Object.values(config.buttons);
    if (
      typeof text !== 'string' ||
      /^\/|\d+\./.test(text) ||
      buttonTexts.includes(text)
    ) return;
      const answer = randomGenerateAnswer(randomAnswers).text;
      console.log(' ответ-', answer);
      bot.sendMessage(chatId, answer);
    }
   catch (error) {
    console.error(' Ошибка обработчика сообщений messageHandler :', error);
  }
});

};

const randomAnswers: Answer[] = [
    {text: 'Бот не может отвечать на сообщения, воспользуйтесь навигацией'},
    {text: 'Спасибо за сообщение, бот не может вести диалог, ждём Вас в наш магазин!'},
    {text: 'Бот не может ответить вам, прошу воспользоваться контактными данными если есть вопросы'},
    {text: 'Выберите действие из меню, нажав на кнопку!'},
    { text: 'Послушайте музыку и воспользуйтесь функционалом бота!' },
    
];

const randomGenerateAnswer = (randomAnswers: Answer[]): Answer => {
  return randomAnswers[Math.floor(Math.random() * randomAnswers.length)];
};

