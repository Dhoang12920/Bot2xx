const axios = require('axios');
const fs = require('fs');

function streamURL(url, path) {
  var cb;
  var returnPromise = new Promise(function (resolve, reject) {
    cb = function (err, resData) {
      if (err) reject(err);
      resolve(resData);
    }
  });

  axios
    .get(url, {
      responseType: 'arraybuffer'
    })
    .then(function (res) {
      fs.writeFileSync(path, Buffer.from(res.data, 'utf-8'));
      cb(null, fs.createReadStream(path));
    })
    .catch(cb);
    
  return returnPromise;
}

class Heo {
  get config() {
    return {
      name: "info",
      version: "1.0.0",
      hasPermssion: 0,
      credits: "Sam",
      description: "view facebook user information",
      commandCategory: "info",
      usages: "[args]",
      cooldowns: 5
    }
  }
  async run({ api, event, args }) {
    const { type, messageReply, threadID, messageID, senderID, mentions } = event;
    const UserID = type == "message_reply" ? messageReply.senderID : Object.keys(mentions).length > 0 ? Object.keys(mentions)[0] : args.length > 0 ? args[0] : senderID;
    return axios
      .get('https://api-0703.0703-opa.repl.co/info?id=' + UserID)
      .then((res => res.data.Obj))
      .then(async function (res) {
        var { relationship_status, avatar, username, location, profileUrl, hometown, gender, birthday, id, name, love, website, very, follow, cover, email } = res;
        var pathAvt = __dirname + `/cache/${Date.now()}.jpg`;
        var pathCover = __dirname + `/cache/${Date.now()}_1.jpg`;
        try {
          var attachment = [
            await streamURL(avatar, pathAvt),
            await streamURL(cover, pathCover)
          ];

          return api.sendMessage({
            body: `=== 𝗜𝗡𝗙𝗢 𝗨𝗦𝗘𝗥 𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞 ===
━━━━━━━━━━━━━━━━━━\n[👤] Tên: ${name}\n[🍁] UserName: ${username}\n[🔎] UID: ${id}\n[👀] Follow: ${follow}\n[👭] Giới tính: ${gender}\n[🎂] Sinh Nhật: ${birthday}\n[💌] Mối quan hệ: ${relationship_status}\n[💞] Love name: ${love}\n[🏡] Sống tại: ${location}\n[🌏] Đến từ: ${hometown}\n[📌] URL cá nhân: ${profileUrl}\n[🌐] Web: ${website}\n[✅] Xác minh: ${very}\n[📧] Email: ${email}`,
            attachment
          }, threadID, () => {
            fs.unlinkSync(pathAvt);
            fs.unlinkSync(pathCover);
          },messageID);
        } catch (e) {
          console.log(e);
          return api.sendMessage('Cant get user information', threadID, messageID);
        }
      })
      .catch((e) => {
        console.log(e);
        return api.sendMessage('Cant get user information', threadID, messageID);
      });
  }
}

module.exports = new Heo();