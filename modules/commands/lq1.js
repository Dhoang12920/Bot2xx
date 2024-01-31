module.exports.config = {
    name: 'lq1',
    credits: 'DungUwU',
    hasPermssion: 0,
    description: 'tạo ảnhツ',
    usages: '',
    commandCategory: 'liên quân mobile',
    cooldowns: 5,
    dependencies: {
        'axios': ' ',
        'fs': ' ',
    },
    envConfig: {
        fb_token: '6628568379%7Cc1e620fa708a1d5696fb991c1bde5662',
    }
}

//Base API
const lqAPI = 'https://api-tdungg1.minhnguyen200.repl.co/aov';

//Some Object....
const skinRarities = [
    'S',
    'S Hữu Hạn',
    'S+',
    'S+ Hữu Hạn',
    'SS',
    'SS Hữu Hạn',
    'SS Tuyệt Sắc',
    'SSS Hữu Hạn',
    'Siêu Việt',
];

const spells = [
    "Cấm Trụ",
    "Tốc Hành",
    "Tốc Biến",
    "Thanh Tẩy",
    "Gầm Thét",
    "Trừng Trị",
    "Cấp Cứu",
    "Ngất Ngư",
    "Suy Nhược",
    "Bộc Phá"
];

module.exports.handleReply = async ({ api, event, handleReply }) => {
    const { threadID, messageID, senderID } = event;
    if (handleReply.author != senderID) return;

    const input = event.body.trim().replace(/\s\s+/g, '');
    if (input.length == 0) return api.sendMessage('Reply của bạn không hợp lệ!', threadID, messageID);

    var { content } = handleReply;
    var msg;

    switch (handleReply.step) {
        case 1:
            content.name = input;
            api.unsendMessage(handleReply.messageID);
            msg = 'Vui lòng reply tin nhắn này tên tướng!';
            break;
        case 2:
            content.hero = input;
            api.unsendMessage(handleReply.messageID);
            msg = 'Vui lòng reply tin nhắn này bậc skin bạn theo số!\n' + skinRarities.map((x, i) => `${i + 1}. ${x}`).join('\n');
            break;
        case 3:
            if (input.match(/^([1-9])$/)) {
                content.skinRarity = skinRarities[input - 1];
                api.unsendMessage(handleReply.messageID);
                msg = 'Vui lòng reply tên skin!';
            } else {
                return api.sendMessage('Bạn phải nhập số từ 1 đến 9!', threadID, messageID);
            }
            break;
        case 4:
            content.skinName = input;
            api.unsendMessage(handleReply.messageID);
            msg = 'Vui lòng reply tin nhắn này phép bổ trợ theo số!\n' + spells.map((x, i) => `${i + 1}. ${x}`).join('\n');
            break;
        case 5:
            if (input.match(/^([1-9]||10)$/)) {
                content.spell = spells[input - 1];
                api.unsendMessage(handleReply.messageID);
                msg = 'Đang khởi tạo, đợi chút :3';
            } else {
                return api.sendMessage('Bạn phải nhập số từ 1 đến 9!', threadID, messageID);
            }
            break;
        default:
            return;
    }
    
    if (handleReply.step == 5) {
        api.sendMessage(msg, threadID, messageID);
        try {
            const axios = global.nodemodule['axios'];
            const fs = global.nodemodule['fs'];
            const { name, hero, skinRarity, skinName, spell, image } = content;
            const imagePath = __dirname + '/cache/' + Date.now() + '.png';

            const { data } = await axios.get(encodeURI(`${lqAPI}?name=${name}&heroName=${hero}&skinRarity=`) + encodeURIComponent(skinRarity) + encodeURI(`&skinName=${skinName}&spell=${spell}&skinImage=`) + (encodeURIComponent(image)), {
                responseType: 'arraybuffer'
            });
            fs.writeFileSync(imagePath, Buffer.from(data, 'utf-8'));
            
            api.sendMessage({
                attachment: fs.createReadStream(imagePath),
            }, threadID, () => fs.unlinkSync(imagePath), messageID);
        } catch (e) {
            console.log(e);
            return api.sendMessage('Có lỗi xảy ra, vui lòng thử lại sau!', threadID, messageID);
        }
    } else {
        api.sendMessage(msg, threadID, (err, info) => {
            global.client.handleReply.push({
                step: handleReply.step + 1,
                name: this.config.name,
                messageID: info.messageID,
                content,
                author: senderID
            });
        }, messageID);
    }
    return;
}

module.exports.run = async ({ api, event, args }) => {
    const { threadID, messageID, senderID } = event;
    const axios = global.nodemodule['axios'];
    var image = args.join(' ');
    if (!image && event.type == 'message_reply') {
        if (!event.messageReply.attachments || event.messageReply.attachments.length == 0)
            return api.sendMessage('Bạn cần phải reply một ảnh', threadID);
        if (event.messageReply.attachments.length > 1)
            return api.sendMessage('Vui lòng chỉ reply một ảnh!', threadID, messageID);
        if (event.messageReply.attachments[0].type != 'photo')
            return api.sendMessage('Vui lòng chỉ reply ảnh!', threadID, messageID);

        image = event.messageReply.attachments[0].url;
    } else if (!image) {
        image = `https://graph.facebook.com/${senderID}/picture?width=512&height=512&access_token=${global.configModule[this.config.name].fb_token}`;
    } else {
        if (image.indexOf('http') == -1) {
            image = 'https://' + image;
        }
    }

    return api.sendMessage('Vui lòng reply tin nhắn này tên của bạn!', threadID, (err, info) => {
        global.client.handleReply.push({
            step: 1,
            name: this.config.name,
            messageID: info.messageID,
            content: { image },
            author: senderID
        })
    }, messageID);
}