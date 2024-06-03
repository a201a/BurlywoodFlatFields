const axios = require('axios');

module.exports = (bot) => {
    bot.onText(/ليمون/, async (msg) => {
        const chatId = msg.chat.id;
        const command = msg.text.split(' ')[0];
        const question = msg.text.substring(command.length + 1);
        const uid = msg.from.id; // Extracting the user ID

        if (!question) {
            bot.sendMessage(chatId, '*اكتب سؤال إذا ممكن*', { parse_mode: 'Markdown' });
            return;
        }

        const url = `https://for-devs.onrender.com/api/pi?query=${encodeURIComponent(question)}&uid=${uid}&apikey=api1`;

        try {
            const response = await axios.get(url);
            const content = response.data.result; // Adjusted to match the new API response

            bot.sendMessage(chatId, `${content}`, { parse_mode: 'Markdown' });
        } catch (error) {
            console.error(error);
            bot.sendMessage(chatId, `*حدث خطأ أثناء البحث عن ${question}*`, { parse_mode: 'Markdown' });
        }
    });
};