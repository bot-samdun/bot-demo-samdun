const TelegramBot = require('node-telegram-bot-api');

// >>> GANTI 3 INI DOANG <<<
const token = '8637311609:AAHvG2TQ0-3-FmsN14iwGc1o10bLa1RCS5c'; 
const chatIdAdmin = '8594967007'; // ID dari @userinfobot tadi
const nomorAdminWA = '6281353462858'; // Nomor WA lu pake 62

// >>> SISANYA GA USAH DIUBAH <<<
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
  
  // Skip kalo command atau kosong
  if (!text || text.startsWith('/')) return;
  
  // Cek format order: harus ada " | "
  if (text.includes('|')) {
    const username = msg.from.username ? `@${msg.from.username}` : msg.from.first_name;
    const userId = msg.from.id;
    
    // 1. Teks buat admin
    const teksOrderAdmin = `🔥 ORDER BARU MASUK 🔥\n\nDari: ${username}\nID: ${
