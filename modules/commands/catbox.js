module.exports.config = {
    name: "catbox",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Heo Rừng",
    description: "Random catbox music",
    commandCategory: "other",
    usages: "nhạc",
    cooldowns: 5
  };
  
  module.exports.run = async function({ api, event, args }) {
    const axios = require('axios');
    const request = require('request');
    const fs = require("fs");
   //const threadSetting = (await Threads.getData(String(event.threadID))).data || {};
           // const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
    await axios.get('https://api-nodejsx.miraiofficials123.repl.co/images/v2?type=catbox').then(res => {
    let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
    let count = res.data.count;
    let callback = function () {
            api.sendMessage({
              body: 'Random catbox music:',
              attachment: fs.createReadStream(__dirname + '/cache/catbox.mp3')
            }, event.threadID, () => fs.unlinkSync(__dirname + '/cache/catbox.mp3'), event.messageID);
          };
          request(res.data.data).pipe(fs.createWriteStream(__dirname + '/cache/catbox.mp3')).on("close", callback);
        })
  }