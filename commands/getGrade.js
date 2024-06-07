const axios = require('axios');
const cheerio = require('cheerio');

module.exports = (bot) => {
  bot.onText(/\/getGrade e=(.+)&d=(\d+(\.\d+)?)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const examType = match[1];
    const grade = match[2];

    const formData = new URLSearchParams();
    formData.append('Fr3', examType);
    formData.append('n', grade);

    try {
      const response = await axios.post('https://dept.lonar.net/', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      const $ = cheerio.load(response.data);

      const results = [];
      $('h4.home1-text05').each((index, element) => {
        const acceptanceRate = $(element).text().trim();
        const universityInfo = $(element).next('h4.home1-text06').text().trim();
        results.push({ acceptanceRate, universityInfo });
      });

      if (results.length === 0) {
        bot.sendMessage(chatId, "لم يتم العثور على نتائج.");
        return;
      }

      let infoMessages = results.map(result => `النسبة: ${result.acceptanceRate}\nالجامعة: ${result.universityInfo}`);
      const maxMessageLength = 4096; // الحد الأقصى لطول الرسالة في Telegram
      let combinedInfo = "";

      for (const message of infoMessages) {
        if (combinedInfo.length + message.length > maxMessageLength) {
          await bot.sendMessage(chatId, combinedInfo);
          combinedInfo = message;
        } else {
          combinedInfo += `${message}\n\n`;
        }
      }

      // إرسال الجزء الأخير من الرسالة
      if (combinedInfo.length > 0) {
        await bot.sendMessage(chatId, combinedInfo);
      }

    } catch (error) {
      console.error(error);
      bot.sendMessage(chatId, "حدث خطأ أثناء جلب المعلومات. يرجى المحاولة لاحقاً.");
    }
  });
};