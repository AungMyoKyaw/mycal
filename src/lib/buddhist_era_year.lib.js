const {number} = require('./localization.lib.js');

const buddhist_era_year = mmYear => {
  return number(mmYear + 1182);
};

module.exports = buddhist_era_year;
