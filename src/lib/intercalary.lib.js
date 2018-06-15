const {KALI_YUGA, LM, TA, TW, SY} = require('./const.lib.js');

const isWatatYear = mmYear => {
  let ed = (SY * (mmYear + KALI_YUGA)) % LM;

  ed < TA ? (ed += LM) : '';

  return ed >= TW;
};

module.exports = isWatatYear;
