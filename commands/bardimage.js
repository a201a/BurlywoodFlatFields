const axios = require('axios');

module.exports = (bot) => {
    bot.onText(/\/bardimage/, async (msg) => {
        const chatId = msg.chat.id;
        const defaultQuestion = "ما الذي في هذه الصورة؟";

        let question = msg.text.split(" ").slice(1).join(" ");
        question = question.trim() === "" ? defaultQuestion : question;

        if (!msg.reply_to_message || !msg.reply_to_message.photo) {
            bot.sendMessage(chatId, "يرجى الرد على صورة بأمر /bardimage.");
            return;
        }

        const replyToMessageId = msg.reply_to_message.message_id;
        const photoId = msg.reply_to_message.photo[msg.reply_to_message.photo.length - 1].file_id;
        const imageUrl = await bot.getFileLink(photoId);

        try {
            const imgurResponse = await axios.post('https://api.imgur.com/3/image', {
                image: imageUrl
            }, {
                headers: {
                    'Authorization': 'Client-ID fc9369e9aea767c' // استبدل YOUR_CLIENT_ID بمعرف العميل الفعلي الخاص بك في Imgur
                }
            });

            const imgurUrl = imgurResponse.data.data.link;

            const bardResponse = await axios.post('https://bard.rizzy.eu.org/backend/conversation/gemini/image', {
                ask: question,
                image: imgurUrl
            });

            const content = bardResponse.data.content;
            if (content) {
                const message = `${content}\n\nرابط الصورة: ${imgurUrl}`;
                bot.sendMessage(chatId, message, { reply_to_message_id: replyToMessageId });
            } else {
                bot.sendMessage(chatId, "لم أتمكن من تحديد ما في الصورة.", { reply_to_message_id: replyToMessageId });
            }
        } catch (error) {
            console.error("خطأ:", error);
            bot.sendMessage(chatId, "حدث خطأ أثناء معالجة الصورة.");
        }
    });
};