import TelegramBot from "node-telegram-bot-api";
import { config } from "./config/config";
import { startHandler } from "./handlers/startHandler";
import { handleProducts } from "./handlers/productHandler";
import { helpHandler } from "./handlers/helpHandlers";
import { aboutHandler } from "./handlers/aboutHandler";
import { contactHandler } from "./handlers/contactHandler";
import { welcomeHandler } from "./handlers/mainMenuHandler";
import { registerMusicHandlers, sendTrackList } from "./handlers/musicHandler";


const bot = new TelegramBot(config.token, config.bot);

// Регистрация обработчиков
registerMusicHandlers(bot);

// Обработчик команды /start
bot.onText(/\/start/, async (msg: TelegramBot.Message) => {
  try {
    await startHandler(bot, msg.chat.id);
  } catch (error) {
    console.error("Ошибка в обработчике /start:", error);
  }
});

// Обработчик сообщений (кнопки)
bot.on("message", async (msg: TelegramBot.Message) => {
  try {
    const chatId = msg.chat.id;
    const text = msg.text;

    // Обработка кнопок
    switch (text) {
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
        await sendTrackList(bot,chatId);
        break;
    }
  } catch (error) {
    console.error("Ошибка в обработчике сообщений:", error);
  }
});


console.log("Бот запущен и готов к работе!");