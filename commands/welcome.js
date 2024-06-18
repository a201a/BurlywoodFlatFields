// startCommand.js
module.exports = (bot) => {
    bot.onText(/\/welcome/, (msg) => {
        const chatId = msg.chat.id;
        bot.sendMessage(chatId, 'مرحبا بك! أنا بوت الترحيب.');
    });
};
