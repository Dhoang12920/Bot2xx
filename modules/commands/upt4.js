module.exports.config = {
	name:"upt4",
	version: "1.0.0",
	hasPermssion: 3,
	credits: "Mirai Project",
	description: "Random ảnh theo api - uptime",
	commandCategory: "Hệ thống",
	cooldowns: 3,
  dependencies: {
		"pidusage": ""
	}
};
function byte2mb(bytes) {
	const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	let l = 0, n = parseInt(bytes, 10) || 0;
	while (n >= 1024 && ++l) n = n / 1024;
	return `${n.toFixed(n < 10 && l > 0 ? 1 : 0)} ${units[l]}`;
}
module.exports.run = async ({ api, event, args }) => {
const time =  process.uptime (),
		hours = Math.floor(time / (60 * 60)),
		minutes = Math.floor((time % (60 * 60)) / 60),
		seconds = Math.floor(time % 60);
  var z_1 = (hours < 10) ? '0' + hours : hours;
    var x_1 = (minutes < 10) ? '0' + minutes : minutes;
    var y_1 = (seconds < 10) ? '0' + seconds : seconds;
  const { commands } = global.client;
  const moment = require("moment-timezone");
  const timeNow = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY || HH:mm:s");
    const axios = require('axios')
	const pidusage = await global.nodemodule["pidusage"](process.pid);
	const timeStart = Date.now();
  const fs = require('fs-extra');
   if (!fs.existsSync(__dirname +
        `/tad/UTM-Avo.ttf`)) {
        let getfont = (await axios.get(`https://github.com/hanakuUwU/font/raw/main/UTM%20Avo.ttf`, { responseType: "arraybuffer" })).data;
        fs.writeFileSync(__dirname + `/tad/UTM-Avo.ttf`, Buffer.from(getfont, "utf-8"));
      }
         if (!fs.existsSync(__dirname +
      `/tad/phenomicon.ttf`)) {
      let getfont2 = (await axios.get(`https://github.com/hanakuUwU/font/raw/main/phenomicon.ttf`, { responseType: "arraybuffer" })).data;
      fs.writeFileSync(__dirname + `/tad/phenomicon.ttf`, Buffer.from(getfont2, "utf-8"));
    };
  if (!fs.existsSync(__dirname +
      `/tad/CaviarDreams.ttf`)) {
      let getfont3 = (await axios.get(`https://github.com/hanakuUwU/font/raw/main/CaviarDreams.ttf`, { responseType: "arraybuffer" })).data;
      fs.writeFileSync(__dirname + `/tad/CaviarDreams.ttf`, Buffer.from(getfont3, "utf-8"));
    };
   const { loadImage, createCanvas, registerFont } = require("canvas");
  
  let k = args[0];
   if(args[0] == "list"){
    const alime = (await axios.get('https://API-ThanhAli.thanhali.repl.co/taoanhdep/list')).data
    var count = alime.listAnime.length;
      var data = alime.listAnime
      var page = 1;
      page = parseInt(args[1]) || 1;
      page < -1 ? page = 1 : "";
      var limit = 20;
      var numPage = Math.ceil(count/limit);
      var msg = ``;
      for(var i = limit*(page - 1); i < limit*(page-1) + limit; i++){
         if(i >= count) break;
        msg += `[ ${i+1} ] - ${data[i].ID} | ${data[i].name}\n`;
      }
      msg += `Trang ( ${page}/${numPage} )\nDùng ${global.config.PREFIX}${this.config.name} list < số trang >`;
      return api.sendMessage(msg, event.threadID,event.messageID);
   }
  if(!k){
  var id = Math.floor(Math.random() * 883) +1
  } else {
    var id = k
  }
  const loz = ["https://i.imgur.com/ZrXf6ip.png"]
    const lengthchar = (await axios.get('https://API-ThanhAli.thanhali.repl.co/taoanhdep/data')).data
    console.log(lengthchar.length)
  const Canvas = require('canvas');
    let pathImg = __dirname + `/tad/avatar_1111231.png`;
    let pathAva = __dirname + `/tad/avatar_3dsc11.png`;
    let background = (await axios.get(encodeURI((loz[Math.floor(Math.random() * loz.length)])), { responseType: "arraybuffer" })).data;
    fs.writeFileSync(pathImg, Buffer.from(background, "utf-8"));
    let ava = (await axios.get(encodeURI(`${lengthchar[id - 1].imgAnime}`), { responseType: "arraybuffer" })).data;
    fs.writeFileSync(pathAva, Buffer.from(ava, "utf-8"));
    const request = require('request');
    const path = require('path');

  //const a = Math.floor(Math.random() * 820) + 1
  
  
let l1 = await loadImage(pathAva);
    let a = await loadImage(pathImg);
    let canvas = createCanvas(a.width, a.height);
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = lengthchar[id - 1].colorBg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.drawImage(a, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(l1, 620, -160, 960, 1000);
     registerFont(__dirname + `/tad/phenomicon.ttf`, {
      family: "phenomicon"
    });
    ctx.textAlign = "start";
    ctx.strokeStyle = lengthchar[id - 1].colorBg;
    ctx.filter = "brightness(90%) contrast(110%)";
    ctx.font = "90px phenomicon";
    ctx.fillStyle = lengthchar[id].colorBg;
    ctx.fillText("Nắng Mùa Thu", 200, 525);
    ctx.beginPath();
  ////////////////////////////////////////
   registerFont(__dirname + `/tad/UTM-Avo.ttf`, {
      family: "UTM"
    });
    ctx.textAlign = "start";
    ctx.font = "70px UTM";
    ctx.fillStyle = "#fdfdfd";
    ctx.fillText(`${z_1} : ${x_1} : ${y_1} `, 270, 612);
    ctx.restore();
    ctx.save();
registerFont(__dirname + `/tad/CaviarDreams.ttf`, {
      family: "time"
    });
    ctx.textAlign = "start";
    ctx.font = "45px time";
    //ctx.fillText("@" + "Lucky", 250, 515)
    //ctx.fillText("@" + "Nắng Mùa Thu", 250, 575)
   //ctx.fillText("@" + "DVFB.VietLe.pro", 405, 750)
    ctx.restore();
    ctx.save();
    ctx.beginPath();
    const imageBuffer = canvas.toBuffer();
   fs.writeFileSync(pathImg, imageBuffer);
  return api.sendMessage({
    body: `=== 𝗨𝗣𝗧𝗜𝗠𝗘 𝗥𝗢𝗕𝗢𝗧 ===\n\n→ Hiện tại Bot của 𝗡𝗮̆́𝗻𝗴 𝗠𝘂̀𝗮 𝗧𝗵𝘂 đã hoạt động được ${hours} giờ ${minutes} phút ${seconds} giây\n━━━━━━━━━━━━\n→ Mirai Project\n→ Tên Bot: ${global.config.BOTNAME}\n→ Dấu lệnh hệ thống: ${global.config.PREFIX}\n→ Tổng lệnh: ${commands.size}\n→ Tổng người dùng: ${global.data.allUserID.length}\n→ Tổng nhóm: ${global.data.allThreadID.length}\n→ CPU: ${pidusage.cpu.toFixed(1)}%\n→ RAM: ${byte2mb(pidusage.memory)}\n→ Độ trễ: ${Date.now() - timeStart}ms\n→ ID nhân vật: ${id}\n━━━━━━━━━━━━\n[ ${timeNow} ]`,
    attachment: fs.createReadStream(pathImg)
  },
    event.threadID,
    () => fs.unlinkSync(pathImg),
    fs.unlinkSync(pathAva),
    event.messageID
  );
}