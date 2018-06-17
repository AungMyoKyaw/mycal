const mmyear = require('./lib/mmyear.lib.js');
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
    if (nearestWatatInfo.isWatatYear) {
      let currentWaso = waso(watat, this.year);
      let nearestWaso = waso(nearestWatatInfo, nearestWatatInfo.year);
      this.nearestWatatYear = nearestWatatInfo.year;
      this.nearestWaso = nearestWaso.jd;
      isBigWatat = (currentWaso.jd - nearestWaso.jd) % 354 == 30 ? false : true;
    }

    return {watat: watat.isWatatYear, isBigWatat};
  }

  get waso() {
    return waso(watatInfo(this.year), this.year).gd;
  }

  get firstDayOfTagu() {
    this.watatYear;
    return firstDayOfTagu(this.nearestWaso, this.year - this.nearestWatatYear);
  }
}

module.exports = MCAL;
