const fs = require('fs');
const request = require('request');

module.exports.config = {
    name: "noti",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "TruongMini",
    description: "",
    commandCategory: "Tiện ích",
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
                let response =  await request.get(eachAtm.url),
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
    const { threadID, messageID, senderID, body } = event;
    let name = await Users.getNameUser(senderID);
    switch (handleReply.type) {
        case "sendnoti": {
            let text = `Name: ${name}\nBox: ${(await Threads.getInfo(threadID)).threadName || "Unknow"}\nNội dung : ${body}`;
            if(event.attachments.length > 0) text = await getAtm(event.attachments, `Name: ${name}\nBox:  ${(await Threads.getInfo(threadID)).threadName || "Unknow"}\nNội dung : ${body}`);
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
            let text = `『 ${name} 』\n\n${body}\nreply tin nhắn này để báo về admin`;
            if(event.attachments.length > 0) text = await getAtm(event.attachments, `『 ${name} 』\n\n${body}\nreply tin nhắn này để báo về admin`);
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
    const { threadID, messageID, senderID, messageReply } = event;
    if (!args[0]) return api.sendMessage("Please input message", threadID);
    let allThread = global.data.allThreadID || [];
    let can = 0, canNot = 0;
    let text = `『 ${await Users.getNameUser(senderID)} 』\n\n${args.join(" ")}\nreply tin nhắn này để báo về admin`;
    if(event.type == "message_reply") text = await getAtm(messageReply.attachments, `『 ${await Users.getNameUser(senderID)} 』\n\nNội dung: ${args.join(" ")}\n reply tin nhắn này để báo về admin`);
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
    api.sendMessage(`Đã gửi ${can} box\nKhông thể gửi tới ${canNot} box`, threadID);
}