const TelegramBot = require('node-telegram-bot-api');

// 1. GANTI PAKE TOKEN ASLI DARI @BotFather
const token = '8637311609:AAGtKe6axPgIXmHspdWVlFhJyZaf7ZlS3nw';

// 2. GANTI PAKE USERNAME TELEGRAM LU TANPA @
const usernameOwner = 'http://t.me/OfficialSamdun_bot';

const bot = new TelegramBot(token, { polling: true });

console.log('Bot sudah online');

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const nama = msg.from.first_name;
  
  const keyboard = {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Info Bot', callback_data: 'info' }],
        [{ text: 'Chat Owner', url: https://t.me/${usernameOwner} }]
      ]
    }
  };
  
  bot.sendMessage(chatId, Halo ${nama}! 👋\n\nGue bot demo. Pilih menu di bawah:, keyboard);
});

bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;
  
  if (data === 'info') {
    bot.sendMessage(chatId, 'Bot ini dibuat pake Node.js dan dihosting di Railway. Gratis 24 jam nonstop 🔥');
  }
  
  bot.answerCallbackQuery(query.id);
});

bot.on('message', (msg) => {
  if (msg.text && !msg.text.startsWith('/start')) {
    bot.sendMessage(msg.chat.id, 'Ketik /start buat mulai bro');
  }
});

process.on('unhandledRejection', (error) => {
  console.log('Error:', error.message);
});
