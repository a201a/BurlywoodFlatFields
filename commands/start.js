module.exports = (bot) => {
  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;

    // تعريف قائمة الأوامر ومعلوماتها
    const commands = [
      {
        name: "صفحة",
        description: "يقوم باعطائك صفحه من القران حسب رقم الصفحه على شكل صوره",
        usage: "/صفحة [رقم الصفحة]"
      },
      {
        name: "ويكي",
        description: "يقوم باعطائك معلومات من موقع ويكيبيديا",
        usage: "/ويكي [الكلمة]"
      },
      {
        name: "مسلسل",
       description: "يقوم باعطائك معلومات عن المسلسلات ",
        usage: "/مسلسل [الاسم مسلسل]"
      },
      {
        name: "فيلم",
        description: "يقوم باعطائك معلومات عن الافلام المختلفه من الاجنبيه الى العربيه",
        usage: "/فيلم [الاسم فيلم]"
      },
      {
        name: "emoji",
        description: "يقوم باعطائك معلومات معينه عن ايموجي معين",
        usage: "/emoji [🥺]"
      },
      {
        name: "bing",
        description: "ذكاء اصطناعي يستطيع الاجابه على جميع اسئلتك",
        usage: "/bing [السؤال]"
      },
      {
        name: "صلاة",
        description: "يقوم باعطائك معلومات عن الاوقات صلاة حسب مدينة ",
       usage: "/صلاة [اسم المدينة]"
      },
      {
        name: "مسح",
        description:"يقوم بمسح رسائل البوت",
        usage:"/مسح رد على رساله البوت",
      },
      {
        name: "groupinfo",
        description:"يقوم باعطائك معلومات المجموعه",
        usage:"/groupinfo",
      },
      {
        name: "رابط",
        description:"يقوم بتحويل الصور او المقاطع الفيديو الى روابط تحتفظ فيها",
        usage:"/رابط رد على الصوره او مقطع الفيديو",
      },
      {
        name: "اسم",
        description:"يقوم باعطائك معلومات معنى الاسم",
        usage:"/اسم [الاسم]",
      },
      {
        name: "poli",
       description: "يقوم بانشاء الصور بالذكاء الاصطناعي عن طريق النص فقط",
      usage:"/poli [النص]",
      },
       {
        name: "manga",
        description:"قراءه المانجا ومانهوا والكوميكس",
        usage:"/manga اسم مانجا ثم رقم الفصل",
      }
    ];

    // إنشاء رسالة الترحيب مع قائمة الأوامر
    let welcomeMessage = 'أهلاً بك عزيزي في قائمة الاوامر :\n━━━━━━━━━━━━\n';
    commands.forEach((command, index) => {
      welcomeMessage += `◂ م${index + 1} : ${command.name}\n   الوصف: ${command.description}\n   طريقة الاستخدام: ${command.usage}\n━━━━━━━━━━━━\n`;
    });

    // إرسال الرسالة بدون استخدام parse_mode
    bot.sendMessage(chatId, welcomeMessage)
      .catch((error) => {
        console.error('Error sending message:', error.response.body);
      });
  });
};