const { gpt } = require("gpti");

module.exports = (bot) => {
  bot.onText(/\/gpti (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const prompt = match[1].trim();

    gpt.web({
      prompt: prompt,
      markdown: false
    }, (err, data) => {
      if (err) {
        bot.sendMessage(chatId, `خطأ: ${err.message}`);
      } else {
        bot.sendMessage(chatId, data.gpt);
      }
    });
  });
};
