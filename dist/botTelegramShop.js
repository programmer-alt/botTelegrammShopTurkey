"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const token = process.env.TELEGRAM_BOT_TOKEN;
console.log('TELEGRAM_BOT_TOKEN:', token); // Для отладки
if (!token) {
    throw new Error('Телеграм бот не найден');
}
const bot = new node_telegram_bot_api_1.default(token, { polling: true });
const products = [
    { id: 1, name: 'Пельмени' },
    { id: 2, name: 'Чебуреки' },
    { id: 3, name: 'Котлеты' },
    { id: 4, name: 'Манты' }
];
function createKeyboard() {
    const productsButton = products.map(product => [{ text: product.name }]);
    return {
        reply_markup: {
            keyboard: productsButton,
            resize_keyboard: true
        }
    };
}
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Добро пожаловать в магазин Индюшенок', createKeyboard());
});
bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Привет, я помощник бот-магазин!', createKeyboard());
});
bot.onText(/\/products/, (msg) => {
    const chatId = msg.chat.id;
    const productlist = products.map(product => `${product.name}`).join('\n');
    bot.sendMessage(chatId, `Наши продукты: \n${productlist}`, createKeyboard());
});
bot.onText(/\/order/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Выберите продукт:', createKeyboard());
});
