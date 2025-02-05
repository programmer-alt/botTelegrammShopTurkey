import TelegramBot from 'node-telegram-bot-api';
import { config } from '../config/config';
import { createMainKeyboard } from '../keyboards/keyboard';

export const musicHandler = async (bot: TelegramBot, chatId: number) => {
    try {
        // Сначала отправляем сообщение
        await bot.sendMessage(chatId, 'Наша фоновая музыка 🎵', {
            reply_markup: createMainKeyboard()
        });

        // Отправляем аудио используя file_unique_id
        const audioFileId = 'AgADYW0AAiOMAUk'; // ID вашего аудиофайла

        await bot.sendAudio(chatId, audioFileId, {
            caption: '🎵 Alis Shuka - Not About Us',
            title: 'Not About Us',
            performer: 'Alis Shuka'
        });

    } catch (error) {
        console.error('Ошибка при отправке музыки:', error);
        await bot.sendMessage(chatId, 'Извините, произошла ошибка при воспроизведении музыки');
    }
};   