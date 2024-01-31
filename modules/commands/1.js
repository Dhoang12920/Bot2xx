module.exports.config = {
    name: '1',
    version: '10.02',
    hasPermssion: 2,
    credits: 'DC-Nam',
    description: 'Tự động gửi tin nhắn theo giờ đã cài!',
    commandCategory: 'admin',
    usages: '[]',
    cooldowns: 3
};
const r = a => a[Math.floor(Math.random()*a.length)],
{
    get
} = require('axios'),
config = [{
        timer: '5:00:00 PM',
    message: ['➝ Bây giờ là: {time} \n➝ Thính: {thinh}\n━━━━━━━━━━━━━━━━━━━━━━━━\nai có nhu cầu thuê bot, làm admin bot ib fb.me/100037211391552']
},
{
        timer: '9:00:00 AM',
    message: ['➝ Bây giờ là: {time} \n➝ Thính: {thinh}\n━━━━━━━━━━━━━━━━━━━━━━━━\nai  có nhu cầu thuê bot, làm admin bot ib fb.me/100037211391552']
},
{
        timer: '6:00:00 AM',
        message: ['➝ Bây giờ là: {time} \n➝ Thính: {thinh}\n━━━━━━━━━━━━━━━━━━━━━━━━\nai  có nhu cầu thuê bot, làm admin bot ib fb.me/100037211391552'] 
}, 
{
        timer: '3:00:00 PM',
        message: ['➝ Bây giờ là: {time} \n➝ Thính: {thinh}\n━━━━━━━━━━━━━━━━━━━━━━━━\nai  có nhu cầu thuê bot, làm admin bot ib fb.me/100037211391552'] 
} ,           
{
        timer: '12:30:00 PM',
        message: ['➝ Bây giờ là: {time} \n➝ Thính: {thinh}\n━━━━━━━━━━━━━━━━━━━━━━━━\nai  có nhu cầu thuê bot, làm admin bot ib fb.me/100037211391552'] 
}]; 
module.exports.onLoad = o => {
    if (!!global.autosendmessage_setinterval) clearInterval(global.autosendmessage_setinterval);
    global.autosendmessage_setinterval = setInterval(async function() {
        if (á = config.find(i => i.timer == new Date(Date.now()+25200000).toLocaleString().split(/,/).pop().trim())) {
            var msg = r(á.message);
            msg = msg.replace(/{time}/g, (require("moment-timezone")).tz("Asia/Ho_Chi_Minh").format("HH:mm:ss (D/MM/YYYY) (dddd)")).replace(/{thinh}/g, (await get(`https://apithinhgender.miraiofficials123.repl.co/nam.json`)).data.data)
            msg = {
                body: msg, attachment: (await get((await get(`https://apivideo.tinl9.repl.co/snauzk/?apikey=0703`)).data.url, {
                    responseType: 'stream'
                })).data
            };
            global.data.allThreadID.forEach(i => o.api.sendMessage(msg, i));
        };
    }, 1000);
};
module.exports.run = () => {};

//https://pastebin.com/raw/7DrzcBiT