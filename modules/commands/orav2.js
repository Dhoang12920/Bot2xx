const request = require("request");
const fs = require("fs")
const axios = require("axios")
module.exports.config = {
  name: "orav2",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Heo Rừng Mod",
  description: "Ora người Bạn Muốn",
  commandCategory: "Tag",
  usages: "@tag",
  cooldowns: 5,
  dependencies: {"request": "","fs": "","axios": ""}
};
 
module.exports.run = async({api,event,args,client,Users,Threads,__GLOBAL,Currencies}) => {
        const request = require('request')
                const fs = require('fs')
                  var mention = Object.keys(event.mentions)[0];
let tag = event.mentions[mention].replace("@", "");
        var link = [
          "https://c.tenor.com/ZPoy2cTDFKsAAAAC/jojos-bizarre-adventure-ora.gif",
             ];
   var callback = () => api.sendMessage({body: `ORA ORA ORA ORA ORA chết con mẹ mày đeeee đồ chóoo ${tag} 🙈` , mentions: [{
          tag: tag,
          id: Object.keys(event.mentions)[0]
        }],
  attachment: fs.createReadStream(__dirname + "/cache/ora.gif")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/ora.gif"));
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/ora.gif")).on("close",() => callback());
   };