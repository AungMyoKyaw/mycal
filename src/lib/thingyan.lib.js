const julian = require('julian');
const {SY, MO, SE3} = require('./const.lib.js');

/**
 * Thingyan
 *
 * @param {Number} mmyear Myamar Year
 * @returns {Object} Myanmar Thingyan
 */

const THINGYAN = mmyear => {
  let akyo, akya, atat, new_year_day, akyaTime;
  let akyat = [];
  let atatTime = SY * mmyear + MO;

  if (mmyear >= SE3) {
    akyaTime = atatTime - 2.169918982;
  } else {
    akyaTime = atatTime - 2.1675;
  }

  atat = julian.toDate(atatTime);
  akya = julian.toDate(akyaTime);

  atat.setHours(0, 0, 0, 0);
  akya.setHours(0, 0, 0, 0);

  akyo = new Date(akya.getFullYear(), akya.getMonth(), akya.getDate() - 1);
  new_year_day = new Date(
    atat.getFullYear(),
    atat.getMonth(),
    atat.getDate() + 1
  );

  for (let i = 1; i < atat.getUTCDate() - akya.getUTCDate(); i++) {
    akyat.push(
      new Date(akya.getFullYear(), akya.getMonth(), akya.getDate() + i)
    );
  }

  return {
    akyo: akyo.toLocaleDateString('en-US'),
    akya: akya.toLocaleDateString('en-US'),
    akyat: akyat.map(x => x.toLocaleDateString('en-US')),
    atat: atat.toLocaleDateString('en-US'),
    new_year_day: new_year_day.toLocaleDateString('en-US'),
    akyaTime: julian.toDate(akyaTime).toISOString(),
    atatTime: julian.toDate(atatTime).toISOString()
  };
};

module.exports = THINGYAN;
