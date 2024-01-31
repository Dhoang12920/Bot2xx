const axios = require("axios");
const fs = require('fs-extra');

module.exports.config = {
    name: "bingimage",
    version: "1.0",
    hasPermission: 0,
    credits: "SiAM | @SiamTheFox",
    description: "DALL-E 3 image generator",
    commandCategory: "Image",
    usages: "[prompt]",
    cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
    const prompt = encodeURIComponent(args.join(" "));

    // Add your cookies 

    const _U = "cdxcls=0&QS=0&TQS=0"; // _U value here
    const SRCHHPGUSR = "SRCHLANG=vi&PV=10.0.0&IG=627C68472A3040018338A4DEDFAA616E&BRW=XW&BRH=M&CW=1536&CH=738&SCW=1536&SCH=738&DPR=1.3&UTC=420&DM=0&HV=1697902464&WTS=63833499262"; // SRCHHPGUSR value here

    const apiURL = `https://dalle-3.siam-apiproject.repl.co/generate`;

    try {
        const processingMessage = await api.sendMessage("Your request is being processed...", event.threadID);

        const response = await axios.get(apiURL, {
            params: {
                prompt: prompt,
                bing_cookie: encodeURIComponent(_U),
                auth_cookie_SRCHHPGUSR: encodeURIComponent(SRCHHPGUSR)
            }
        });

        const data = response.data;

        if (!data.images || Object.keys(data.images).length === 0) {
            await api.sendMessage("The prompt has been Blocked by Bing. Please try again...", event.threadID);
            return;
        }

        if (data.images) {
            const imageKeys = Object.keys(data.images);
            const attachment = [];

            for (let i = 0; i < imageKeys.length; i++) {
                const imgURL = data.images[imageKeys[i]];
                const path = `./tmp/${i + 1}.jpg`;

                const imageResponse = await axios.get(imgURL, { responseType: 'arraybuffer' });
                fs.writeFileSync(path, Buffer.from(imageResponse.data, 'binary'));
                attachment.push(fs.createReadStream(path));
            }

            await api.sendMessage({
                body: "Here are the images for your prompt:",
                attachment: attachment,
            }, event.threadID);

            for (let i = 0; i < imageKeys.length; i++) {
                fs.unlinkSync(`./tmp/${i + 1}.jpg`);
            }

            await api.unsendMessage(processingMessage.messageID);
        } else {
            await api.sendMessage("API response format is incorrect 🐸", event.threadID);
        }
    } catch (error) {
        console.error(error);
        await api.sendMessage("An error occurred while processing your request.", event.threadID);
    }
};
