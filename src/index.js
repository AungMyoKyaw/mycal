const mmyear = require('./lib/mmyear.lib.js');
const myMonth = require('./lib/mymonth.lib.js');
const buddhistYear = require('./lib/buddhist_era_year.lib.js');
const thingyan = require('./lib/thingyan.lib.js');
const watatInfo = require('./lib/intercalary.lib.js');
const waso = require('./lib/waso.lib.js');
const firstDayOfTagu = require('./lib/first_day_of_tagu.lib.js');

class MCAL {
  constructor(dateString) {
    this.gDate = dateString ? new Date(dateString) : new Date(); //get gregorian date
  }

  get year() {
    return mmyear(this.gDate);
  }

  get buddhistEraYear() {
    return buddhistYear(this.year);
  }

  get thingyan() {
    return thingyan(this.year);
  }

  get watatYear() {
    let watat = watatInfo(this.year);
    let {nearestWatatInfo} = watat;
    let isBigWatat = false;
    let currentWaso = waso(watat, this.year);
    let nearestWaso = waso(nearestWatatInfo, nearestWatatInfo.year);
    this.nearestWatatYear = nearestWatatInfo.year;
    this.nearestWaso = nearestWaso.jd;

    if (watat.isWatatYear) {
      isBigWatat = (currentWaso.jd - nearestWaso.jd) % 354 == 30 ? false : true;
    }

    this.c = watat.isWatatYear ? 0 : 1;
    this.b = isBigWatat ? 1 : 0;

    return {watat: watat.isWatatYear, isBigWatat};
  }

  get waso() {
    return waso(watatInfo(this.year), this.year).gd;
  }

  get firstDayOfTagu() {
    this.watatYear;
    let tg1 = firstDayOfTagu(
      this.nearestWaso,
      this.year - this.nearestWatatYear
    );
    this.tg1 = tg1.jd;
    return tg1.gd;
  }

  get month() {
    this.firstDayOfTagu;

    return myMonth(this.gDate, this.tg1, this.c, this.b).mm;
  }
}

module.exports = MCAL;
