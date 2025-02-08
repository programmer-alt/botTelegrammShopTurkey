import { KeyboardButton } from "node-telegram-bot-api"

export const musicKeyboard = (tracks : { title: string}[]): KeyboardButton[][] => {
    return tracks.map((track, index) =>[{text: `${index + 1}.${track.title}`}]);
};