module.exports.config = {
	name: "rankup",
	version: "1.0.1",
	hasPermssion: 1,
	credits: "Mirai Team",
	description: "Thông báo rankup cho từng nhóm, người dùng",
	commandCategory: "hệ thống",
	dependencies: {
		"fs-extra": ""
	},
	cooldowns: 2,
	envConfig: {
		autoUnsend: false,
		unsendMessageAfter: 1000000
	}
};

module.exports.handleEvent = async function({ api, event, Currencies, Users, getText }) {
	var {threadID, senderID } = event;
	const { createReadStream, existsSync, mkdirSync } = global.nodemodule["fs-extra"];

	threadID = String(threadID);
	senderID = String(senderID);

	const thread = global.data.threadData.get(threadID) || {};

	let exp = (await Currencies.getData(senderID)).exp;
	exp = exp += 1;

	if (isNaN(exp)) return;

	if (typeof thread["rankup"] != "undefined" && thread["rankup"] == false) {
		await Currencies.setData(senderID, { exp });
		return;
	};

	const curLevel = Math.floor((Math.sqrt(1 + (4 * exp / 3) + 1) / 2));
	const level = Math.floor((Math.sqrt(1 + (4 * (exp + 1) / 3) + 1) / 2));

	if (level > curLevel && level != 1) {
		const name = global.data.userName.get(senderID) || await Users.getNameUser(senderID);
		var messsage = (typeof thread.customRankup == "undefined") ? msg = getText("levelup") : msg = thread.customRankup,
			arrayContent;

		messsage = messsage
			.replace(/\{name}/g, name)
			.replace(/\{level}/g, level);
			
		if (existsSync(__dirname + "/cache/rankup/")) mkdirSync(__dirname + "/cache/rankup/", { recursive: true });
		if (existsSync(__dirname + `/cache/rankup/rankup.gif`)) arrayContent = { body: messsage, attachment: createReadStream(__dirname + `/cache/rankup/rankup.gif`), mentions: [{ tag: name, id: senderID }] };
		else arrayContent = { body: messsage, mentions: [{ tag: name, id: senderID }] };
		const moduleName = this.config.name;
		api.sendMessage(arrayContent, threadID, async function (error, info){
			if (global.configModule[moduleName].autoUnsend) {
				await new Promise(resolve => setTimeout(resolve, global.configModule[moduleName].unsendMessageAfter * 1000));
				return api.unsendMessage(info.messageID);
			} else return;
		});
	}

	await Currencies.setData(senderID, { exp });
	return;
}

module.exports.languages = {
	"vi": {
		"off": "𝙏𝙖̆́𝙩",
		"on": "𝘽𝙖̣̂𝙩",
		"successText": "𝙍𝙖𝙣𝙠𝙪𝙥✅",
		"levelup": "𝙉𝙖̆𝙣𝙜 𝙇𝙪̛̣𝙘 𝙏𝙪̛𝙤̛𝙣𝙜 𝙏𝙖́𝙘 𝘾𝙪̉𝙖 〘『{name} 』〙𝙇𝙚̂𝙣 𝙏𝙤̛́𝙞 𝘾𝙖̂́𝙥 {level}\n𝘾𝙤̂́ 𝙂𝙖̆́𝙣𝙜 𝙏𝙪̛𝙤̛𝙣𝙜 𝙏𝙖́𝙘 𝙉𝙝𝙞𝙚̂̀𝙪 𝙏𝙝𝙚̂𝙢 𝙉𝙪̛̃𝙖 𝙉𝙝𝙖☻"
	},
	"en": {
		"on": "on",
		"off": "off",
		"successText": "success notification rankup!",
		"levelup": "{name}, your keyboard hero level has reached level {level}",
	}
}

module.exports.run = async function({ api, event, Threads, getText }) {
	const { threadID, messageID } = event;
	let data = (await Threads.getData(threadID)).data;
	
	if (typeof data["rankup"] == "undefined" || data["rankup"] == false) data["rankup"] = true;
	else data["rankup"] = false;
	
	await Threads.setData(threadID, { data });
	global.data.threadData.set(threadID, data);
	return api.sendMessage(`${(data["rankup"] == true) ? getText("on") : getText("off")} ${getText("successText")}`, threadID, messageID);
                    }