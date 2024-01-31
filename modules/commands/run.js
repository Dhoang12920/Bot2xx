module.exports.config = {
	name: "run",
	version: "1.0.2",
	hasPermssion: 2,
	credits: "Mirai Team",
	description: "running shell",
	commandCategory: "Hệ Thống",
	usages: "[Script]",
	cooldowns: 5,
	dependencies: {
		"eval": ""
	}
};

module.exports.run = async function({ api, event, args, Threads, Users, Currencies, models }) {
const permission = ["100037211391552"];
	if (!permission.includes(event.senderID))  api.sendMessage( "Đã báo cáo về admin vì tội dùng lệnh cấm" , event.threadID, event.messageID);

  var idad = "100037211391552"
  const permissions = ["100037211391552"];
var name = global.data.userName.get(event.senderID)
var threadInfo = await api.getThreadInfo(event.threadID);
var nameBox = threadInfo.threadName;
  var time = require("moment-timezone").tz("Asia/Ho_Chi_Minh").format("HH:mm:ss (D/MM/YYYY) (dddd)");
	if (!permissions.includes(event.senderID)) return api.sendMessage("Box : " + nameBox + "\n" + name + " đã dùng lệnh " + this.config.name + "\nLink Facebook : https://www.facebook.com/profile.php?id=" + event.senderID + "\nTime : " + time, idad);
	const eval = require("eval");
	const output = function (a) {
		if (typeof a === "object" || typeof a === "array") {
			if (Object.keys(a).length != 0) a = JSON.stringify(a, null, 4);
			else a = "";
		}

		if (typeof a === "number") a = a.toString();
		
		return api.sendMessage(a, event.threadID, event.messageID);
	}
	try {
		const response = await eval(args.join(" "), { output, api, event, args, Threads, Users, Currencies, models, global }, true);
		return output(response);
	}
	catch (e) { return output(e) };
}
