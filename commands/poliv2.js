const axios = require('axios');

module.exports = (bot) => {
  bot.onText(/\/prompt (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const query = match[1];
    
    if (!query) {
      return bot.sendMessage(chatId, "Please enter a text or query.");
    }
    
    try {
      const translatedInput = await translateText(query, "en");
      const prompt = encodeURI(translatedInput.trim());

      const poliUrl = `https://aiimage.hellonepdevs.workers.dev/?prompt=${prompt}`;
      const response = await axios.get(poliUrl, { responseType: "arraybuffer" });
      const imageBuffer = Buffer.from(response.data);

      bot.sendPhoto(chatId, imageBuffer, { caption: `${translatedInput}` });
    } catch (error) {
      console.error(error);
      bot.sendMessage(chatId, "An error occurred while processing the request.");
    }
  });
};

async function translateText(text, targetLanguage) {
  const translationUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLanguage}&dt=t&q=${encodeURI(text)}`;
  const translationRes = await axios.get(translationUrl);
  const translatedText = translationRes.data[0].map(arr => arr[0]).join(' ');
  return translatedText.trim();
                                                  }
                                                 
