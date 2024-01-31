module['exports']['config'] = {
    name: 'thính',
    versioversionn: '2.0.0',
    hasPermssion: 0,
    credits: 'Thanh Xu\xE2n, L\xEA \u0110\u1ECBnh',
    description: 'Th\xEDnh',
    commandCategory: 'other',
    usages: 'thathinh',
    cooldowns: 5
}, module['exports']['run'] = async ({
    api: a,
    event: e
}) => {
    const _0x2f9fx1 = require('axios'),
        _0x2f9fx2 = require('request'),
        _0x2f9fx3 = require('fs-extra'),
        _0x2f9fx4 = (await _0x2f9fx1['get']('https://raw.githubusercontent.com/ledingg1997/ledingg-/main/datathinh.json'))['data']['data'],
        _0x2f9fx5 = Object['values'](_0x2f9fx4),
        _0x2f9fx6 = _0x2f9fx5[Math['floor'](Math['random']() * _0x2f9fx5['length'])],
        _0x2f9fx7 = await _0x2f9fx1['get']('https://apikanna.change-itit.repl.co');
    var _0x2f9fx8 = _0x2f9fx7['data']['data']['substring'](_0x2f9fx7['data']['data']['lastIndexOf']('.') + 1);
    _0x2f9fx2(_0x2f9fx7['data']['data'])['pipe'](_0x2f9fx3['createWriteStream'](__dirname + `${'/cache/thathinh.'}${_0x2f9fx8}${''}`))['on']('close', (function() {
        a['sendMessage']({
            body: `${'[ /𝙢𝙚𝙣𝙪 , /𝙝𝙚𝙡𝙥 , /𝙢𝙚𝙣𝙪 𝙖𝙡𝙡 ]  ! \n➢T̸h̸í̸n̸h̸: '}${_0x2f9fx6}${' '}`,
            attachment: _0x2f9fx3['createReadStream'](__dirname + `${'/cache/thathinh.'}${_0x2f9fx8}${''}`)
        }, e['threadID'], (() => {
            return _0x2f9fx3['unlinkSync'](__dirname + `${'/cache/thathinh.'}${_0x2f9fx8}${''}`)
        }), e['messageID'])
    }))
      }