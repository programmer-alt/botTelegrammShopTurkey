import TelegramBot from "node-telegram-bot-api";
import { config } from "../config/config";
import { musicKeyboard } from "../keyboards/musicKeyboard";
import * as fs from 'fs/promises';
import path from "path";

async function getTrackFromDirectory () {
   // Получаем путь к директории с музыкой
   const musicDir = path.join(__dirname, '../assets/music');
   try {
    //читаем содержимое директории
    const files = await fs.readdir(musicDir)
    // фильтруем только mp3-файлы
    return  files
    .filter(file => file.endsWith('.mp3'))
    .map(file => ({
      title: path.parse(file).name ,// имя файла без расширения
      fileId: path.join(musicDir, file) // полный путь к файлу
    }))
   } catch (error){
    console.log(' Ошибка при чтении директории с музыкой', error)
    return []
   }
}
let tracks: { title: string; fileId: string}[] = [
// Определяем массив с информацией о треках
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
]

// Функция для определения исполнителя
const performerTrackSelection = (trackTitle: string) => {
  return trackTitle === "Bobina - The Unforgiven (Airplay Mix)" ? "🕺 Танцевальная музыка" :
    trackTitle === "Killteq & D.Hash - On Repeat" ? "🎧 Клубная музыка" :
    trackTitle === "Danaps, Hory - Bailando" ? "🎧 Ретро ремикс" :
    trackTitle === "ONEIL, KANVISE, FAVIA - Around My Heart" ? "🎧 80s ремикс" :
    "Unknown";
};

// Функция для отправки списка треков
export const sendTrackList = async (bot: TelegramBot, chatId: number) => {
  try {
    const tracks = await getTrackFromDirectory(); 

    const trackList = tracks
      .map((track, index) => `${index + 1}. ${track.title}`)
      .join('\n');

    bot.sendMessage(chatId, config.messages.music + "\n" + trackList, {
      reply_markup: {
        keyboard: musicKeyboard(tracks),
        one_time_keyboard: true,
        resize_keyboard: true,
      },
    });
  } catch (error) {
    console.error('Ошибка при отправке сообщения:', error);
  }
};

// Функция для обработки выбора трека
export const handleTrackSelection = (bot: TelegramBot, msg: TelegramBot.Message) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  const match = text?.match(/^(\d+)\./);
  const selectedTrackIndex = match ? parseInt(match[1]) - 1 : -1;

  if (selectedTrackIndex >= 0 && selectedTrackIndex < tracks.length) {
    const selectedTrack = tracks[selectedTrackIndex];
    bot.sendMessage(chatId, "⬆️  Загрузка музыки, пожалуйста, подождите...➡️");

    bot.sendAudio(chatId, selectedTrack.fileId, {
      
      title: selectedTrack.title,
      performer: performerTrackSelection(selectedTrack.title) ?? '',
    }).then(() => {
      bot.sendMessage(chatId, `🎵Теперь слушайте трек!👍`);
    });
  } else {
    bot.sendMessage(chatId, "Ошибка: файл не найден.");
  }
};

// Функция для регистрации обработчиков музыки
export const registerMusicHandlers = (bot: TelegramBot) => {
  // Обработчик команды /music
  bot.onText(/\/music/, async (msg: TelegramBot.Message) => {
    try {
      await sendTrackList(bot, msg.chat.id);
    } catch (error) {
      console.error("Ошибка в обработчике /music:", error);
    }
  });

  // Обработчик выбора трека
  bot.on("message", async (msg: TelegramBot.Message) => {
    try {
      const text = msg.text;
      if (text && /^\d+\./.test(text)) {
        await handleTrackSelection(bot, msg);
      }
    } catch (error) {
      console.error("Ошибка в обработчике выбора трека:", error);
    }
  });
};