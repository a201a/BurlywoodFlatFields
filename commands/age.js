// calculateAge.js
module.exports = (bot) => {
    bot.onText(/^\/عمر(?:\s+(\d{4})\/(\d{1,2})\/(\d{1,2}))?/, async (msg, match) => {
        if (!match[1] || !match[2] || !match[3]) {
            const userName = msg.from.first_name || "عزيزي المستخدم";
            const usageMessage = `
مرحبًا بك يا ${userName}!
لحساب عمرك، يرجى استخدام الأمر بالشكل التالي:
\`/عمر YYYY/MM/DD\`
مثال: \`/عمر 1990/3/15\`
            `;
            bot.sendMessage(msg.chat.id, usageMessage, { parse_mode: 'Markdown' });
            return;
        }

        const year = parseInt(match[1], 10);
        const month = parseInt(match[2], 10);
        const day = parseInt(match[3], 10);

        const birthDate = new Date(year, month - 1, day); // Month is zero-based
        const currentDate = new Date();
        const diff = currentDate - birthDate;

        const millisecondsInSecond = 1000;
        const secondsInMinute = 60;
        const minutesInHour = 60;
        const hoursInDay = 24;
        const daysInMonth = 30; // Assuming every month has 30 days
        const monthsInYear = 12;

        const years = Math.floor(diff / (millisecondsInSecond * secondsInMinute * minutesInHour * hoursInDay * daysInMonth * monthsInYear));
        const remainingMonths = Math.floor((diff % (millisecondsInSecond * secondsInMinute * minutesInHour * hoursInDay * daysInMonth * monthsInYear)) / (millisecondsInSecond * secondsInMinute * minutesInHour * hoursInDay * daysInMonth));
        const remainingWeeks = Math.floor((diff % (millisecondsInSecond * secondsInMinute * minutesInHour * hoursInDay * daysInMonth)) / (millisecondsInSecond * secondsInMinute * minutesInHour * hoursInDay * 7));
        const remainingDays = Math.floor((diff % (millisecondsInSecond * secondsInMinute * minutesInHour * hoursInDay)) / (millisecondsInSecond * secondsInMinute * minutesInHour * hoursInDay));
        const remainingHours = Math.floor((diff % (millisecondsInSecond * secondsInMinute * minutesInHour * hoursInDay)) / (millisecondsInSecond * secondsInMinute * minutesInHour));
        const remainingMinutes = Math.floor((diff % (millisecondsInSecond * secondsInMinute * minutesInHour)) / (millisecondsInSecond * secondsInMinute));
        const remainingSeconds = Math.floor((diff % (millisecondsInSecond * secondsInMinute)) / millisecondsInSecond);

        const response = `
🕰️ عمرك بالتفصيل:
${years} سنة، و${remainingMonths} شهر، و${remainingWeeks} أسبوع، و${remainingDays} يوم، و${remainingHours} ساعة، و${remainingMinutes} دقيقة، و${remainingSeconds} ثانية.
        `;

        try {
            const photos = await bot.getUserProfilePhotos(msg.from.id);
            if (photos.total_count > 0) {
                const fileId = photos.photos[0][0].file_id;
                await bot.sendPhoto(msg.chat.id, fileId, { caption: response });
            } else {
                await bot.sendMessage(msg.chat.id, "لم يتم العثور على صورة للملف الشخصي. \n" + response);
            }
        } catch (error) {
            console.error(error);
            await bot.sendMessage(msg.chat.id, "حدث خطأ أثناء محاولة الحصول على صورة الملف الشخصي.\n" + response);
        }
    });
};