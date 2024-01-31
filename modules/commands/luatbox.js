module.exports.config = {
name: "luatbox",
version: "1.0.1",
hasPermssion: 1,
credits: "CatalizCS",
description: "Tùy biến luật cho từng group",
commandCategory: "Nhóm",
usages: "[add/remove/all] [content/ID]",
cooldowns: 5,
dependencies: {
        "fs-extra": "",
        "path": ""
    }
}

module.exports.onLoad = () => {
    const { existsSync, writeFileSync } = global.nodemodule["fs-extra"];
    const { join } = global.nodemodule["path"];
    const pathData = join(__dirname, "cache", "rules.json");
    if (!existsSync(pathData)) return writeFileSync(pathData, "[]", "utf-8");
}

module.exports.run = ({ event, api, args, permssion }) => {
    const { threadID, messageID } = event;
    const { readFileSync, writeFileSync } = global.nodemodule["fs-extra"];
    const { join } = global.nodemodule["path"];

    const pathData = join(__dirname, "cache", "rules.json");
    const content = (args.slice(1, args.length)).join(" ");
    var dataJson = JSON.parse(readFileSync(pathData, "utf-8"));
    var thisThread = dataJson.find(item => item.threadID == threadID) || { threadID, listRule: [] };

    switch (args[0]) {
        case "add": {
            if (permssion == 0) return api.sendMessage("⚡️Bạn không đủ quyền hạn để có thể sử dụng thêm luật!", threadID, messageID);
            if (content.length == 0) return api.sendMessage("⚡️Phần nhập thông tin không được để trống", threadID, messageID);
            if (content.indexOf("\n") != -1) {
                const contentSplit = content.split("\n");
                for (const item of contentSplit) thisThread.listRule.push(item);
            }
            else {
                thisThread.listRule.push(content);
            }
            writeFileSync(pathData, JSON.stringify(dataJson, null, 4), "utf-8");
            api.sendMessage('⚡️ Đã thêm luật mới cho nhóm thành công!', threadID, messageID);
            break;
        }
        case "list":
        case"all": {
            var msg = "", index = 0;
            for (const item of thisThread.listRule) msg += `${index+=1}/ ${item}\n`;
            if (msg.length == 0) return api.sendMessage("⚡️Nhóm của bạn hiện tại chưa có danh sách luật để hiển thị!", threadID, messageID);
            api.sendMessage(`=== Luật của nhóm ===\n\n${msg}`, threadID, messageID);
            break;
        }
        case "rm":
        case "remove":
        case "delete": {
            if (!isNaN(content) && content > 0) {
                if (permssion == 0) return api.sendMessage("⚡️Bạn không đủ quyền hạn để có thể sử dụng xóa luật!", threadID, messageID);
                if (thisThread.listRule.length == 0) return api.sendMessage("⚡️Nhóm của bạn chưa có danh sách luật để có thể xóa!", threadID, messageID);
                thisThread.listRule.splice(content - 1, 1);
                api.sendMessage(`⚡️Đã xóa thành công luật có số thứ tự thứ ${content}`, threadID, messageID);
                break;
            }
            else if (content == "all") {
                if (permssion == 0) return api.sendMessage("⚡️Bạn không đủ quyền hạn để có thể sử dụng xóa luật!", threadID, messageID);
                if (thisThread.listRule.length == 0) return api.sendMessage("⚡️Nhóm của bạn chưa có danh sách luật để có thể xóa!", threadID, messageID);
                thisThread.listRule = [];
                api.sendMessage(`⚡️Đã xóa thành công toàn bộ luật của nhóm!`, threadID, messageID);
                break;
            }
        }
        default: {
            if (thisThread.listRule.length != 0) {
                var msg = "", index = 0;
                for (const item of thisThread.listRule) msg += `${index+=1}/ ${item}\n`;
                return api.sendMessage(`=== Luật của nhóm ===\n\n${msg} \n[💟Hãy chấp hành đúng luật nhóm, nếu không sẽ được admin mời ra khỏi box😱`, threadID, messageID);
            }
            else return global.utils.throwError(this.config.name, threadID, messageID);
        }
    }

    if (!dataJson.some(item => item.threadID == threadID)) dataJson.push(thisThread);
    return writeFileSync(pathData, JSON.stringify(dataJson, null, 4), "utf-8");
} 