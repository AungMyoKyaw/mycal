const {number} = require('./localization.lib.js');

/**
 * Buddhist Era Year
 *
 * @param {Number} mmYear Myanmar Year
 * @returns {Number} Buddhist Era Year
 */

const BUDDHIST_ERA_YEAR = mmYear => {
  return number(mmYear + 1182);
};

module.exports = BUDDHIST_ERA_YEAR;
