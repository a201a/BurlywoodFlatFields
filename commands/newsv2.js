const axios = require('axios');
const cheerio = require('cheerio');
const cron = require('node-cron');

const CHANNEL_ID = '-1002157846698'; // معرف القناة الخاصة بك

// تعيين أسماء المحافظات بالإنجليزية
const provinces = {
    "country": "أخبار البلد",
    "anbar": "الأنبار",
    "erbil": "أربيل",
    "babylon": "بابل",
    "basrah": "البصرة",
    "baghdad": "بغداد",
    "duhok": "دهوك",
    "diyala": "ديالى",
    "diwaniyah": "الديوانية",
    "dhi-qar": "ذي قار",
    "sulaymaniyah": "السليمانية",
    "saladin": "صلاح الدين",
    "karbala": "كربلاء",
    "kirkuk": "كركوك",
    "muthanna": "المثنى",
    "maysan": "ميسان",
    "najaf": "النجف",
    "nineveh": "نينوى",
    "wasit": "واسط"
};

module.exports = (bot) => {
  // جدولة المهمة للنشر الآلي كل ساعتين
  cron.schedule('0 */2 * * *', async () => {
    try {
      // اختيار محافظتين عشوائيتين
      const randomProvince1 = getRandomProvince();
      const randomProvince2 = getRandomProvince();

      // جلب خبر واحد لكل محافظة
      await sendRandomNews(randomProvince1);
      await sendRandomNews(randomProvince2);

    } catch (error) {
      console.error(error);
    }
  });

  async function sendRandomNews(province) {
    try {
      const pageUrl = `https://964media.com/province/${province}/`;

      const response = await axios.get(pageUrl);
      const $ = cheerio.load(response.data);

      const newsItems = $('.post-template-card.variant-default');

      if (newsItems.length === 0) {
        console.log("No news found for", province);
        return;
      }

      // اختيار خبر عشوائي
      const randomIndex = Math.floor(Math.random() * newsItems.length);
      const randomNews = $(newsItems[randomIndex]);

      const imageUrl = randomNews.find('img').attr('src');
      const title = randomNews.find('.post-template-card__title').text().trim();
      const date = randomNews.find('.date').text().trim();
      const articleUrl = randomNews.find('a').attr('href');

      let caption = '';
      if (title) caption += `العنوان: ${title}\n`;
      if (date) caption += `تاريخ النشر: ${date}\n`;
      if (articleUrl) caption += `رابط المقالة: ${articleUrl}\n`;

      // إرسال الصورة بالتعليق المناسب إلى القناة المحددة
      await bot.sendPhoto(CHANNEL_ID, imageUrl, { caption });

    } catch (error) {
      console.error("Error fetching news for", province, error);
    }
  }

  function getRandomProvince() {
    const provincesArray = Object.keys(provinces);
    const randomIndex = Math.floor(Math.random() * provincesArray.length);
    return provincesArray[randomIndex];
  }
};