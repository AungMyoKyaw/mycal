const mmyear = require('./lib/mmyear.lib.js');
const buddhistYear = require('./lib/buddhist_era_year.lib.js');
const thingyan = require('./lib/thingyan.lib.js');
const watatInfo = require('./lib/intercalary.lib.js');
const waso = require('./lib/waso.lib.js');

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
      let currentWaso = new Date(waso(watat, this.year));
      let nearestWaso = new Date(waso(nearestWatatInfo, nearestWatatInfo.year));
      isBigWatat =
        ((currentWaso - nearestWaso) / (24 * 60 * 60 * 1e3)) % 354 == 30
          ? false
          : true;
    }

    return {watat: watat.isWatatYear, isBigWatat};
  }

  get waso() {
    return waso(watatInfo(this.year), this.year);
  }
}

module.exports = MCAL;
