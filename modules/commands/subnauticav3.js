module.exports.config = {
	name:"subhelp",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Heo Rừng mod từ trangbi của GK",
	description: "Xem thông tin đủ thể loại cá từ subnautica",
	commandCategory: "Giải trí",
	usages: "list/[tên cá]",
	cooldowns: 0
};

module.exports.run = async function ({ api, event, args }) {
  const fs = require('fs');
  const axios = require('axios');
  const request = require('request');
  let { senderID, messageID, threadID } = event;
  if(args[0] == "list"){
    const ditconme = (await axios.get('https://raw.githubusercontent.com/theguardian132/subnautica/main/data2.json')).data
    var count = ditconme.fish.length;
      var data = ditconme.fish
      var page = 1;
      page = parseInt(args[1]) || 1;
      page < -1 ? page = 1 : "";
      var limit = 200;
      var numPage = Math.ceil(count/limit);
      var msg = ``;
      for(var i = limit*(page - 1); i < limit*(page-1) + limit; i++){
         if(i >= count) break;
        msg += `[ ${i+1} ] - ${data[i].name}\n`;
      }
      msg += `Trang (${page}/${numPage})\nDùng ${global.config.PREFIX}${this.config.name} list <số trang>`;
      return api.sendMessage(msg, event.threadID,event.messageID);
   }
  if (args.length == 0) return api.sendMessage("Vui lòng nhập tên cá cần xem thông tin!", threadID, messageID);
  if (args.length == 0 || args.length > 4) return api.sendMessage("Tên cá đéo hợp lệ!", threadID, messageID);
  var search = event.body.slice(event.body.indexOf(" ") + 1).toLowerCase();
  const res = await axios.get("https://raw.githubusercontent.com/theguardian132/subnautica/main/data2.json");
  const fish = res.data.fish;
  var check = 0;
  for (let fishy of fish) {
    if (fishy.name == search) {
	    check++;
	    var link = fishy.link;
      var name = fishy.name;
      var category = fishy.category;
      var sell = fishy.sell;
      var size = fishy.size;
      var zone = fishy.zone
    };
  };
  if (check == 0) return api.sendMessage(`Không có dữ liệu cho loại cá ${search}!`, threadID, messageID);
  let callback = function () {
    api.sendMessage({
      body: `[KẾT QUẢ CỦA BẠN]\n•Tên: ${name}\n•Category: ${category}\n•Size: ${size}cm\n•Giá: ${sell}$\n•Khu vực: ${zone}`,
      attachment: fs.createReadStream(__dirname + `/cache/fish.png`)
    }, threadID, () => fs.unlinkSync(__dirname + `/cache/fish.png`), messageID);
  };
  request(link).pipe(fs.createWriteStream(__dirname + `/cache/fish.png`)).on("close", callback);
}