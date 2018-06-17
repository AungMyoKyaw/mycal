const julian = require('julian');
const {SY, MO, LM, firstEra, secondEra, thirdEra} = require('./const.lib.js');

const waso = (watatInfo, mmYear) => {
  let w, WO;

  switch (true) {
    case mmYear < 1100:
      WO = firstEra.WO1;
      break;

    case mmYear >= 1100:
      WO = firstEra.WO2;
      break;
  }

  switch (watatInfo.era) {
    case 1:
      if (watatInfo.isWatatYear) {
        w = Math.round(SY * mmYear + MO - watatInfo.ed + 4.5 * LM + WO);
      }
      break;
    case 2:
      WO = secondEra.WO;
      if (watatInfo.isWatatYear) {
        w = Math.round(SY * mmYear + MO - watatInfo.ed + 4.5 * LM + WO);
      }
      break;
    case 3:
      WO = thirdEra.WO;
      if (watatInfo.isWatatYear) {
        w = Math.round(SY * mmYear + MO - watatInfo.ed + 4.5 * LM + WO);
      }
      break;
  }

  return julian.toDate(w).toLocaleDateString();
};

module.exports = waso;
