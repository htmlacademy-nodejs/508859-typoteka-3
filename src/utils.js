'use strict';

const {DATE_NUMBER, dateRestrict} = require(`./mocks`);

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffle = (someArray) => {
  for (let i = someArray.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [someArray[i], someArray[randomPosition]] = [someArray[randomPosition], someArray[i]];
  }

  return someArray;
};

const getPublishDate = () => {
  const date = new Date();
  const publishMonth = +date.getMonth(date.setMonth(getRandomInt(dateRestrict.minMonth, dateRestrict.maxMonth))) + 1;
  const publishDate = +date.getDate(date.setDate(getRandomInt(dateRestrict.minDate, dateRestrict.maxDate)));
  const publishHours = +date.getHours(date.setHours(getRandomInt(dateRestrict.minHour, dateRestrict.maxHour)));
  const publishMinutes = +date.getMinutes(date.setMinutes(getRandomInt(dateRestrict.minMinute, dateRestrict.maxMinute)));

  const strPublishMonth = publishMonth < DATE_NUMBER ? `0${publishMonth}` : publishMonth;
  const strPublishDate = publishDate < DATE_NUMBER ? `0${publishDate}` : publishDate;
  const strPublishHours = publishHours < DATE_NUMBER ? `0${publishHours}` : publishHours;
  const strPublishMinutes = publishMinutes < DATE_NUMBER ? `0${publishMinutes}` : publishMinutes;

  return `${date.getFullYear()}-${strPublishMonth}-${strPublishDate} ${strPublishHours}:${strPublishMinutes}:00`;
};

module.exports = {
  getRandomInt,
  shuffle,
  getPublishDate
};
