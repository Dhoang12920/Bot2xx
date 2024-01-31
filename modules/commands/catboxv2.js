module.exports.config = {
	name:"catboxv2",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Khoa mod list by TrúcCute",
	description: "Xem thông tin các trang bị của Liên Quân Mobile",
	commandCategory: "liên quân mobile",
	usages: "[tên trang bị]",
	cooldowns: 0
};

module.exports.run = async function ({ api, event, args }) {
  const fs = require('fs');
  const axios = require('axios');
  const request = require('request');
  let { senderID, messageID, threadID } = event;
  if(args[0] == "list"){
    const catbox = (await axios.get('https://raw.githubusercontent.com/theguardian132/catbox/main/catbox.json')).data
    var count = catbox.catbox.length;
      var data = catbox.catbox
      var page = 1;
      page = parseInt(args[1]) || 1;
      page < -1 ? page = 1 : "";
      var limit = 20;
      var numPage = Math.ceil(count/limit);
      var msg = ``;
      for(var i = limit*(page - 1); i < limit*(page-1) + limit; i++){
         if(i >= count) break;
        msg += `[ ${i+1} ] - ${data[i].name}\n`;
      }
      msg += `Trang (${page}/${numPage})\nDùng ${global.config.PREFIX}${this.config.name} list <số trang>`;
      return api.sendMessage(msg, event.threadID,event.messageID);
   }
  if (args.length == 0) return api.sendMessage("Vui lòng nhập tên trang bị cần xem thông tin!", threadID, messageID);
  if (args.length = 0) return api.sendMessage("Tên ID đéo hợp lệ", threadID, messageID);
  var search = event.body.slice(event.body.indexOf(" ") + 1).toLowerCase();
  const res = await axios.get("https://raw.githubusercontent.com/theguardian132/catbox/main/catbox.json");
  const catboxlist = res.data.catbox;
  var check = 0;
  for (let item of catboxlist) {
    if (item.ID == search) {
	    check++;
	    var link = item.link;
    };
  };
  if (check == 0) return api.sendMessage(`Không có dữ liệu cho ID ${search}!`, threadID, messageID);
  let callback = function () {
    api.sendMessage({
      body: `${item.name}`,
      attachment: fs.createReadStream(__dirname + '/cache/catbox2.mp3')
            }, event.threadID, () => fs.unlinkSync(__dirname + '/cache/catbox2.mp3'), event.messageID);
          };
          request(res.data.data).pipe(fs.createWriteStream(__dirname + '/cache/catbox2.mp3')).on("close", callback);
}
