// Импортируем необходимые модули
import TelegramBot from "node-telegram-bot-api";
import { config } from "../config/config";
import { createMainKeyboard } from "../keyboards/keyboard";
import { musicKeyboard } from "../keyboards/musicKeyboard";

// Определяем массив с информацией о треках
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

const handletrackSelection = (trackTitle: string) => {
  const performer = trackTitle === "Bobina - The Unforgiven (Airplay Mix)" ? "🕺 Танцевальная музыка" :
    trackTitle === "Killteq & D.Hash - On Repeat" ? "🎧 Клубная музыка" :
    trackTitle === "Danaps, Hory - Bailando" ? "🎧 Ретро ремикс" :
    trackTitle === "ONEIL, KANVISE, FAVIA - Around My Heart" ? "🎧 80s ремикс" :
    "Unknown"
  return performer
}// Экспортируем функцию для обработки музыки
let isMusicHandlerActive = false;

export const handleMusic = (bot: TelegramBot, chatId: number) => {
    if (isMusicHandlerActive) return; // Prevent multiple registrations
    isMusicHandlerActive = true;

  
  // Создаем список треков в формате "номер. название"
  const trackList = tracks
    .map((track, index) => `${index + 1}. ${track.title}`)
    .join("\n");
  
  // Отправляем сообщение с списком треков и клавиатурой
  bot.sendMessage(chatId, config.messages.music + "\n" + trackList, {
    reply_markup: {
      keyboard: musicKeyboard(tracks),
      one_time_keyboard: true,
      resize_keyboard: true,
    },
  });

    // Обрабатываем входящие сообщения
    const handleTrackSelection = async (msg: TelegramBot.Message) => {
    bot.on("message", handleTrackSelection);

    // Пытаемся найти номер выбранного трека
    const match = msg.text?.match(/^(\d+)\./);
    const selectedTrackIndex = match ? parseInt(match[1]) - 1 : -1;
    
    // Если выбран корректный трек
    if (selectedTrackIndex >= 0 && selectedTrackIndex < tracks.length) {
        const selectedTrack = tracks[selectedTrackIndex];
        // Отправляем сообщение об ожидании загрузки
        bot.sendMessage(chatId, "⬆️  Загрузка музыки, пожалуйста, подождите...➡️");
        
        // Отправляем аудио-файл
        bot.sendAudio(chatId, selectedTrack.fileId, {
            caption: selectedTrack.title,
            title: selectedTrack.title,
            performer: handletrackSelection(selectedTrack.title) ?? '',
        }).then(() => {
            // Отправляем подтверждение о начале воспроизведения
            bot.sendMessage(chatId, `🎵Теперь слушайте трек!👍`);
        });
    } else {
        // Если fileId отсутствует, отправляем ошибку
        bot.sendMessage(chatId, "Ошибка: файл не найден.");
    }
};
