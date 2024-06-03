const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');

const botToken = '6616314140:AAGs9-b_d0MMEkSW4omOr1SES3QXs16CqtU';
const bot = new TelegramBot(botToken, { polling: true });

// تحميل الأوامر من ملفات مجلد الأوامر
const commandsFolder = './commands/';

fs.readdirSync(commandsFolder).forEach(file => {
    const command = require(`./commands/${file}`);
    command(bot);
});
