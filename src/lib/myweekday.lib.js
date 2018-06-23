const {weekday} = require('./localization.lib.js');

const myweekday = gDate => {
  return weekday[gDate.getDay()];
};

module.exports = myweekday;
