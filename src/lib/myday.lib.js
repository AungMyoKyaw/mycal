const {moon, number} = require('./localization.lib.js');

/**
 * Myanmar Day
 *
 * @param {Number} md Myanmar Day
 * @param {Number} mml Length of Myanmar Month
 * @returns {Object} FortNight Day & Phase of Moon
 */

const MM_DAY = (md, mml) => {
  let fd = md - 15 * Math.floor(md / 16);

  let mp =
    Math.floor((md + 1) / 16) + Math.floor(md / 16) + Math.floor(md / mml);

  return {
    fd: number(fd), //FortNight Day
    mp: moon[mp] //Phase of Moon
  };
};

module.exports = MM_DAY;
