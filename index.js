const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Bot Minecraft dang chay 24/7!');
});
app.listen(process.env.PORT || 3000);

function startBot() {
  const bot = mineflayer.createBot({
    host: '9GSMP2026-2027.aternos.me', // Thay bằng IP server của bạn (Ví dụ: abc.aternos.me)
    port: 25476,                     // Thay bằng số Port nếu có, không có thì giữ nguyên 25565
    username: 'anhhuydeptrai',    // Tên con bot bạn muốn đặt
    version: "26.2"                  
  });

  bot.on('spawn', () => {
    console.log('Bot da vao server thanh cong!');
    
    // Cu 30 giay bot tu nhay va xoay nguoi de khong bi kick AFK
    setInterval(() => {
      if (bot.entity) {
        bot.setControlState('jump', true);
        setTimeout(() => bot.setControlState('jump', false), 500);
        
        const yaw = Math.random() * Math.PI * 2;
        const pitch = (Math.random() - 0.5) * Math.PI;
        bot.look(yaw, pitch);
      }
    }, 30000); 
  });

  bot.on('end', () => {
    console.log('Bot mat ket noi! Dang thu lai sau 15 giay...');
    setTimeout(startBot, 15000);
  });

  bot.on('error', (err) => console.log('Loi: ', err));
}

startBot();
