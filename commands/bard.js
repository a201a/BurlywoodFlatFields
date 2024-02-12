const axios = require('axios');

module.exports = (bot) => {
    bot.onText(/بوت/, async (msg) => {
        const chatId = msg.chat.id;
        const command = msg.text.split(' ')[0];
        const question = msg.text.substring(command.length + 1);

        if (!question) {
            bot.sendMessage(chatId, '*اكتب سؤال إذا ممكن*');
            return;
        }

        const url = `https://hercai.onrender.com/v3/hercai?question=${question}`;

        try {
            const response = await axios.get(url);
            const content = response.data.reply;

            bot.sendMessage(chatId, `${content}`, { parse_mode: 'Markdown' });
        } catch (error) {
            console.error(error);
            bot.sendMessage(chatId, `*حدث خطأ أثناء البحث عن ${question}*`, { parse_mode: 'Markdown' });
        }
    });
};