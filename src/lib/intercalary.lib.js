const {
  KALI_YUGA,
  LM,
  firstEra,
  secondEra,
  thirdEra,
  SY
} = require('./const.lib.js');

const isWatatYear = mmYear => {
  let isWatatYear, era;
  let ed = (SY * (mmYear + KALI_YUGA)) % LM;

  switch (true) {
    case mmYear >= 1312: //third era
      era = 3;
      ed < thirdEra.TA ? (ed += LM) : '';
      isWatatYear = ed >= thirdEra.TW ? true : false;
      break;
    case mmYear >= 1217 && mmYear <= 1311: //second era
      era = 2;
      ed < secondEra.TA ? (ed += LM) : '';
      isWatatYear = ed >= secondEra.TW ? true : false;
      break;
    case mmYear <= 1216: //third era
      era = 1;
      ed < firstEra.TA ? (ed += LM) : '';
      isWatatYear = [2, 5, 7, 10, 13, 15, 18].includes((mmYear * 7 + 2) % 19);
      break;
  }

  return {
    era,
    ed,
    isWatatYear
  };
};

const nearestWatatYear = mmYear => {
  let isWatat = false;
  let watatInfo;
  mmYear--;

  do {
    watatInfo = isWatatYear(mmYear);
    isWatat = watatInfo.isWatatYear;
    isWatat ? mmYear : mmYear--;
  } while (!isWatat);

  Object.assign(watatInfo, {year: mmYear});

  return watatInfo;
};

const watat = mmYear => {
  let watatInfo = isWatatYear(mmYear);
  let nearestWatatInfo = nearestWatatYear(mmYear);
  Object.assign(watatInfo, {nearestWatatInfo});
  return watatInfo;
};

module.exports = watat;
