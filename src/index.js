const mmyear = require('./lib/mmyear.lib.js');
const buddhistYear = require('./lib/buddhist_era_year.lib.js');
const thingyan = require('./lib/thingyan.lib.js');
const isWatatYear = require('./lib/intercalary.lib.js');
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
    return isWatatYear(this.year).watatYear;
  }

  get waso() {
    return waso(isWatatYear(this.year), this.year);
  }
}

module.exports = MCAL;
