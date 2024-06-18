module.exports = (bot) => {
    bot.onText(/^\/اسم (.+)/, async (msg, match) => {
        const name = match[1];

        try {
            const fetch = await import('node-fetch');
            const response1 = await fetch.default(`https://meaningnames.net/of-${name}`);
            const response2 = await fetch.default(`https://meaningnames.net/recipes-${name}`);
            const html1 = await response1.text();
            const html2 = await response2.text();

            const regexTitle = /<meta property="twitter:title" content="(.*?)"/;
            const regexDescription = /<meta property="twitter:description" content="(.*?)"/;
            const regexImage = /<meta property="twitter:image" content="(.*?)"/;
            const regexDescription2 = /<meta property="og:description" content="(.*?)"/;
            const regexTitle2 = /<meta property="twitter:title" content="(.*?)"/;

            const title = html2.match(regexTitle)[1].replace(/\\&quot;/g, '');
            const description = html2.match(regexDescription)[1].replace(/\\&quot;/g, '');
            const image = html2.match(regexImage)[1];
            const mayne = html1.match(regexDescription2)[1].replace(/\\&quot;/g, '');
            const man_tx = html1.match(regexTitle2)[1].replace(/\\&quot;/g, '');

            const resultText = `
                *الاسم*: ${name}
                *العنوان*: ${title}
                *الوصف*: ${description}
                *معنى الاسم*: ${mayne}
                *نص العنوان*: ${man_tx}
            `;

            // إرسال النصوص مع تنسيق Markdown
            bot.sendMessage(msg.chat.id, resultText, { parse_mode: 'Markdown' });

            // إرسال الصورتين في رسالة واحدة
            const mediaGroup = [
                {
                    type: 'photo',
                    media: image
                },
                {
                    type: 'photo',
                    media: `https://meaningnames.net/write/download-mean-${name}-.png`
                }
            ];

            bot.sendMediaGroup(msg.chat.id, mediaGroup);
            
        } catch (error) {
            console.error('Error:', error);
            const errorMessage = {
                ok: false,
                channel: '@OoOoO2oO',
                message: 'الاسم غير صالح!...'
            };
            bot.sendMessage(msg.chat.id, JSON.stringify(errorMessage, null, 2));
        }
    });
};