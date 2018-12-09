const julian = require('julian');
const { SY, MO, LM, firstEra, secondEra, thirdEra } = require('./const.lib.js');

/**
 * Full Moon Day of Waso
 *
 * @param {Object} watatInfo WatatInfo
 * @param {Number} mmYear Myanmar Year
 * @returns {Object}
 */

const WASO = (watatInfo, mmYear) => {
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

  return {
    jd: w, //julian day
    gd: julian.toDate(w).toLocaleDateString('en-US') //gregorian date
  };
};

module.exports = WASO;
