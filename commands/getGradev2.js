const questions = [
  "أدخل درجة المادة الأولى: ",
  "أدخل درجة المادة الثانية: ",
  "أدخل درجة المادة الثالثة: ",
  "أدخل درجة المادة الرابعة: ",
  "أدخل درجة المادة الخامسة: ",
  "أدخل درجة المادة السادسة: ",
  "أدخل درجة المادة السابعة: "
];

function calculateAverage(grades) {
  const sum = grades.reduce((acc, grade) => acc + grade, 0);
  return sum / grades.length;
}

const usersGrades = {};
const usersCurrentQuestion = {};

module.exports = (bot) => {
  bot.onText(/\/معدلي/, (msg) => {
    const chatId = msg.chat.id;
    usersGrades[chatId] = [];
    usersCurrentQuestion[chatId] = 0;
    bot.sendMessage(chatId, questions[0]);
  });

  bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text.startsWith('/معدلي')) return; // تجاهل رسالة /معدلي لأننا نعالجها في مكان آخر

    const currentQuestionIndex = usersCurrentQuestion[chatId];
    if (currentQuestionIndex !== undefined && currentQuestionIndex < questions.length) {
      const grade = parseFloat(text);
      if (!isNaN(grade)) {
        usersGrades[chatId].push(grade);
        usersCurrentQuestion[chatId]++;
        if (usersCurrentQuestion[chatId] < questions.length) {
          bot.sendMessage(chatId, questions[usersCurrentQuestion[chatId]]);
        } else {
          const average = calculateAverage(usersGrades[chatId]);
          bot.sendMessage(chatId, `معدل الطالب هو: ${average.toFixed(2)}`);
          delete usersGrades[chatId];
          delete usersCurrentQuestion[chatId];
        }
      } else {
        bot.sendMessage(chatId, "الرجاء إدخال قيمة صحيحة.");
      }
    }
  });
};