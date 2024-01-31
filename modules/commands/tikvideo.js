module.exports.config = {
name: "tikvideo",
version: "1.0.0",
hasPermssion: 0,
credits: "Thiệu Trung Kiên",
description: "Tải video tiktok",
commandCategory: "tik tok",
usages: "",
cooldowns: 5
}, module.exports.onLoad = function() {
console.log("===TIKTOK DOWNLOAD NO WATERMARK===")
}, module.exports.run = async function({ args,event,api }) {
  const axios = require("axios");
  const fs = require("fs-extra");
    const request = require("request");
  var img = [];
  if(!args[0]){
    return api.sendMessage(`Chưa nhập nội dung ?`,event.threadID, event.messageID)
  }
  const res = (await axios.get(`http://api.leanhtruong.net/api-no-key/tiktok?url=${encodeURI(args[0])}`)).data
   let imga = (await axios.get(res.thumbail , { responseType: "arraybuffer" } )).data; 
         fs.writeFileSync(__dirname + "/cache/tiktok.png", Buffer.from(imga, "utf-8") );
         img.push(fs.createReadStream(__dirname + "/cache/tiktok.png"));
  var msg = {body: `⚔=====[ 𝙏𝙄𝙆 𝙏𝙊𝙆 ]=====⚔\n\n𝙏𝙞𝙩𝙡𝙚 : ${res.title}\n𝘼𝙪𝙩𝙝𝙤𝙧 : ${res.author_video}\n𝙏𝙞𝙩𝙡𝙚 𝙢𝙪𝙨𝙞𝙘 : ${res.data_music.title}\n\n𝟭 : 𝘿𝙤𝙬𝙣𝙡𝙤𝙖𝙙 𝙫𝙞𝙙𝙚𝙤\n𝟮 : 𝘿𝙤𝙬𝙣𝙡𝙤𝙖𝙙 𝙨𝙤𝙪𝙣𝙙`,attachment: img}
  return api.sendMessage(msg, event.threadID, (error, info) => {
        global.client.handleReply.push({
            type: "reply",
            name: this.config.name,
            author: event.senderID,
            messageID: info.messageID,
            video: res.data_nowatermark[0].url,
            mp3: res.data_music.url,
            title: res.title,
          authorvd: res.author_video,
          text : res.data_music.title
        })
    }) 
}
module.exports.handleReply = async function ({ args, event, Users, Currencies, api, handleReply }) {
const axios = require("axios");
  const fs = require("fs-extra");
    const request = require("request");
    let { author, video,mp3, title,authorvd, text  , messageID } = handleReply;
    if (event.senderID != author) return api.sendMessage("𝙍𝙚𝙥𝙡𝙮 𝟭 𝙝𝙤𝙖̣̆𝙘 𝟮", event.threadID, event.messageID); 
    switch(handleReply.type) {
        case "reply": {
        switch(event.body){
          case"1":{
            var callback = () => api.sendMessage({body:`𝙎𝙤𝙪𝙧𝙘𝙚 : ${authorvd}\n𝘾𝙤𝙣𝙩𝙚𝙣𝙩 : ${title}\n`,attachment: fs.createReadStream(__dirname + "/cache/toptop.mp4")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/toptop.mp4"),event.messageID);
return request(encodeURI(`${video}`)).pipe(fs.createWriteStream(__dirname+'/cache/toptop.mp4')).on('close',() => callback());     
          }
            case"2":{
            var callback = () => api.sendMessage({body:`𝙎𝙤𝙪𝙣𝙙 : ${text}`,attachment: fs.createReadStream(__dirname + "/cache/toptop.m4a")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/toptop.m4a"),event.messageID);
return request(encodeURI(`${mp3}`)).pipe(fs.createWriteStream(__dirname+'/cache/toptop.m4a')).on('close',() => callback());     
          }
        }
        }
    }
}

