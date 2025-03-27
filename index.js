const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const fs = require('fs');

const botToken = '8041656495:AAHeDjjtNfRqEURUmngLrvkY43X5mKY2fmk';  // توكن البوت مباشرة
const webHookUrl = 'https://burlywood-flat-fields.vercel.app/';  // رابط Vercel مباشرة

const bot = new TelegramBot(botToken);
const app = express();

app.use(express.json());

// تحميل الأوامر من مجلد الأوامر
const commandsFolder = './commands/';
fs.readdirSync(commandsFolder).forEach(file => {
    const command = require(`./commands/${file}`);
    command(bot);
});

// إعداد Webhook مباشرة
bot.setWebHook(`${webHookUrl}/bot`);

// نقطة نهاية لاستقبال التحديثات من تيليجرام
app.post('/bot', (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});

// فحص صحة تشغيل السيرفر
app.get('/', (req, res) => {
    res.send('البوت يعمل بنجاح على Vercel!');
});

module.exports = app;