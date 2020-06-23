'use strict';

const DATE_NUMBER = 10;

const dateRestrict = {
  MIN_MONTH: 3,
  MAX_MONTH: 5,
  MIN_DATE: 1,
  MAX_DATE: 21,
  MIN_HOUR: 0,
  MAX_HOUR: 23,
  MIN_MINUTE: 0,
  MAX_MINUTE: 60
};

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffle = (array) => {
  const cloneArray = [...array];
  for (let i = cloneArray.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [cloneArray[i], cloneArray[randomPosition]] = [cloneArray[randomPosition], cloneArray[i]];
  }

  return cloneArray;
};

const getPublishDate = () => {
  const date = new Date();
  const publishMonth = +date.getMonth(date.setMonth(getRandomInt(dateRestrict.MIN_MONTH, dateRestrict.MAX_MONTH))) + 1;
  const publishDate = +date.getDate(date.setDate(getRandomInt(dateRestrict.MIN_DATE, dateRestrict.MAX_DATE)));
  const publishHours = +date.getHours(date.setHours(getRandomInt(dateRestrict.MIN_HOUR, dateRestrict.MAX_HOUR)));
  const publishMinutes = +date.getMinutes(date.setMinutes(getRandomInt(dateRestrict.MIN_MINUTE, dateRestrict.MAX_MINUTE)));

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
