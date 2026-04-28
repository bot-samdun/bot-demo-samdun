const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Bot Demo Samdun On 24 Jam!'));
app.listen(PORT, () => console.log(`Server jalan di ${PORT}`));

const TelegramBot = require('node-telegram-bot-api');

const token =  "8637311609:AAFut9gti5Na6lhviCv7OBdr2vVttwDVVzY"

const bot = new TelegramBot(token, {polling: true});
console.log('Bot Demo Samdun ON BRO!');

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const nama = msg.from.first_name;
  
  const menu = {
    reply_markup: {
      inline_keyboard: [
        [{ text: '📦 List Produk Demo', callback_data: 'produk' }],
        [{ text: '📝 Cara Order', callback_data: 'order' }, { text: '💬 Testimoni', callback_data: 'testi' }],
        [{ text: '👨‍💻 Jasa Pembuatan Bot', callback_data: 'jasa' }],
        
        [{ text: '📞 Chat Admin', url: 'https://t.me/Samdun_Bot }]
      ]
    }
  };
  
  bot.sendMessage(chatId, `Halo ${nama} 👋\n\nSelamat datang di *Bot Demo Samdun*.\nIni contoh bot yang bisa saya buat untuk bisnis Anda.\n\nSilakan klik menu di bawah:`, {parse_mode: 'Markdown', ...menu});
});

bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;

  if (data === 'produk') {
    bot.sendPhoto(chatId, 'https://picsum.photos/400', {
      caption: '*PRODUK DEMO 1*\n\nHarga: Rp 99.000\nStok: Ready\n\nIni contoh tampilan katalog. Bisa kirim 10 foto sekaligus.', 
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [[{ text: '⬅️ Kembali ke Menu', callback_data: 'menu' }]]
      }
    });
  }
  
  else if (data === 'order') {
    bot.sendMessage(chatId, '*CARA ORDER DI BOT INI:*\n\n1. Klik /orderform\n2. Isi nama, alamat, no HP\n3. Transfer & konfirmasi\n\n*Bot bisa auto-rekap order ke admin lho*', {
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [[{ text: '⬅️ Kembali ke Menu', callback_data: 'menu' }]]
      }
    });
  }
  
  else if (data === 'testi') {
    bot.sendMessage(chatId, '⭐️⭐️⭐️\n*"Botnya keren bang, omset naik 3x lipat"*\n- Toko Seblak Mantap\n\nIni contoh fitur testimoni ya', {
      reply_markup: {
        inline_keyboard: [[{ text: '⬅️ Kembali ke Menu', callback_data: 'menu' }]]
      }
    });
  }
  
  else if (data === 'jasa') {
    
    bot.sendMessage(chatId, '*MAU BOT KAYAK GINI?*\n\nHarga mulai *Rp 250.000* aja\n\nFitur:\n✅ Tombol Menu\n✅ Katalog Foto\n✅ Form Order\n✅ On 24 Jam\n✅ Anti Banned\n\nLangsung chat: @Samdun_Bot', {
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [[{ text: '⬅️ Kembali ke Menu', callback_data: 'menu' }]]
      }
    });
  }
  
  else if (data === 'menu') {
    bot.deleteMessage(chatId, query.message.message_id);
    bot.emit('text', {chat: {id: chatId}, text: '/start', from: query.from});
  }
  
  bot.answerCallbackQuery(query.id);
});

process.on('unhandledRejection', (error) => {
  console.log('Error:', error.message);
});