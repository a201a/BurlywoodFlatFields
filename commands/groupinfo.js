module.exports = (bot) => {
    bot.onText(/\/groupinfo/, (msg) => {
        const chatId = msg.chat.id;

        bot.getChat(chatId).then((chat) => {
            Promise.all([
                bot.getChatMemberCount(chatId),
                bot.getChatAdministrators(chatId)
            ]).then(([count, admins]) => {
                const owner = admins.find(admin => admin.status === 'creator');
                const groupInfo = `
                معلومات المجموعة:
                - اسم المجموعة: ${chat.title}
                - وصف المجموعة: 
${chat.description || 'لا يوجد'}
                - معرف المجموعة: ${chat.id}
                - نوع المجموعة: ${chat.type}
                - عدد الأعضاء: ${count}
                - عدد المشرفين: ${admins.length}
                - يمكن للأعضاء دعوة الآخرين: ${chat.can_invite_users ? 'نعم' : 'لا'}
                - معرف المالك: @${owner ? owner.user.username : 'غير معروف'}
                - الرابط الدائم للمجموعة: ${chat.invite_link ? chat.invite_link : 'غير متاح'}
                `;
                bot.sendMessage(chatId, groupInfo);
            }).catch((error) => {
                console.error('Error getting group info:', error);
            });
        }).catch((error) => {
            console.error('Error getting group info:', error);
        });
    });
};