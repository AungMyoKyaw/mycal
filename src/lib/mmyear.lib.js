const julian = require('julian');
const {SY, MO} = require('./const.lib.js');

const mmyear = gDate => {
  let jd = Math.round(julian(gDate));

  let mmyear = Math.floor((jd - 0.5 - MO) / SY);

  return mmyear;
};

module.exports = mmyear;
