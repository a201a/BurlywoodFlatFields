const axios = require('axios');

module.exports = (bot) => {
    bot.onText(/\/رابط/, async (msg) => {
        const chatId = msg.chat.id;

        if (!msg.reply_to_message || 
            (!msg.reply_to_message.photo && 
             !msg.reply_to_message.video && 
             !msg.reply_to_message.document)) {
            bot.sendMessage(chatId, "يرجى الرد على صورة أو فيديو أو وثيقة مدعومة بالأمر /رابط.");
            return;
        }

        let fileId;
        let mimeType;

        if (msg.reply_to_message.photo) {
            fileId = msg.reply_to_message.photo[msg.reply_to_message.photo.length - 1].file_id;
        } else if (msg.reply_to_message.video) {
            fileId = msg.reply_to_message.video.file_id;
        } else if (msg.reply_to_message.document) {
            mimeType = msg.reply_to_message.document.mime_type;
            const supportedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/webm', 'image/tiff', 'image/bmp', 'application/pdf', 'image/x-xcf'];

            if (supportedMimeTypes.includes(mimeType)) {
                fileId = msg.reply_to_message.document.file_id;
            } else {
                bot.sendMessage(chatId, "نوع الوثيقة غير مدعوم. يرجى الرد على صورة أو فيديو.");
                return;
            }
        } else {
            bot.sendMessage(chatId, "يرجى الرد على صورة أو فيديو أو وثيقة مدعومة بالأمر /رابط.");
            return;
        }

        const fileLink = await bot.getFileLink(fileId);

        try {
            const imgurResponse = await axios.post('https://api.imgur.com/3/image', {
                image: fileLink
            }, {
                headers: {
                    'Authorization': 'Client-ID fc9369e9aea767c' // استبدل YOUR_CLIENT_ID بمعرف العميل الخاص بك من Imgur
                }
            });

            const imgurUrl = imgurResponse.data.data.link;
            bot.sendMessage(chatId, `رابط الوسائط: ${imgurUrl}`);
        } catch (error) {
            console.error("خطأ:", error);
            bot.sendMessage(chatId, "حدث خطأ أثناء معالجة الوسائط.");
        }
    });
};