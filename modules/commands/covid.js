module.exports.config = {
  name: "covid",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Thiệu Trung Kiên",
  description: "Xem thông tin covid19",
  commandCategory: "tiện ích",
  usages: "[Tên quốc gia]",
  cooldowns: 5
};

module.exports.run = async (
{
  api,
  event,
  args
}) =>
{
  const axios = require('axios');
  const request = require('request');
  const fs = require("fs");
  var tip = args.join(" ");
  if (!tip) return api.sendMessage(`𝗡𝗵𝗮̣̂𝗽 𝘁𝗲̂𝗻 𝗾𝘂𝗼̂́𝗰 𝗴𝗶𝗮`, event.threadID, event.messageID);
  else
  {
    axios.get(`https://disease.sh/v3/covid-19/countries/${encodeURIComponent(tip)}`).then(res =>
    {
      let nhiem = res.data.cases,
        chet = res.data.deaths,
        dieutri = res.data.recovered,
         nghiemtrong = res.data.critical,
        tests = res.data.tests,
        todayCases = res.data.todayCases,
        danso = res.data.population,
        chauluc = res.data.continent,
        quocgia = res.data.country
      var flag = res.data.countryInfo.flag;
      let callback = function ()
      {
        api.sendMessage(
        {
          body: `🌎 𝗤𝘂𝗼̂́𝗰 𝗚𝗶𝗮: ${quocgia}\n🏃 Đ𝗮̃ 𝗸𝗶𝗲̂́𝗺 𝘁𝗿𝗮 𝗰𝗼𝘃𝗶𝗱: ${tests}\n🦠 𝗡𝗵𝗶𝗲̂̃𝗺: ${nhiem}\n🧬 𝗡𝗴𝗵𝗶𝗲̂𝗺 𝘁𝗿𝗼̣𝗻𝗴: ${nghiemtrong}\n☠️ 𝗧𝘂̛̉ 𝘃𝗼𝗻𝗴: ${chet} \n💉 Đ𝗶𝗲̂̀𝘂 𝘁𝗿𝗶̣: ${dieutri}\n❤️ 𝗦𝗼̂́ 𝗰𝗮 𝗻𝗵𝗶𝗲̂̃𝗺 𝗵𝗼̂𝗺 𝗻𝗮𝘆: ${todayCases}\n👤 𝗗𝗮̂𝗻 𝘀𝗼̂́: ${danso}\n🗺️ 𝗖𝗵𝗮̂𝘂 𝗹𝘂̣𝗰: ${chauluc}\n`,
          attachment: fs.createReadStream(__dirname + `/cache/covidtk.png`)
        }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/covidtk.png`), event.messageID);
      };
      request(encodeURI(flag)).pipe(fs.createWriteStream(__dirname + `/cache/covidtk.png`)).on("close", callback);
    })
  }
}