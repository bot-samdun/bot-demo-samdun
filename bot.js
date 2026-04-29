const TelegramBot = require('node-telegram-bot-api');

// >>> GANTI 3 INI DOANG YA BRO <<<
const token = '8637311609:AAFgFFF8-Gki2DZncg7NbXGqPtVsYYT5zQk'; 
const chatIdAdmin = '8594967007'; // ID dari @userinfobot
const nomorAdminWA = '6281353462858'; // Nomor WA lu pake 62
// >>> UDAH, SISANYA JANGAN DIUBAH <<<

const bot = new TelegramBot(token, {polling: true});
console.log('Bot LV1.5 Active bro!');

// Command /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const welcomeText = `Halo bro ${msg.from.first_name}! 👋\n\nGue bot order otomatis.\n\nKetik /order buat mulai pesen.`;
  bot.sendMessage(chatId, welcomeText);
});

// Command /order
bot.onText(/\/order/, (msg) => {
  const chatId = msg.chat.id;
  const orderText = `Format order:\n\nDesain Logo | Nama: xxx, warna: xxx\n\nContoh:\nDesain Logo | Nama: Kopi Kenangan, warna: hitam gold\n\nLangsung ketik dibawah bro 👇`;
  bot.sendMessage(chatId, orderText);
});

// Tangkap orderan customer
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  
  if (!text || text.startsWith('/')) return;
  
  if (text.includes('|')) {
    const username = msg.from.username ? `@${msg.from.username}` : msg.from.first_name;
    const userId = msg.from.id;
    
    const teksOrderAdmin = `🔥 ORDER BARU MASUK 🔥\n\nDari: ${username}\nID: ${userId}\nPesanan: ${text}\n\nLangsung sikat bro!`;
    
    const pesanWa = encodeURIComponent(`Halo kak ${username}, orderan:\n"${text}"\n\nUdah gue terima ya. Lanjut proses?`);
    const linkWa = `https://wa.me/${nomorAdminWA}?text=${pesanWa}`;
    
    bot.sendMessage(chatIdAdmin, teksOrderAdmin, {
      reply_markup: {
        inline_keyboard: [[
          { text: "📲 Balas via WhatsApp", url: linkWa }
        ]]
      }
    });
    
    bot.sendMessage(chatId, "✅ Order lu udah dikirim ke admin!\nTunggu dibales via WA ya. Sabar bro 🙏");
  }
});

console.log('Bot siap nerima orderan!');
