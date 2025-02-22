import TelegramBot from "node-telegram-bot-api";
import dotenv from 'dotenv';
import { Config } from "../models/ConfigSettings.js";

dotenv.config();

 export const config: Config = {
    token: process.env.TELEGRAM_BOT_TOKEN || '',
    bot: {
        polling: true
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
        music: '🎵Музыкальный раздел🎵'
    },
    buttons: {
        products: 'Продукты 🛒',
        about: 'О нас 👥',
        contacts: 'Контакты 📞',
        help: 'Помощь ❓',
        mainMenu: 'Главное меню 🏠',
        music: 'Музыка 🎵'
    },
    systemMessage: {
        loadingMusicMessage: '⬆️  Загрузка музыки, пожалуйста, подождите...➡️'
    }
};

