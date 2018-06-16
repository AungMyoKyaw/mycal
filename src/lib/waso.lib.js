const julian = require('julian');
const {SY, MO, LM, secondEra, thirdEra} = require('./const.lib.js');

const waso = (watatInfo, mmYear) => {
  let w;

  switch (watatInfo.era) {
    case 1:
      break;
    case 2:
      if (watatInfo.watatYear) {
        w = Math.round(
          SY * mmYear + MO - watatInfo.ed + 4.5 * LM + secondEra.WO
        );
      }
      break;
    case 3:
      if (watatInfo.watatYear) {
        w = Math.round(
          SY * mmYear + MO - watatInfo.ed + 4.5 * LM + thirdEra.WO
        );
      }
      break;
  }

  return julian.toDate(w).toLocaleDateString();
};

module.exports = waso;
