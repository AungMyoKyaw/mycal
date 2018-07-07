const julian = require('julian');
const {SY, MO} = require('./const.lib.js');
const {month} = require('./localization.lib.js');

/**
 * Myanmar Month
 *
 * @param {Date} gDate Gregorian Date
 * @param {Number} tg1 First Day of Tagu by Julian Day Number
 * @param {Number} c Is Watat Year
 * @param {Number} b Is Big Watat Year
 * @returns {Object} Myanmar Month
 */

const MY_MONTH = (gDate, tg1, c, b) => {
  let myanmarMonth;
  let jdn = Math.round(julian(gDate));

  let dd = jdn - tg1 + 1;

  let myl = 354 + 30 * (1 - c) + b;
  let mmt = Math.floor((dd - 1) / myl);

  if (mmt) {
    dd -= mmt * myl;
  }

  let a = Math.floor((dd + 423) / 512);

  let mm = Math.floor((dd - a * b + 30 * a * c + 29.26) / 29.544);

  let e = Math.floor((mm + 12) / 16);

  let f = Math.floor((mm + 11) / 16);

  let md = dd - Math.floor(29.544 * mm - 29.26) - b * e + 30 * c * f;

  mm += 3 * f - 4 * e;

  let mml = 30 - (mm % 2);

  if (mm == 3) {
    mml = mml + b;
  }

  myanmarMonth = month[mm - 1];

  if (!c && mm == 4) {
    //watat year
    //second waso
    myanmarMonth = month[3][2];
  }

  if (!c && mm == 0) {
    //watat year
    //first waso
    myanmarMonth = month[3][1];
  }

  if (c && mm == 4) {
    //waso
    myanmarMonth = month[3][0];
  }

  return {
    mm: myanmarMonth,
    mml, //length of myanmar month
    md //myanmar day
  };
};

module.exports = MY_MONTH;
