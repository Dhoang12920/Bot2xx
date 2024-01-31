const fs = require('fs');
const request = require('request');

module.exports.config = {
    name: "send",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "TruongMini, mod by NHHB",
    description: "",
    commandCategory: "lệnh cấm",
    usages: "[msg]",
    cooldowns: 5,
}

let atmDir = [];

const getAtm = (atm, body) => new Promise(async (resolve) => {
    let msg = {}, attachment = [];
    msg.body = body;
    for(let eachAtm of atm) {
        await new Promise(async (resolve) => {
            try {
                let response =  await request.get(eachAtm.url),
                    pathName = response.uri.pathname,
                    ext = pathName.substring(pathName.lastIndexOf(".") + 1),
                    path = __dirname + `/cache/${eachAtm.filename}.${ext}`
                response
                    .pipe(fs.createWriteStream(path))
                    .on("close", () => {
                        attachment.push(fs.createReadStream(path));
                        atmDir.push(path);
                        resolve();
                    })
            } catch(e) { console.log(e); }
        })
    }
    msg.attachment = attachment;
    resolve(msg);
})

module.exports.handleReply = async function ({ api, event, handleReply, Users, Threads }) {
    const moment = require("moment-timezone");
      var gio = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY - HH:mm:s");
    const { threadID, messageID, senderID, body } = event;
    let name = await Users.getNameUser(senderID);
    switch (handleReply.type) {
        case "sendnoti": {
            let text = `༺ [ 𝙁𝙀𝙀𝘿𝘽𝘼𝘾𝙆 𝙁𝙍𝙊𝙈 𝙐𝙎𝙀𝙍𝙎 ] ༻ \n〘 👤 〙--- 𝙁𝙧𝙤𝙢 : ${name} \n〘 💬 〙--- 𝘾𝙤𝙣𝙩𝙚𝙣𝙩 : ${body} \n〘 ⏳ 〙--- 𝙏𝙞𝙢𝙚 : ${gio} \n〘 🏠 〙--- 𝘽𝙤𝙭 : ${(await Threads.getInfo(threadID)).threadName || "Unknow"}`;
            if(event.attachments.length > 0) text = await getAtm(event.attachments, `༺ [ 𝙁𝙀𝙀𝘿𝘽𝘼𝘾𝙆 𝙁𝙍𝙊𝙈 𝙐𝙎𝙀𝙍𝙎 ] ༻ \n〘 👤 〙--- 𝙁𝙧𝙤𝙢 : ${name} \n〘 💬 〙--- 𝘾𝙤𝙣𝙩𝙚𝙣𝙩 : ${body} \n〘 ⏳ 〙--- 𝙏𝙞𝙢𝙚 : ${gio} \n〘 🏠 〙--- 𝘽𝙤𝙭 : ${(await Threads.getInfo(threadID)).threadName || "Unknow"}`);
            api.sendMessage(text, handleReply.threadID, (err, info) => {
                atmDir.forEach(each => fs.unlinkSync(each))
                atmDir = [];
                global.client.handleReply.push({
                    name: this.config.name,
                    type: "reply",
                    messageID: info.messageID,
                    messID: messageID,
                    threadID
                })
            });
            break;
        }
        case "reply": {
            let text = `༺ [ 𝙁𝙀𝙀𝘿𝘽𝘼𝘾𝙆 𝙁𝙍𝙊𝙈 𝘼𝘿𝙈𝙄𝙉 ] ༻ \n〘 🤖 〙--- 𝙁𝙧𝙤𝙢 : ${name} \n〘 💬 〙--- 𝘾𝙤𝙣𝙩𝙚𝙣𝙩 : ${body} \n〘 ⏳ 〙--- 𝙏𝙞𝙢𝙚 : ${gio} \n〘 ✍ 〙--- 𝙍𝙚𝙥𝙡𝙮 𝙩𝙤 𝙖𝙙𝙢𝙞𝙣 𝙛𝙚𝙚𝙙𝙗𝙖𝙘𝙠`;
            if(event.attachments.length > 0) text = await getAtm(event.attachments, `༺ [ 𝙁𝙀𝙀𝘿𝘽𝘼𝘾𝙆 𝙁𝙍𝙊𝙈 𝘼𝘿𝙈𝙄𝙉 ] ༻ \n〘 🤖 〙--- 𝙁𝙧𝙤𝙢 : ${name} \n〘 💬 〙--- 𝘾𝙤𝙣𝙩𝙚𝙣𝙩 : ${body} \n〘 ⏳ 〙--- 𝙏𝙞𝙢𝙚 : ${gio} \n〘 ✍ 〙--- 𝙍𝙚𝙥𝙡𝙮 𝙩𝙤 𝙖𝙙𝙢𝙞𝙣 𝙛𝙚𝙚𝙙𝙗𝙖𝙘𝙠`);
            api.sendMessage(text, handleReply.threadID, (err, info) => {
                atmDir.forEach(each => fs.unlinkSync(each))
                atmDir = [];
                global.client.handleReply.push({
                    name: this.config.name,
                    type: "sendnoti",
                    messageID: info.messageID,
                    threadID
                })
            }, handleReply.messID);
            break;
        }
    }
}

