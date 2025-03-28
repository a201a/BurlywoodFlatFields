const axios = require('axios');

module.exports = (bot) => {
    bot.onText(/\/شرح (.+)/, async (msg, match) => {
        const chatId = msg.chat.id;
        const hadithId = match[1];

        try {
            const response = await axios.get(`https://dorar-hadith-api-one.vercel.app/v1/site/sharh/text/${hadithId}`);
            const hadithInfo = response.data.data;
            const formattedHadithSharh = `
                *الحديث:* ${hadithInfo.hadith}
                *الراوي:* ${hadithInfo.rawi}
                *المحدث:* ${hadithInfo.mohdith}
                *الكتاب:* ${hadithInfo.book}
                *الصفحة/الرقم:* ${hadithInfo.numberOrPage}
                *التصنيف:* ${hadithInfo.grade}
                *شرح الحديث:* ${hadithInfo.sharhMetadata.sharh}
            `;
            bot.sendMessage(chatId, formattedHadithSharh, { parse_mode: 'Markdown' });
        } catch (error) {
            console.error('Error:', error.message);
            bot.sendMessage(chatId, 'حدث خطأ أثناء جلب شرح الحديث.\n' + error);
        }
    });
};