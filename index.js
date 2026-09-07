const mineflayer = require('mineflayer');
const express = require('express');
const dns = require('dns');
const app = express();

app.get('/', (req, res) => {
  res.send('Bot Minecraft tu dong do tim IP dang chay 24/7!');
});
app.listen(process.env.PORT || 3000);

const hostName = '9GSMP2026-2027.aternos.me'; 

function getIPAndStartBot() {
  dns.resolve4(hostName, (err, addresses) => {
    if (err || !addresses || addresses.length === 0) {
      console.log('Khong the tim thay IP server, dang thu lai sau 15 giay...');
      setTimeout(getIPAndStartBot, 15000);
      return;
    }
    
    const realIP = addresses[0];
    console.log(`Da tim thay IP thuc te hien tai cua Server: ${realIP}`);
    
    const bot = mineflayer.createBot({
      host: realIP,
      port: 25475, 
      username: 'MegaSMP_Bot2026',
      version: "26.2"
    });

    bot.on('spawn', () => {
      console.log('Bot da vao server thanh cong va dang giu server ON 24/7!');
      
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
      console.log('Bot bi ngat ket noi! Tien hanh quet lai IP va ket noi lai sau 15 giay...');
      setTimeout(getIPAndStartBot, 15000);
    });

    bot.on('error', (err) => console.log('Loi: ', err));
  });
}

getIPAndStartBot();
