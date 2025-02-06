import TelegramBot from 'node-telegram-bot-api';
import { config } from './config/config';
import { startHandler } from './handlers/startHandler';
import { handleProducts } from './handlers/productHandler';
import { helpHandler } from './handlers/helpHandlers';
import { aboutHandler } from './handlers/aboutHandler';
import { contactHandler } from './handlers/contactHandler';
import { welcomeHandler } from './handlers/mainMenuHandler';
import { musicHandler } from './handlers/musicHandler';

const bot = new TelegramBot(config.token, config.bot);

bot.onText(/\/start/, async (msg: TelegramBot.Message) => {
    try {
        await startHandler(bot, msg.chat.id);
    } catch (error) {
        console.error('Ошибка в обработчике /start:', error);
    }
});

bot.on('message', async (msg: TelegramBot.Message) => {
    try {
        const chatId = msg.chat.id;
        const text = msg.text;

        switch(text) {
            case config.buttons.products:
                await handleProducts(bot, chatId);
                break;
            case config.buttons.help:
                await helpHandler(bot, chatId);
                break;
            case config.buttons.about:
                await aboutHandler(bot, chatId);
                break;
            case config.buttons.contacts:
                await contactHandler(bot, chatId);
                break;
            case config.buttons.mainMenu:
                await welcomeHandler(bot, chatId);
                break;
            case config.buttons.music:
                await musicHandler(bot, chatId);
                break;
        }
    } catch (error) {
        console.error('Ошибка в обработчике сообщений:', error);
    }
});

console.log('Бот запущен и готов к работе!');