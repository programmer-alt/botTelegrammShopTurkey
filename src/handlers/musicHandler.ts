import TelegramBot from "node-telegram-bot-api";
import { config } from "../config/config";
import { createMainKeyboard } from "../keyboards/keyboard";

const tracks = [
    { title: "Gromee feat. Mahan Moin - Spirit", fileId: "src/assets/music/Gromee feat. Mahan Moin - Spirit.mp3" },
    { title: "Maxx Play feat. Grove Park - Cocoon Beach", fileId: "src/assets/music/Maxx Play feat. Grove Park - Cocoon Beach.mp3" }
];

export const handleMusic = (bot: TelegramBot, chatId:number) => {
    bot.onText(/\/music/, (msg: TelegramBot.Message) => {
        const chatId = msg.chat.id;
        const trackList = tracks.map((track, index) => `${index + 1}. ${track.title}`).join("\n");
        bot.sendMessage(chatId, `Выберите трек:\n${trackList}`, {
            reply_markup: {
                keyboard: tracks.map((track, index) => [{ text: `${index + 1}. ${track.title}` }]),
                one_time_keyboard: true,
                resize_keyboard: true
            }
        });
    });

    bot.on('message', (msg) => {
        const chatId = msg.chat.id;
        const match = msg.text?.match(/^(\d+)\./);
        const selectedTrackIndex = match ? parseInt(match[1]) - 1 : -1;

        if (selectedTrackIndex >= 0 && selectedTrackIndex < tracks.length) {
            const selectedTrack = tracks[selectedTrackIndex];
            if (selectedTrack.fileId) {
                bot.sendMessage(chatId, `Теперь воспроизводится: ${selectedTrack.title}`);
                // Добавляем параметры для отправки аудио
                bot.sendAudio(chatId, selectedTrack.fileId, {
                    caption: selectedTrack.title,
                    title: selectedTrack.title,
                    performer: 'Unknown'
                });
            } else {
                bot.sendMessage(chatId, "Ошибка: файл не найден.");
            }
        }
    });
};
