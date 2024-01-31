module.exports.config = {
  name: "ctbcb",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "TuanDz",
  description: "Những câu ca dao",
  commandCategory: "tiện ích",
  cooldowns: 0
};
function byte2mb(bytes) {
  const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let l = 0, n = parseInt(bytes, 10) || 0;
  while (n >= 1024 && ++l) n = n / 1024;
  return `${n.toFixed(n < 10 && l > 0 ? 1 : 0)} ${units[l]}`;
}
module.exports.run = async ({ api, event }) => {
  const axios = require('axios');
  const fetch = global.nodemodule["node-fetch"];
  const request = require('request');
  const res = await axios.get(`https://Co-the-ban-chua-biet.thanhha6.repl.co`);
  var poem = res.data.data;
  const fs = require("fs");
  const moment = require("moment-timezone");
  var gio = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss || D/MM/YYYY");
  var thu = moment.tz('Asia/Ho_Chi_Minh').format('dddd');
  if (thu == 'Sunday') thu = '𝐂𝐡𝐮̉ 𝐍𝐡𝐚̣̂𝐭'
  if (thu == 'Monday') thu = '𝐓𝐡𝐮̛́ 𝐇𝐚𝐢'
  if (thu == 'Tuesday') thu = '𝐓𝐡𝐮̛́ 𝐁𝐚'
  if (thu == 'Wednesday') thu = '𝐓𝐡𝐮̛́ 𝐓𝐮̛'
  if (thu == "Thursday") thu = '𝐓𝐡𝐮̛́ 𝐍𝐚̆𝐦'
  if (thu == 'Friday') thu = '𝐓𝐡𝐮̛́ 𝐒𝐚́𝐮'
  if (thu == 'Saturday') thu = '𝐓𝐡𝐮̛́ 𝐁𝐚̉𝐲'
  const time = process.uptime(),
    hours = Math.floor(time / (60 * 60)),
    minutes = Math.floor((time % (60 * 60)) / 60),
    seconds = Math.floor(time % 60);
  const pidusage = await global.nodemodule["pidusage"](process.pid);
  const timeStart = Date.now();
  axios.get('https://apiurl.miraiofficials123.repl.co').then(res => {
    let ext = res.data.url.substring(res.data.url.lastIndexOf(".") + 1);
    let callback = function () {
      api.sendMessage({
        body: `ㅤ 💌 === 𝗖𝗼́ 𝘁𝗵𝗲̂̉ 𝗯𝗮̣𝗻 𝗰𝗵𝘂̛𝗮 𝗯𝗶𝗲̂́𝘁 === 💌\n\n🐼──── •❤️‍🔥• ────🐼\n\n『 ${poem} 』\n\n🐷──── •❤️‍🔥• ────🐷\n\nㅤㅤㅤ🏮 ${thu} 🏮\n⏳ ${gio} ⏳`,
        attachment: fs.createReadStream(__dirname + `/cache/anh.${ext}`)
      }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/anh.${ext}`), event.messageID);
    };
    request(res.data.url).pipe(fs.createWriteStream(__dirname + `/cache/anh.${ext}`)).on("close", callback);
  })
}