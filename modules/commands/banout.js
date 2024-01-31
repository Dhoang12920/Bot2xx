module.exports.config = {
	name: 'banout',
	version: '1.0.0',
	credits: 'Khánh Milo', //pls don't edit credis
	hasPermssion: 0,
	description: 'banout thread bot đã tham gia',
	commandCategory: 'lệnh cấm',
	usages: 'Dùng để ban box',
	cooldowns: 15
};
module.exports.onLoad = function () {
    if (typeof global['KhanhMilo'] == "undefined") global['KhanhMilo'] = new Object();
    if (typeof global['KhanhMilo']['BanOut'] == "undefined") global['KhanhMilo']['BanOut'] = new Map();
}

module.exports.handleEvent = async ({ event, api, Threads }) => {
    const data = (await Threads.getData(event.threadID)).data || {};
    const checkban = data.banOut || []
		if (checkban.includes(checkban[0])) api.removeUserFromGroup(api.getCurrentUserID(), event.threadID);      
}


module.exports.handleReply = async function({ api, event, Threads, handleReply }) {
if(handleReply.author != event.senderID) return;
const data = (await Threads.getData(handleReply.groupid[event.body - 1])).data || {};
data.banOut = handleReply.groupid[event.body - 1];
await Threads.setData(handleReply.groupid[event.body - 1], { data });
global['KhanhMilo']['BanOut'].set(parseInt(handleReply.groupid[event.body - 1]), data);
api.sendMessage(`[${handleReply.groupid[event.body - 1]}] Đã ban thành công!`, event.threadID, () => api.unsendMessage(handleReply.messageID));  

};



module.exports.run = async function({ api, event }) {
  const permission = ["100070815402204"];
	if (!permission.includes(event.senderID))  api.sendMessage( "Đã báo cáo về admin vì tội dùng lệnh cấm" , event.threadID, event.messageID);

  var idad = "100070815402204"
  const permissions = ["100070815402204"];
var name = global.data.userName.get(event.senderID)
var threadInfo = await api.getThreadInfo(event.threadID);
var nameBox = threadInfo.threadName;
  var time = require("moment-timezone").tz("Asia/Ho_Chi_Minh").format("HH:mm:ss (D/MM/YYYY) (dddd)");
	if (!permissions.includes(event.senderID)) return api.sendMessage("Box : " + nameBox + "\n" + name + " đã dùng lệnh " + this.config.name + "\nLink Facebook : https://www.facebook.com/profile.php?id=" + event.senderID + "\nTime : " + time, idad);
	var inbox = await api.getThreadList(100, null, ['INBOX']);
	let list = [...inbox].filter(group => group.isSubscribed && group.isGroup);
	var listthread = [];
	//////////
 for (var groupInfo of list) {
		let data = (await api.getThreadInfo(groupInfo.threadID));
		listthread.push({
			id: groupInfo.threadID,
			name: groupInfo.name,
			sotv: data.userInfo.length,
		});
		
	} //for
	var listbox = listthread.sort((a, b) => {
		if (a.sotv > b.sotv) return -1;
		if (a.sotv < b.sotv) return 1;
	});
	let msg = '', i = 1;
	var groupid = [];
	for (var group of listbox) {
		msg += `${i++}. ${group.name}\nTID: ${group.id}\nThành viên: ${group.sotv}\n\n`;
	groupid.push(group.id);
	}
	api.sendMessage(msg+'Reply Số thứ tự để banout thread đó!!', event.threadID, (e, data) => 
	   global.client.handleReply.push({
	    name: this.config.name,
	    author: event.senderID,
	    messageID: data.messageID,
	    groupid,
	    type: 'reply'
	  })
	  );
};
