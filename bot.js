const TelegramBot = require('node-telegram-bot-api');

// ====== GANTI 2 BARIS INI DOANG ======
const token = '8637311609:AAEIv15YFBeSFa50reT14qLJPzRnOQWD9uQ'; 
const usernameOwner = 'Hamdanhndsm';
// =====================================

const bot = new TelegramBot(token, { polling: true });

// Database jasa & testimoni
const listJasa = `📌 DAFTAR JASA 📌\n\n1. Joki Tugas - 15k/tugas\n2. Desain Logo - 50k\n3. Edit Video - 30k/menit\n4. Followers IG - 20k/1k followers\n\nKetik /order untuk pesan`;

const listTestimoni = `⭐ TESTIMONI ⭐\n\n1. @budi: "Kerjaan cepet, rapi banget!"\n2. @siti: "Desainnya keren, 5 bintang"\n3. @andi: "Followers real, ga drop"\n\nMau order? /order`;

// Menu utama
const mainMenu = {
  reply_markup: {
    inline_keyboard: [
      [{ text: '📋 List Jasa', callback_data: 'jasa' }, { text: '⭐ Testimoni', callback_data: 'testi' }],
      [{ text: '🛒 Order Sekarang', callback_data: 'order' }]
    ]
  }
};

// Command /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const nama = msg.from.first_name;
  bot.sendMessage(chatId, `Halo ${nama} 👋\n\nSelamat datang di Bot Jasa Samdun!\nPilih menu di bawah:`, mainMenu);
});

// Command /order
bot.onText(/\/order/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Ketik format order:\n\n`Nama Jasa | Detail pesanan`\n\nContoh:\n`Joki Tugas | Matematika 5 soal deadline besok`', { parse_mode: 'Markdown' });
  
  bot.once('message', (orderMsg) => {
    if (orderMsg.text.startsWith('/')) return;
    const orderText = `🔥 ORDER BARU 🔥\n\nDari: @${orderMsg.from.username || orderMsg.from.first_name}\nID: ${orderMsg.from.id}\n\nPesanan:\n${orderMsg.text}`;
    bot.sendMessage(usernameOwner, orderText);
    bot.sendMessage(chatId, '✅ Order lu udah dikirim ke admin!\nTunggu dibales ya. Sabar bro 🙏');
  });
});

// Handle tombol
bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;
  if (query.data === 'jasa') {
    bot.sendMessage(chatId, listJasa, mainMenu);
  } else if (query.data === 'testi') {
    bot.sendMessage(chatId, listTestimoni, mainMenu);
  } else if (query.data === 'order') {
    bot.sendMessage(chatId, 'Ketik format order:\n\n`Nama Jasa | Detail pesanan`\n\nContoh:\n`Desain Logo | Nama: Kopi Kenangan, warna: hitam gold`', { parse_mode: 'Markdown' });
    bot.once('message', (orderMsg) => {
      if (orderMsg.text.startsWith('/')) return;
      const orderText = `🔥 ORDER BARU 🔥\n\nDari: @${orderMsg.from.username || orderMsg.from.first_name}\nID: ${orderMsg.from.id}\n\nPesanan:\n${orderMsg.text}`;
      bot.sendMessage(usernameOwner, orderText);
      bot.sendMessage(chatId, '✅ Order lu udah dikirim ke admin!\nTunggu dibales ya. Sabar bro 🙏');
    });
  }
  bot.answerCallbackQuery(query.id);
});

process.on('uncaughtException', (err) => console.error('Error:', err));

console.log('Bot sudah online');
