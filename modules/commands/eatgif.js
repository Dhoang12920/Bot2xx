const request = require("request");
const fs = require("fs")
const axios = require("axios")
module.exports.config = {
  name: "ăn",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "",
  description: "ăn thịt người Bạn Muốn",
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
          "https://c.tenor.com/9-BONYwVjk0AAAAC/parasyte-live-action-alien.gif",
             ];
   var callback = () => api.sendMessage({body: `Nom Nom Nom Nom ${tag} ` , mentions: [{
          tag: tag,
          id: Object.keys(event.mentions)[0]
        }],
  attachment: fs.createReadStream(__dirname + "/cache/eat.gif")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/eat.gif"));
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/eat.gif")).on("close",() => callback());
   };