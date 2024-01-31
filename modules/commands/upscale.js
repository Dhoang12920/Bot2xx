module.exports.config = {
  name: 'upscale',
  version: '1.0.0',
  hasPermssion: 0,
  credits: 'Dũngkon',
  description: '',
  commandCategory: 'Edit-img',
  usages: 'reply',
  cooldowns: 5,
}
module.exports.run = async function ({
  api: _0x1be976,
  event: _0x54a367,
  args: _0x951812,
}) {
  const _0x32c010 = global.nodemodule['fs-extra'],
    _0xd2845b = require('axios')
  var _0x491129 =
    _0x54a367.messageReply.attachments[0].url || _0x951812.join(' ')
  if (!_0x491129) {
    return _0x1be976.sendMessage(
      'Vui lòng reply hoặc nhập link 1 hình ảnh!!!',
      _0x54a367.threadID,
      _0x54a367.messageID
    )
  }
  try {
    const _0x193ccf = await _0xd2845b.get(
        'https://apidungkonuser.dungkonuwu.repl.co/imgur?link=' +
          encodeURIComponent(_0x491129)
      ),
      _0x5de518 = _0x193ccf.data.uploaded.image
    var _0x68afc6 = (
      await _0xd2845b.get('https://web.duongkum999.tech/upscale?url=' + _0x5de518, {
        responseType: 'arraybuffer',
      })
    ).data
    return (
      _0x1be976.sendMessage('Đang làm nét....!', _0x54a367.threadID),
      _0x32c010.writeFileSync(
        __dirname + '/cache/upscale.png',
        Buffer.from(_0x68afc6, 'utf-8')
      ),
      _0x1be976.sendMessage(
        {
          body: 'Ảnh nét',
          attachment: _0x32c010.createReadStream(
            __dirname + '/cache/upscale.png'
          ),
        },
        _0x54a367.threadID,
        () => _0x32c010.unlinkSync(__dirname + '/cache/upscale.png'),
        _0x54a367.messageID
      )
    )
  } catch (_0x42218) {
    return _0x1be976.sendMessage(
      _0x42218,
      _0x54a367.threadID,
      _0x54a367.messageID
    )
  }
}
