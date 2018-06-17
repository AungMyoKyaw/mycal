const julian = require('julian');

const firstDayOfTagu = (w1, yd) => {
  let tg1 = w1 + 354 * yd - 102;
  return julian.toDate(tg1).toLocaleDateString();
};

module.exports = firstDayOfTagu;
