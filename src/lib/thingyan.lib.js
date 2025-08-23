const julian = require('julian');
const { SY, MO, SE3 } = require('./const.lib.js');

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
  // Normalize to UTC midnight to avoid local timezone shifts
  atat.setUTCHours(0, 0, 0, 0);
  akya.setUTCHours(0, 0, 0, 0);

  // Use UTC-based constructors for adjacent days
  akyo = new Date(Date.UTC(akya.getUTCFullYear(), akya.getUTCMonth(), akya.getUTCDate() - 1));
  new_year_day = new Date(
    Date.UTC(atat.getUTCFullYear(), atat.getUTCMonth(), atat.getUTCDate() + 1)
  );

  for (let i = 1; i < atat.getUTCDate() - akya.getUTCDate(); i++) {
    akyat.push(
      new Date(Date.UTC(akya.getUTCFullYear(), akya.getUTCMonth(), akya.getUTCDate() + i))
    );
  }

  const formatUTC = d => `${d.getUTCMonth() + 1}/${d.getUTCDate()}/${d.getUTCFullYear()}`;

  return {
    akyo: formatUTC(akyo),
    akya: formatUTC(akya),
    akyat: akyat.map(x => formatUTC(x)),
    atat: formatUTC(atat),
    new_year_day: formatUTC(new_year_day),
    akyaTime: julian.toDate(akyaTime).toISOString(),
    atatTime: julian.toDate(atatTime).toISOString()
  };
};

module.exports = THINGYAN;
