const {moon, number} = require('./localization.lib.js');

const mmDay = (md, mml) => {
  let fd = md - 15 * Math.floor(md / 16);

  let mp =
    Math.floor((md + 1) / 16) + Math.floor(md / 16) + Math.floor(md / mml);

  return {fd: number(fd), mp: moon[mp]};
};

module.exports = mmDay;
