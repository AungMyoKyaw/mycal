const {weekday} = require('./localization.lib.js');

/**
 * Myanmar Weekday
 *
 * @param {Date} gDate Gregorian Date
 * @returns {String} Burmese Weekday
 */

const MY_WEEKDAY = gDate => {
  return weekday[gDate.getDay()];
};

module.exports = MY_WEEKDAY;
