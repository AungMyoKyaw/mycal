const julian = require('julian');
const { SY, MO } = require('./const.lib.js');
const { number } = require('./localization.lib.js');

/**
 * Myanmar Year
 *
 * @param {Date} gDate Gregorian Date
 * @returns {Number} Myanmar Year
 */

const MM_YEAR = gDate => {
  let jd = Math.round(julian(gDate));

  let mmyear = Math.floor((jd - 0.5 - MO) / SY);

  return number(mmyear);
};

module.exports = MM_YEAR;
