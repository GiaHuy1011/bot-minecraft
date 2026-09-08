const mineflayer = require('mineflayer');
const express = require('express');
const dns = require('dns');
const app = express();

app.get('/', (req, res) => {
  res.send('Bot MegaSMP di chuyen Vanilla dang chay 24/7!');
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
      version: false,
      // BAT BUOC: Bat tinh nang doc thong tin map de server Vanilla khong kick vi hack di chuyen
      physicsEnabled: true 
    });

    bot.on('spawn', () => {
      console.log('Bot da vao server Vanilla va dang bat dau chu ky di chuyen!');
      
      // Cho bot doi 3 giay de tai xong map chung quanh roi moi bat dau di chuyen
      setTimeout(() => {
        setInterval(() => {
          if (!bot.entity) return;

          // Cho bot di tien len 0.5 giay
          bot.setControlState('forward', true);
          
          setTimeout(() => {
            bot.setControlState('forward', false); // Dung lai
            
            // Doi 1 giay roi di lui ve vi tri cu 0.5 giay
            setTimeout(() => {
              bot.setControlState('back', true);
              
              setTimeout(() => {
                bot.setControlState('back', false); // Dung lai hoan toan
              }, 500);
              
            }, 1000);
            
          }, 500);

        }, 15000); // Thuc hien chu ky sau moi 15 giay
      }, 3000);
    });

    bot.on('end', () => {
      console.log('Bot bi ngat ket noi! Dang tien hanh quet lai IP sau 15 giay...');
      setTimeout(getIPAndStartBot, 15000);
    });

    bot.on('error', (err) => console.log('Loi he thong: ', err.message));
  });
}

getIPAndStartBot();
