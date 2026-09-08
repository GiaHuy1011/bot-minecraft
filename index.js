const mineflayer = require('mineflayer');
const express = require('express');
const dns = require('dns');
const app = express();

app.get('/', (req, res) => {
  res.send('Bot MegaSMP di chuyen lien tuc dang chay 24/7!');
});
app.listen(process.env.PORT || 3000);

const hostName = '9GSMP2026-2027.aternos.me'; 
const serverPort = 25476;

function getIPAndStartBot() {
  dns.resolve4(hostName, (err, addresses) => {
    if (err || !addresses || addresses.length === 0) {
      console.log('Chua tim thay IP server, dang quet lai sau 15 giay...');
      setTimeout(getIPAndStartBot, 15000);
      return;
    }
    
    const realIP = addresses;
    console.log(`Da tim thay IP thuc te cua Server: ${realIP}`);
    
    const bot = mineflayer.createBot({
      host: realIP,
      port: serverPort, 
      username: 'MegaSMP_Bot2026',
      hideErrors: true,
      skipValidation: true,
      version: false 
    });

    bot.on('spawn', () => {
      console.log('Bot da vao server va bat dau chu ky di chuyen chong AFK!');
      
      // Vong lap tu dong di chuyen tien - lui mai mai
      setInterval(() => {
        if (!bot.entity) return;

        // 1. Cho bot di tien ve phia truoc trong 0.6 giay (~2 block)
        bot.setControlState('forward', true);
        
        setTimeout(() => {
          bot.setControlState('forward', false); // Dung lai
          
          // 2. Doi 1 giay roi bat dau di lui ve phia sau trong 0.6 giay
          setTimeout(() => {
            bot.setControlState('back', true);
            
            setTimeout(() => {
              bot.setControlState('back', false); // Dung lai va ket thuc chu ky
            }, 600);
            
          }, 1000);
          
        }, 600);

      }, 10000); // Cu sau moi 10 giay bot se thuc hien hanh dong di chuyen mot lan
    });

    bot.on('end', () => {
      console.log('Bot bi ngat ket noi! Dang tien hanh quet lai IP sau 15 giay...');
      setTimeout(getIPAndStartBot, 15000);
    });

    bot.on('error', (err) => console.log('Loi he thong: ', err.message));
  });
}

getIPAndStartBot();
