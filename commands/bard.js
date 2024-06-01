const axios = require('axios');

module.exports = (bot) => {
    bot.onText(/\/bard (.+)/, (msg, match) => {
        const chatId = msg.chat.id;
        const query = match[1]; // النص المدخل بعد الأمر /bard

        const data = {
            ask: query
        };

        axios.post('https://bard.rizzy.eu.org/backend/conversation/gemini', data, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            const content = response.data.content; // Extracting the 'content' field
            bot.sendMessage(chatId, content ? content : "Hello there! How can I assist?");
        })
        .catch(error => {
            console.error('Error:', error);
            bot.sendMessage(chatId, 'حدث خطأ أثناء معالجة طلبك.');
        });
    });
};