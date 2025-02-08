import TelegramBot from "node-telegram-bot-api";
import { config } from "../config/config";
import { createMainKeyboard } from "../keyboards/keyboard";
import { musicKeyboard } from "../keyboards/musicKeyboard";

const tracks = [
  {
    title: "Bobina - The Unforgiven (Airplay Mix)",
    fileId: "src/assets/music/Bobina - The Unforgiven (Airplay Mix).mp3",
  },
  {
    title: "Killteq & D.Hash - On Repeat",
    fileId: "src/assets/music/Killteq & D.Hash - On Repeat.mp3",
  },
  {
    title: "Danaps, Hory - Bailando",
    fileId: "src/assets/music/Danaps, Hory - Bailando.mp3",
  },
  {
    title: "ONEIL, KANVISE, FAVIA - Around My Heart",
    fileId: "src/assets/music/ONEIL, KANVISE, FAVIA - Around My Heart.mp3",
  },
];

export const handleMusic = (bot: TelegramBot, chatId: number) => {
  bot.onText(/\/music/, (msg: TelegramBot.Message) => {
    const chatId = msg.chat.id;
    const trackList = tracks
      .map((track, index) => `${index + 1}. ${track.title}`)
      .join("\n");
    bot.sendMessage(chatId, config.messages.music + "\n" + trackList, {
      reply_markup: {
        keyboard: musicKeyboard(tracks),
        one_time_keyboard: true,
        resize_keyboard: true,
      },
    });
  });

  bot.on("message", async  (msg: TelegramBot.Message) => {
    const match = msg.text?.match(/^(\d+)\./);
    const selectedTrackIndex = match ? parseInt(match[1]) - 1 : -1;
    if (selectedTrackIndex >= 0 && selectedTrackIndex < tracks.length) {
      const selectedTrack = tracks[selectedTrackIndex];
      if (selectedTrack.fileId) {
        bot.sendMessage(chatId, "⬆️  Загрузка музыки, пожалуйста, подождите...➡️");
        bot.sendAudio(chatId, selectedTrack.fileId, {
          caption: selectedTrack.title,
          title: selectedTrack.title,
          performer: "🕺 Танцевальная музыка",
        }).then( () => {
            bot.sendMessage(
                chatId,
                `🎵Теперь слушайте трек!👍`
              );
        }) 
      } else {
        bot.sendMessage(chatId, "Ошибка: файл не найден.");
      }
    }
  });
};
