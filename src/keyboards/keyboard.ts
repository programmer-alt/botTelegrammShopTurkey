import { Keyboard } from '../models/KeyBoard';
import { config } from '../config/config';

export const createMainKeyboard = (): Keyboard => {
    const telegramKeyboard: Keyboard = {
        keyboard: [
            [{ text: config.buttons.products }],
            [{ text: config.buttons.help }],
            [{ text: config.buttons.about }],
            [{ text: config.buttons.contacts }],
            [{ text: config.buttons.mainMenu }],
            [{ text: config.buttons.music }],
           

        ],
        resize_keyboard: true
    };
    return telegramKeyboard;
}