import TelegramBot from 'node-telegram-bot-api';

export interface Keyboard {
    keyboard: TelegramBot.KeyboardButton[][];
    resize_keyboard: boolean;
}