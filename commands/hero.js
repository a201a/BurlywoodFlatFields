// heroCommand.js
const axios = require('axios');

module.exports = (bot) => {
    bot.onText(/\/hero (.+)/, async (msg, match) => {
        const chatId = msg.chat.id;
        const heroName = match[1];
        const accessToken = 'fcff805f97eb20def01a2cdca265d6ac';
        const url = `https://superheroapi.com/api/${accessToken}/search/${encodeURIComponent(heroName)}`;

        try {
            const response = await axios.get(url);
            const data = response.data;

            if (data.response === 'success') {
                const hero = data.results[0]; // Assuming we take the first result
                const name = hero.name;
                const fullName = hero.biography['full-name'];
                const publisher = hero.biography.publisher;
                const alignment = hero.biography.alignment;
                const gender = hero.appearance.gender;
                const race = hero.appearance.race;
                const height = hero.appearance.height[1]; // using the second value (metric)
                const weight = hero.appearance.weight[1]; // using the second value (metric)
                const intelligence = hero.powerstats.intelligence;
                const strength = hero.powerstats.strength;
                const speed = hero.powerstats.speed;
                const durability = hero.powerstats.durability;
                const power = hero.powerstats.power;
                const combat = hero.powerstats.combat;
                const imageUrl = hero.image.url; // Image URL

                const heroInfoMessage = `*معلومات عن البطل الخارق:*\n\n*الاسم:* ${name}\n*الاسم الكامل:* ${fullName}\n*الناشر:* ${publisher}\n*التحالف:* ${alignment}\n*الجنس:* ${gender}\n*العرق:* ${race}\n*الطول:* ${height}\n*الوزن:* ${weight}\n\n*إحصائيات القوة:*\n*الذكاء:* ${intelligence}\n*القوة:* ${strength}\n*السرعة:* ${speed}\n*التحمل:* ${durability}\n*القوة:* ${power}\n*القتال:* ${combat}`;

                // Send the image with detailed information in the caption
                bot.sendPhoto(chatId, imageUrl, { caption: heroInfoMessage, parse_mode: 'Markdown' });
            } else {
                bot.sendMessage(chatId, `لم أتمكن من العثور على معلومات للبطل الخارق: ${heroName}`);
            }
        } catch (error) {
            console.error(error);
            bot.sendMessage(chatId, `حدث خطأ أثناء البحث عن معلومات للبطل الخارق: ${heroName}`);
        }
    });
};
