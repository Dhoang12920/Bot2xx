const request = require("request");
//const fs = require("fs")
const axios = require("axios")
module.exports.config = {
  name: "gear2",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "quất mod",
  description: "Tag Người Bạn Muốn",
  commandCategory: "one piece",
  usages: "reply hoặc @ ai đó và nhắn như tên lệnh",
  cooldowns: 5,
  dependencies: {"request": "","fs": "","axios": ""}
};

module.exports.run = async ({api,event,args,client,Users,Threads,Currencies}) => {
  const { threadID, messageID, senderID, mentions, type, messageReply } = event;
  const axios = require('axios')
        const request = require('request')
                const fs = require('fs')
                  var mention = Object.keys(event.mentions)[0];
    //var id = event.messageReply.senderID
 // var type = args[0]
//let tag = event.mentions[mention].replace("@", "") 
  if (type == 'message_reply') {
        targetID = messageReply.senderID;
    } else if (Object.keys(mentions).length > 0) {
        targetID = Object.keys(mentions)[0];
    }
  const tag = global.data.userName.get(targetID)
  //var tag = (await api.getUserInfo(targetID)).name
        var link = [
          "https://c.tenor.com/2vfA2krGkrEAAAAM/luffy-gear-second.gif",
             ];
   var callback = () => api.sendMessage({body: `𝗚𝗲𝗮𝗿 𝗦𝗲𝗰𝗼𝗻𝗱 ${tag} 🌪️` , mentions: [{
          tag: tag,
          id: targetID
        }],
  attachment: fs.createReadStream(__dirname + "/cache/gear2.gif")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/gear2.gif"));
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/gear2.gif")).on("close",() => callback());
   };