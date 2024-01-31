const axios = require("axios");
module.exports.config = {
    name: "veanime",
    version: "1.0.0",
    hasPermssion: 0,
    credits: 'Dũngkon',
    description: "",
    commandCategory: "Tiện ích",
    usages: "",
    cooldowns: 0,
'image-downloader': '',
        'tslib': '',
        'imgur': '',
        'request': '',
        'axios': ''

    }
const {ImgurClient} = require('imgur');
const {image} = require('image-downloader');
const {createReadStream, unlinkSync} = require('fs-extra')
const {get} = require('request');
module.exports.run = async function ({ api, event, args, Users, Currencies, Threads }) {
    if(this.config.credits !== 'Dũngkon') return api.sendMessage('Đã bảo đừng thay credits rồi mà không nghe, thay lại credits ngay không là đéo dùng được đâu nha', event.threadID, event.messageID);
  try {
      let axiso = require("axios")
let fs = require("fs-extra")
    let path = __dirname + "/cache/meitu.png"
let link = await global.nodemodule["tinyurl"].shorten( event.messageReply.attachments[0].url || args.join(" "));
    if (!args[0]) {
        api.sendMessage("Đang tiến hành vẽ ....!", event.threadID)
let dungkon = await axios.get(`https://duongkum999.codes/meitutat/image-v2?url=${link}`)
  await global.utils.downloadFile(dungkon.data.image, path)
      var dung = `Ảnh anime của bạn đây`
   api.sendMessage({body: dung, attachment: fs.createReadStream(path)}, event.threadID, event.messageID)
  } 
  } catch(e) {
    console.log(e)
      api.sendMessage("Đã xảy ra lỗi, vui lòng thử lại", event.threadID)
  }
  }