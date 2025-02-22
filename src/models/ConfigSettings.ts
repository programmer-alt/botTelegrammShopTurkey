import TelegramBot from "node-telegram-bot-api";

export interface Config {
    token: string;
    bot: {
        polling: boolean;
    };
    messages: {
        products: string;
        welcome: string;
        help: string;
        about: string;
        contacts: string;
        music: string;
    };
    buttons: {
        products: string;
        about: string;
        contacts: string;
        help: string;
        mainMenu: string;
        music: string;
    };
    systemMessage: {
        loadingMusicMessage: string
    }
}