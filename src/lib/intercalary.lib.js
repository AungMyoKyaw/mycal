const {KALI_YUGA, LM, secondEra, thirdEra, SY} = require('./const.lib.js');

const isWatatYear = mmYear => {
  let watatYear, era;
  let ed = (SY * (mmYear + KALI_YUGA)) % LM;

  switch (true) {
    case mmYear >= 1312: //third era
      era = 3;
      ed < thirdEra.TA ? (ed += LM) : '';
      watatYear = ed >= thirdEra.TW ? true : false;
      break;
    case mmYear >= 1217 && mmYear <= 1311: //second era
      era = 2;
      ed < secondEra.TA ? (ed += LM) : '';
      watatYear = ed >= secondEra.TW ? true : false;
      break;
    case mmYear <= 1216: //third era
      era = 1;
      break;
  }

  return {
    era,
    ed,
    watatYear
  };
};

module.exports = isWatatYear;
