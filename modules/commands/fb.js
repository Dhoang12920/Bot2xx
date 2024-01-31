const axios = require("axios");
const fs = require("fs-extra");
const request = require("request");
module.exports.config = {
  name: "fb",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Lê Minh Tiến🐧", //mod
  description: "Thông tin từ nền tảng Facebook",
  commandCategory: "tiện ích",
  usages: "",
  cooldowns: 5,
};
module.exports.run = async ({ event, api, Threads, Users, args }) => {
  const minhtien = (await axios.get(`https://i.imgur.com/BVbc1BI.jpg`, { responseType: "stream"})).data
  if (!args[0]) return api.sendMessage({body:`=====『 𝐇𝐔̛𝐎̛́𝐍𝐆 𝐃𝐀̂̃𝐍 𝐒𝐔̛̉ 𝐃𝐔̣𝐍𝐆 』=====
 \n━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n- fb info < UID >: Xem thông tin người dùng\n\n- fb search < NAME >: tìm kiếm người dùng\n\n- fb video < LINK >: tải video facebook\n\n- fb 2fa < CODE >: lấy 2fa cho bạn (lưu ý mã 2fa ko đc có dấu cách)\n\n- fb post < LINK >: thông tin bài viết\n\n- fb finduid < LINK >: lấy uid người dùng\n\n`, attachment: (minhtien)},event.threadID,event.messageID);
const { threadID, messageID, senderID } = event;
  const type = args[0];
  switch (type.toLowerCase()) {
    case "-i":
    case "info":
      api.sendMessage("có", threadID);
      break
    case "-s":
    case "search":
      api.sendMessage("cái", threadID);
    break
    case "2fa":
    case "get2fa":
      api.sendMessage("đầu", threadID);
      break;
    case "-v":
    case "video":
      api.sendMessage("buồi", threadID);
      break;
      case "-f":
    case "finduid":
      api.sendMessage("cc", threadID);
      break;
      case "-p":
      case "post":
     api.sendMessage("đb", threadID);
    break;
//////////////////////////////////////
  }
}
//////////END//////////