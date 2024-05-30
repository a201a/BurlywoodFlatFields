const axios = require('axios');

module.exports = (bot) => {
    bot.onText(/\/manga (.+) (\d+)/, async (msg, match) => {
        const chatId = msg.chat.id;
        const mangaName = match[1];
        const chapterNumber = match[2];
        
        try {
            const url = `https://alifadel2-1.onrender.com/manga?name=${mangaName}&chapter=${chapterNumber}`;
            const response = await axios.get(url);
            
            // Assuming the response contains an array of image URLs
            const images = response.data.images;
            
            // Send each image separately
            images.forEach(async (imageUrl) => {
                await bot.sendPhoto(chatId, imageUrl);
            });
        } catch (error) {
            console.error('Error fetching manga images:', error);
            bot.sendMessage(chatId, 'Failed to fetch manga images. Please try again later.');
        }
    });
};
