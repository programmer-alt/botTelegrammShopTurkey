import TelegramBot from "node-telegram-bot-api";
import dotenv from 'dotenv';
import { Config } from "../models/ConfigSettings.js";
import path from "path";

const envPath = path.resolve(__dirname, '../.env.bot');
dotenv.config({path: envPath});

 export const config: Config = {
    token: process.env.TELEGRAM_BOT_TOKEN || '',
    bot: {
        polling: true,
        port: Number(process.env.PORT) || 3001,
    },
    messages: {
        welcome: 'Добро пожаловать в магазин Индюшонок! Выберете действия:',
        help: `
        /start - Начать диалог 🚀
        /products - Просмотреть продуктовы 🛒
        /about - О нас 👥
        /contacts - Контакты 📞
        /help - Справка ❓
        /music - Музыка 🎵
    `,
        about: ' Магазин Индюшонок находится в г.Кореновске по ул.Мира 123',
        contacts: ' телефон +7(999)999-99-99 e-mail info@indjoshonok.ru',
        products: 'Наши продукты',
        music: '🎵Музыкальный раздел🎵',
    },
    buttons: {
        products: 'Продукты 🛒',
        about: 'О нас 👥',
        contacts: 'Контакты 📞',
        help: 'Помощь ❓',
        mainMenu: 'Главное меню 🏠',
        music: 'Музыка 🎵',
    },
    systemMessage: {
        loadingMusicMessage: '⬆️  Загрузка музыки, пожалуйста, подождите...➡️',
    },
    randomAnswers: [
        { text: "Бот не может отвечать на сообщения, воспользуйтесь навигацией" },
        {
          text: "Спасибо за сообщение, бот не может вести диалог, ждём Вас в наш магазин!",
        },
        {
          text: "Бот не может ответить вам, прошу воспользоваться контактными данными если есть вопросы",
        },
        { text: "Выберите действие из меню, нажав на кнопку!" },
        { text: "Послушайте музыку и воспользуйтесь функционалом бота!" },
      ],
};

