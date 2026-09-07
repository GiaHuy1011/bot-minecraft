const mineflayer = require('mineflayer');
const express = require('express');
const dns = require('dns');
const app = express();

app.get('/', (req, res) => {
  res.send('Bot MegaSMP 2026 tu dong quet IP dang chay 24/7!');
});
app.listen(process.env.PORT || 3000);

// Thong tin thuc te tu anh Aternos cua ban
const hostName = '9GSMP2026-2027.aternos.me'; 
const serverPort = 25476;

function getIPAndStartBot() {
  dns.resolve4(hostName, (err, addresses) => {
    if (err || !addresses || addresses.length === 0) {
      console.log('Chua tim thay IP server, dang quet lai sau 15 giay...');
      setTimeout(getIPAndStartBot, 15000);
      return;
    }
    
    const realIP = addresses[0];
    console.log(`Da tim thay IP thuc te cua Server: ${realIP}`);
    
    const bot = mineflayer.createBot({
      host: realIP,
      port: serverPort, 
      username: 'MegaSMP_Bot2026',
      version: "1.21.11"
    });

    bot.on('spawn', () => {
      console.log('Bot da vao server thanh cong va dang giu server ON 24/7!');
      
      // Hanh dong chong kick AFK cua Aternos
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
      console.log('Bot bi ngat ket noi! Dang tien hanh quet lai IP sau 15 giay...');
      setTimeout(getIPAndStartBot, 15000);
    });

    bot.on('error', (err) => console.log('Loi he thong: ', err));
  });
}

getIPAndStartBot();
