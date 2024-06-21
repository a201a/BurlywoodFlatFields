const axios = require('axios');
const cheerio = require('cheerio');
const moment = require('moment-timezone'); // استيراد moment-timezone

module.exports = (bot) => {
  bot.onText(/\/countdown (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const pageType = match[1];

    const pageUrl = `https://yourcountdown.to/trending/${pageType}`;

    try {
      const response = await axios.get(pageUrl);
      const $ = cheerio.load(response.data);

      const countdownItems = $('#countdowns-all .countdown-item');

      if (countdownItems.length === 0) {
        bot.sendMessage(chatId, "لم يتم العثور على معلومات في الصفحة المحددة.");
        return;
      }

      countdownItems.each(async (index, element) => {
        const imageUrl = $(element).find('img').attr('src');
        const title = $(element).find('.title').text().trim();
        const subtitle = $(element).find('.subtitle').text().trim();
        const countdownDate = $(element).find('.countdown').attr('data-date');
        

        if (title || subtitle || countdownDate || imageUrl) {
          let caption = '';
          if (title) caption += `العنوان: ${title}\n`;
          if (subtitle) caption += `العنوان الفرعي: ${subtitle}\n`;
          if (countdownDate) {
            const now = moment();
            const eventDate = moment(countdownDate);
            const duration = moment.duration(eventDate.diff(now));

            const years = duration.years();
            const months = duration.months();
            const days = duration.days();
            const hours = duration.hours();
            const minutes = duration.minutes();
            const seconds = duration.seconds();

            let countdownText = '';
            if (years > 0) countdownText += `${years} سنوات `;
            if (months > 0) countdownText += `${months} أشهر `;
            if (days > 0) countdownText += `${days} أيام `;
            if (hours > 0) countdownText += `${hours} ساعات `;
            if (minutes > 0) countdownText += `${minutes} دقائق `;
            if (seconds > 0) countdownText += `${seconds} ثواني`;

            if (countdownText) {
              caption += `الوقت المتبقي: ${countdownText}\n`;
            }
          }
        

          // إرسال الصورة بالتعليق المناسب
          await bot.sendPhoto(chatId, imageUrl, { caption });
        }
      });

    } catch (error) {
      console.error(error);
      bot.sendMessage(chatId, "حدث خطأ أثناء جلب المعلومات. يرجى المحاولة لاحقاً.");
    }
  });
};
