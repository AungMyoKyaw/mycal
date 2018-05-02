const julian = require('julian');

const mmyear = gDate => {
  let SY = 1577917828 / 4320000; //solar year
  let MO = 1954168.0506; //myanmar year zero
  let jd = julian(gDate);

  let mmyear = Math.floor((jd - 0.5 - MO) / SY);

  return mmyear;
};

module.exports = mmyear;
