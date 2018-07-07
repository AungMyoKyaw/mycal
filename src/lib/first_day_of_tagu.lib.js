const julian = require('julian');

/**
 * First Day of Tagu
 *
 * @param {Number} w1 Juliadn Day Number of Nearest Waso
 * @param {Number} yd Difference b/t Current Year and Nearest Watat Year
 * @returns {Object} First Day of Tagu
 */

const FIRST_DAY_OF_TAGU = (w1, yd) => {
  let tg1 = w1 + 354 * yd - 102;
  return {
    jd: tg1, //julidan day
    gd: julian.toDate(tg1).toLocaleDateString('en-US') //gregorian day
  };
};

module.exports = FIRST_DAY_OF_TAGU;
