import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';

dotenv.config();

interface Product {
    id: number;
    name: string;
    image: string;
}

interface Keyboard {
    reply_markup: {
        keyboard: TelegramBot.KeyboardButton[][];
        resize_keyboard: boolean;
    }
}

const token = process.env.TELEGRAM_BOT_TOKEN;
console.log('Запущен бот телеграмм '); // Для отладки
if (!token) {
    throw new Error('Телеграм бот не найден');
}

const bot = new TelegramBot(token, { polling: true });

const products = [
    {id: 1, name: 'Пельмени'},
    {id: 2, name: 'Чебуреки'},
    {id: 3, name: 'Котлеты'},
    {id: 4, name: 'Манты'}
]

function createKeyboard(): Keyboard {
    const productsButton = products.map(product => [{ text: product.name }]);
    return {
        reply_markup: {
            keyboard: productsButton,
            resize_keyboard: true
        }
    };
}

bot.onText(/\/start/, (msg: TelegramBot.Message) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Добро пожаловать в магазин Индюшенок', createKeyboard());
});

bot.onText(/\/help/, (msg: TelegramBot.Message) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Привет, я помощник бот-магазин!', createKeyboard());
});

bot.onText(/\/products/, (msg: TelegramBot.Message) => {
    const chatId = msg.chat.id;
    const productlist = products.map(product => `${product.name}`).join('\n');
    bot.sendMessage(chatId, `Наши продукты: \n${productlist}`, createKeyboard());
});