module.exports.run = async function ({ api, event, args, Users }) {
const permission = ["100037211391552"];
if (!permission.includes(event.senderID))  api.sendMessage( "???" , event.threadID, event.messageID);

  var idad = "100037211391552"
  const permissions = ["100037211391552"];
var name = global.data.userName.get(event.senderID)
if (!permissions.includes(event.senderID)) return api.sendMessage(name + " đã dùng lệnh " + this.config.name, idad);
    const moment = require("moment-timezone");
      var gio = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY - HH:mm:s");
    const { threadID, messageID, senderID, messageReply } = event;
    if (!args[0]) return api.sendMessage("Please input message", threadID);
    let allThread = global.data.allThreadID || [];
    let can = 0, canNot = 0;
    let text = `༺ [ 𝙉𝙊𝙏𝙄𝘾𝙀 𝙁𝙍𝙊𝙈 𝘼𝘿𝙈𝙄𝙉 ] ༻\n〘 🤖 〙--- 𝙁𝙧𝙤𝙢 : ${await Users.getNameUser(senderID)} \n〘 💬 〙--- 𝘾𝙤𝙣𝙩𝙚𝙣𝙩 : ${args.join(" ")} \n〘 ⏳ 〙--- 𝙏𝙞𝙢𝙚 : ${gio} \n〘 ✍️ 〙--- 𝙍𝙚𝙥𝙡𝙮 𝙩𝙤 𝙖𝙙𝙢𝙞𝙣 𝙛𝙚𝙚𝙙𝙗𝙖𝙘𝙠`;
    if(event.type == "message_reply") text = await getAtm(messageReply.attachments, `༺ [ 𝙉𝙊𝙏𝙄𝘾𝙀 𝙁𝙍𝙊𝙈 𝘼𝘿𝙈𝙄𝙉 ] ༻\n〘 🤖 〙--- 𝙁𝙧𝙤𝙢 : ${await Users.getNameUser(senderID)} \n〘 💬 〙--- 𝘾𝙤𝙣𝙩𝙚𝙣𝙩 : ${args.join(" ")} \n〘 ⏳ 〙--- 𝙏𝙞𝙢𝙚 : ${gio} \n〘 ✍️ 〙--- 𝙍𝙚𝙥𝙡𝙮 𝙩𝙤 𝙖𝙙𝙢𝙞𝙣 𝙛𝙚𝙚𝙙𝙗𝙖𝙘𝙠`);
    await new Promise(resolve => {
        allThread.forEach((each) => {
            try {
                api.sendMessage(text, each, (err, info) => {
                    if(err) { canNot++; }
                    else {
                        can++;
                        atmDir.forEach(each => fs.unlinkSync(each))
                        atmDir = [];
                        global.client.handleReply.push({
                            name: this.config.name,
                            type: "sendnoti",
                            messageID: info.messageID,
                            messID: messageID,
                            threadID
                        })
                        resolve();
                    }
                })
            } catch(e) { console.log(e) }
        })
    })
    api.sendMessage(`Send ${can} , not send ${canNot}`, threadID);
}

