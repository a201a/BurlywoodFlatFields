const { bing } = require("gpti");

module.exports = (bot) => {
  bot.onText(/\/bing (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const userQuery = match[1].trim(); // استخراج السؤال من الأمر

    bing({
      messages: [
        {
          role: "user",
          content: userQuery // استخدم السؤال المُستخرج هنا
        }
      ],
      conversation_style: "Balanced",
      markdown: false,
      stream: false,
    }, (err, data) => {
      if(err != null){
        bot.sendMessage(chatId, `خطأ: ${err.message}`);
        console.log(err);
      } else {
        bot.sendMessage(chatId, data.message);
        console.log(data);
      }
    });
  });
};