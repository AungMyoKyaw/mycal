const julian = require('julian');
const {SY, MO} = require('./const.lib.js');

const myMonth = (gDate, tg1, c, b) => {
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

  let md = Math.floor(dd - (29.544 * mm - 29.26) - b * e + 30 * c * f);

  mm += 3 * f - 4 * e;

  let mml = 30 - (mm % 2);

  if (mm == 3) {
    mml = mml + b;
  }
  // let mmyear = Math.floor((jd - 0.5 - MO) / SY);

  return {mm, mml, md};
  // return true;
};

module.exports = myMonth;
