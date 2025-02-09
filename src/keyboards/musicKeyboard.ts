import { KeyboardButton } from "node-telegram-bot-api"
import {config} from "../config/config";

export const musicKeyboard = (tracks : { title: string}[]): KeyboardButton[][] => {
const keyboard = tracks.map((track, index) =>[{text: `${index + 1}.${track.title}`}]);
     keyboard.push([{text: config.buttons.mainMenu}]);
     return keyboard;  
};
