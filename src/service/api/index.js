'use strict';

const {Router} = require(`express`);

// const getMockData = require(`../lib/get-mock-data`);
const category = require(`./category`);
const search = require(`./search`);
const article = require(`./article`);
const {
  CategoryService,
  SearchService,
  ArticleService,
  CommentService,
} = require(`../data-service`);

const app = new Router();

// (async () => {
// const mockData = await getMockData();

const mockData = [
  {
    "id": `qbJFX5`,
    "title": `Как перестать беспокоиться и начать жить`,
    "announce": `Собрать камни бесконечности легко, если вы прирожденный герой. Золотое сечение — соотношение двух величин, гармоническая пропорция. Достичь успеха помогут ежедневные повторения. Наметь цели своей жизни на бумаге. Подумай о целях, как будто ты их уже достиг. Что ты чувствуешь?`,
    "fullText": `Как начать действовать? Для начала просто соберитесь. Квадрокоптер состоит из рамы, винтов и "сердца" системы - микроконтроллера. Ёлки — это не просто красивое дерево. Это прочная древесина. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Из под его пера вышло 8 платиновых альбомов. Он написал больше 30 хитов.`,
    "createdDate": `2020-05-16 15:15:00`,
    "category": [
      `За жизнь`,
      `Разное`,
      `Железо`,
      `Сделай сам`,
      `Без рамки`,
      `Деревья`,
      `Психология`,
      `IT`,
      `Музыка`
    ],
    "comments": [
      {
        "id": `lX318T`,
        "text": `А сколько игр в комплекте? Оплата наличными или перевод на карту? Вы что?! В магазине дешевле. Продаю в связи с переездом. Отрываю от сердца.`
      },
      {
        "id": `gWsYKr`,
        "text": `Оплата наличными или перевод на карту? Почему в таком ужасном состоянии? Совсем немного... С чем связана продажа? Почему так дешёво?`
      }
    ]
  },
  {
    "id": `FotbOO`,
    "title": `Психология успеха`,
    "announce": `Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Наметь цели своей жизни на бумаге. Подумай о целях, как будто ты их уже достиг. Что ты чувствуешь? Из под его пера вышло 8 платиновых альбомов. Он написал больше 30 хитов.`,
    "fullText": `Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Это один из лучших рок-музыкантов. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Квадрокоптер состоит из рамы, винтов и "сердца" системы - микроконтроллера. Собрать камни бесконечности легко, если вы прирожденный герой. Ёлки — это не просто красивое дерево. Это прочная древесина. Как начать действовать? Для начала просто соберитесь. Простые ежедневные упражнения помогут достичь успеха. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры. Наметь цели своей жизни на бумаге. Подумай о целях, как будто ты их уже достиг. Что ты чувствуешь? Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Золотое сечение — соотношение двух величин, гармоническая пропорция. Достичь успеха помогут ежедневные повторения. Первая большая ёлка была установлена только в 1938 году. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
    "createdDate": `2020-05-21 04:20:00`,
    "category": [
      `Разное`,
      `Музыка`,
      `Кино`,
      `Железо`,
      `Сделай сам`,
      `IT`,
      `За жизнь`,
      `Деревья`,
      `Без рамки`
    ],
    "comments": [
      {
        "id": `cT4fqA`,
        "text": `С чем связана продажа? Почему так дешёво? Продаю в связи с переездом. Отрываю от сердца. Вы что?! В магазине дешевле. А где блок питания?`
      },
      {
        "id": `7fD4X4`,
        "text": `А сколько игр в комплекте? Совсем немного... А где блок питания? Вы что?! В магазине дешевле.`
      }
    ]
  },
  {
    "id": `3-cejA`,
    "title": `Делаем квадрокоптер своими руками`,
    "announce": `Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
    "fullText": `Квадрокоптер состоит из рамы, винтов и "сердца" системы - микроконтроллера. Из под его пера вышло 8 платиновых альбомов. Это один из лучших рок-музыкантов. Первая большая ёлка была установлена только в 1938 году. Программировать не настолько сложно, как об этом говорят. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Наметь цели своей жизни на бумаге. Подумай о целях, как будто ты их уже достиг. Что ты чувствуешь? Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Достичь успеха помогут ежедневные повторения. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
    "createdDate": `2020-06-20 11:19:00`,
    "category": [
      `Кино`,
      `Музыка`,
      `Психология`,
      `Программирование`,
      `Сделай сам`,
      `Без рамки`,
      `За жизнь`,
      `IT`
    ],
    "comments": [
      {
        "id": `ACpMaX`,
        "text": `А где блок питания? Совсем немного... Почему в таком ужасном состоянии? А сколько игр в комплекте?`
      },
      {
        "id": `HykLVc`,
        "text": `С чем связана продажа? Почему так дешёво? Неплохо, но дорого. А сколько игр в комплекте? Почему в таком ужасном состоянии?`
      },
      {
        "id": `K4_GNz`,
        "text": `Продаю в связи с переездом. Отрываю от сердца. А сколько игр в комплекте? А где блок питания? Почему в таком ужасном состоянии?`
      },
      {
        "id": `5y7IOi`,
        "text": `С чем связана продажа? Почему так дешёво? Неплохо, но дорого. А сколько игр в комплекте? Вы что?! В магазине дешевле.`
      },
      {
        "id": `wah_R9`,
        "text": `С чем связана продажа? Почему так дешёво? Почему в таком ужасном состоянии? А где блок питания? Оплата наличными или перевод на карту?`
      },
      {
        "id": `GVdmyg`,
        "text": `А сколько игр в комплекте? Вы что?! В магазине дешевле. Неплохо, но дорого. Совсем немного...`
      },
      {
        "id": `qyGcy1`,
        "text": `Продаю в связи с переездом. Отрываю от сердца. Вы что?! В магазине дешевле. А сколько игр в комплекте? А где блок питания?`
      }
    ]
  },
  {
    "id": `gTp-jj`,
    "title": `Рок — это протест`,
    "announce": `Квадрокоптер состоит из рамы, винтов и "сердца" системы - микроконтроллера. Достичь успеха помогут ежедневные повторения. Ёлки — это не просто красивое дерево. Это прочная древесина. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.`,
    "fullText": `Наметь цели своей жизни на бумаге. Подумай о целях, как будто ты их уже достиг. Что ты чувствуешь? Программировать не настолько сложно, как об этом говорят.`,
    "createdDate": `2020-05-01 01:30:00`,
    "category": [
      `Без рамки`,
      `Железо`,
      `Психология`,
      `IT`,
      `За жизнь`,
      `Разное`,
      `Музыка`
    ],
    "comments": [
      {
        "id": `coKLD5`,
        "text": `Оплата наличными или перевод на карту? А где блок питания? С чем связана продажа? Почему так дешёво? Продаю в связи с переездом. Отрываю от сердца.`
      },
      {
        "id": `qLMyLw`,
        "text": `Оплата наличными или перевод на карту? А сколько игр в комплекте? Неплохо, но дорого. Вы что?! В магазине дешевле.`
      },
      {
        "id": `HTbBSc`,
        "text": `Вы что?! В магазине дешевле. Совсем немного... С чем связана продажа? Почему так дешёво? Почему в таком ужасном состоянии?`
      },
      {
        "id": `_Is_jr`,
        "text": `Почему в таком ужасном состоянии? Вы что?! В магазине дешевле. А сколько игр в комплекте? С чем связана продажа? Почему так дешёво?`
      },
      {
        "id": `NJKpON`,
        "text": `Вы что?! В магазине дешевле. Совсем немного... С чем связана продажа? Почему так дешёво? А где блок питания?`
      },
      {
        "id": `xmeTyI`,
        "text": `Почему в таком ужасном состоянии? А сколько игр в комплекте? Совсем немного... Оплата наличными или перевод на карту?`
      },
      {
        "id": `gUZMTo`,
        "text": `Оплата наличными или перевод на карту? Совсем немного... Вы что?! В магазине дешевле. Продаю в связи с переездом. Отрываю от сердца.`
      }
    ]
  },
  {
    "id": `qvDVy-`,
    "title": `Рок — это протест`,
    "announce": `Как начать действовать? Для начала просто соберитесь. Простые ежедневные упражнения помогут достичь успеха. Это один из лучших рок-музыкантов. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.`,
    "fullText": `Как начать действовать? Для начала просто соберитесь. Собрать камни бесконечности легко, если вы прирожденный герой. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Достичь успеха помогут ежедневные повторения. Наметь цели своей жизни на бумаге. Подумай о целях, как будто ты их уже достиг. Что ты чувствуешь? Квадрокоптер состоит из рамы, винтов и "сердца" системы - микроконтроллера. Он написал больше 30 хитов. Простые ежедневные упражнения помогут достичь успеха. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры. Ёлки — это не просто красивое дерево. Это прочная древесина. Это один из лучших рок-музыкантов.`,
    "createdDate": `2020-06-13 04:31:00`,
    "category": [`Железо`, `Кино`, `Музыка`, `IT`],
    "comments": [
      {
        "id": `_dY6Uz`,
        "text": `Оплата наличными или перевод на карту? А сколько игр в комплекте? С чем связана продажа? Почему так дешёво? Почему в таком ужасном состоянии?`
      },
      {
        "id": `nRINv5`,
        "text": `А где блок питания? Совсем немного... Неплохо, но дорого. А сколько игр в комплекте?`
      },
      {
        "id": `wr3kl9`,
        "text": `Оплата наличными или перевод на карту? Вы что?! В магазине дешевле. А где блок питания? Совсем немного...`
      },
      {
        "id": `RQHLaB`,
        "text": `Оплата наличными или перевод на карту? Почему в таком ужасном состоянии? Неплохо, но дорого. Вы что?! В магазине дешевле.`
      },
      {
        "id": `1jz5QB`,
        "text": `А сколько игр в комплекте? Вы что?! В магазине дешевле. Неплохо, но дорого. Оплата наличными или перевод на карту?`
      },
      {
        "id": `WcYq69`,
        "text": `С чем связана продажа? Почему так дешёво? Оплата наличными или перевод на карту? Почему в таком ужасном состоянии? Вы что?! В магазине дешевле.`
      }
    ]
  },
  {
    "id": `l5nzu1`,
    "title": `Обзор новейшего смартфона`,
    "announce": `Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Это один из лучших рок-музыкантов. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Простые ежедневные упражнения помогут достичь успеха.`,
    "fullText": `Программировать не настолько сложно, как об этом говорят. Золотое сечение — соотношение двух величин, гармоническая пропорция. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Он написал больше 30 хитов. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Собрать камни бесконечности легко, если вы прирожденный герой. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Простые ежедневные упражнения помогут достичь успеха. Из под его пера вышло 8 платиновых альбомов. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Как начать действовать? Для начала просто соберитесь. Квадрокоптер состоит из рамы, винтов и "сердца" системы - микроконтроллера. Первая большая ёлка была установлена только в 1938 году. Наметь цели своей жизни на бумаге. Подумай о целях, как будто ты их уже достиг. Что ты чувствуешь? Ёлки — это не просто красивое дерево. Это прочная древесина.`,
    "createdDate": `2020-04-19 23:25:00`,
    "category": [
      `Без рамки`,
      `Психология`,
      `За жизнь`,
      `Программирование`,
      `Кино`
    ],
    "comments": [
      {
        "id": `3mu7ji`,
        "text": `Продаю в связи с переездом. Отрываю от сердца. Оплата наличными или перевод на карту? Неплохо, но дорого. С чем связана продажа? Почему так дешёво?`
      },
      {
        "id": `EIDBij`,
        "text": `С чем связана продажа? Почему так дешёво? Почему в таком ужасном состоянии? А где блок питания? Оплата наличными или перевод на карту?`
      },
      {
        "id": `xp4xg9`,
        "text": `Оплата наличными или перевод на карту? А где блок питания? С чем связана продажа? Почему так дешёво? Совсем немного...`
      },
      {
        "id": `E6-CC3`,
        "text": `Оплата наличными или перевод на карту? Совсем немного... Вы что?! В магазине дешевле. А сколько игр в комплекте?`
      },
      {
        "id": `gPV86e`,
        "text": `А где блок питания? Почему в таком ужасном состоянии? Оплата наличными или перевод на карту? А сколько игр в комплекте?`
      },
      {
        "id": `iID7L0`,
        "text": `Продаю в связи с переездом. Отрываю от сердца. Почему в таком ужасном состоянии? С чем связана продажа? Почему так дешёво? Совсем немного...`
      },
      {
        "id": `GQwa7N`,
        "text": `С чем связана продажа? Почему так дешёво? А сколько игр в комплекте? А где блок питания? Продаю в связи с переездом. Отрываю от сердца.`
      }
    ]
  },
  {
    "id": `hEOYxm`,
    "title": `Самый лучший музыкальный альбом этого года`,
    "announce": `Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Из под его пера вышло 8 платиновых альбомов. Наметь цели своей жизни на бумаге. Подумай о целях, как будто ты их уже достиг. Что ты чувствуешь? Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.`,
    "fullText": ``,
    "createdDate": `2020-04-19 05:09:00`,
    "category": [
      `Психология`,
      `IT`,
      `Разное`,
      `Деревья`,
      `Железо`,
      `Программирование`,
      `Сделай сам`,
      `За жизнь`
    ],
    "comments": [
      {
        "id": `Jywcao`,
        "text": `А где блок питания? Неплохо, но дорого. А сколько игр в комплекте? Почему в таком ужасном состоянии?`
      },
      {
        "id": `7zxBqx`,
        "text": `Вы что?! В магазине дешевле. Оплата наличными или перевод на карту? А где блок питания? А сколько игр в комплекте?`
      }
    ]
  },
  {
    "id": `z3pLkU`,
    "title": `Делаем квадрокоптер своими руками`,
    "announce": `Как начать действовать? Для начала просто соберитесь. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры. Собрать камни бесконечности легко, если вы прирожденный герой. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.`,
    "fullText": `Собрать камни бесконечности легко, если вы прирожденный герой. Квадрокоптер состоит из рамы, винтов и "сердца" системы - микроконтроллера. Он написал больше 30 хитов. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.`,
    "createdDate": `2020-06-20 21:52:00`,
    "category": [
      `Музыка`,
      `Кино`,
      `За жизнь`,
      `Деревья`,
      `Психология`,
      `Сделай сам`,
      `Разное`,
      `Без рамки`,
      `Программирование`
    ],
    "comments": [
      {
        "id": `7Q72uf`,
        "text": `Вы что?! В магазине дешевле. А сколько игр в комплекте? А где блок питания? Продаю в связи с переездом. Отрываю от сердца.`
      },
      {
        "id": `Dt08Gb`,
        "text": `Оплата наличными или перевод на карту? Почему в таком ужасном состоянии? А сколько игр в комплекте? Совсем немного...`
      },
      {
        "id": `Jeiu99`,
        "text": `Неплохо, но дорого. Вы что?! В магазине дешевле. А сколько игр в комплекте? А где блок питания?`
      },
      {
        "id": `uY9X6K`,
        "text": `Почему в таком ужасном состоянии? Продаю в связи с переездом. Отрываю от сердца. Вы что?! В магазине дешевле. С чем связана продажа? Почему так дешёво?`
      },
      {
        "id": `Jb68EC`,
        "text": `Почему в таком ужасном состоянии? А сколько игр в комплекте? Совсем немного... Продаю в связи с переездом. Отрываю от сердца.`
      },
      {
        "id": `NIk4Sq`,
        "text": `Оплата наличными или перевод на карту? Вы что?! В магазине дешевле. А где блок питания? А сколько игр в комплекте?`
      },
      {
        "id": `P9yBkN`,
        "text": `Почему в таком ужасном состоянии? Продаю в связи с переездом. Отрываю от сердца. Вы что?! В магазине дешевле. Совсем немного...`
      },
      {
        "id": `5Z3DOQ`,
        "text": `Вы что?! В магазине дешевле. А сколько игр в комплекте? А где блок питания? С чем связана продажа? Почему так дешёво?`
      }
    ]
  },
  {
    "id": `46Lh7p`,
    "title": `Обзор новейшего смартфона`,
    "announce": `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Программировать не настолько сложно, как об этом говорят. Как начать действовать? Для начала просто соберитесь. Собрать камни бесконечности легко, если вы прирожденный герой.`,
    "fullText": `Он написал больше 30 хитов. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Ёлки — это не просто красивое дерево. Это прочная древесина. Золотое сечение — соотношение двух величин, гармоническая пропорция. Простые ежедневные упражнения помогут достичь успеха. Квадрокоптер состоит из рамы, винтов и "сердца" системы - микроконтроллера. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Собрать камни бесконечности легко, если вы прирожденный герой. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры. Достичь успеха помогут ежедневные повторения. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Программировать не настолько сложно, как об этом говорят. Это один из лучших рок-музыкантов.`,
    "createdDate": `2020-04-19 04:10:00`,
    "category": [`Кино`, `Психология`],
    "comments": [
      {
        "id": `jzNq2a`,
        "text": `С чем связана продажа? Почему так дешёво? А где блок питания? Неплохо, но дорого. А сколько игр в комплекте?`
      },
      {
        "id": `il8Bgv`,
        "text": `Оплата наличными или перевод на карту? А сколько игр в комплекте? Неплохо, но дорого. Почему в таком ужасном состоянии?`
      },
      {
        "id": `LF6ZFM`,
        "text": `Продаю в связи с переездом. Отрываю от сердца. Оплата наличными или перевод на карту? Неплохо, но дорого. Вы что?! В магазине дешевле.`
      },
      {
        "id": `Pq6VS7`,
        "text": `Почему в таком ужасном состоянии? Вы что?! В магазине дешевле. С чем связана продажа? Почему так дешёво? Оплата наличными или перевод на карту?`
      },
      {
        "id": `UfKO8E`,
        "text": `Почему в таком ужасном состоянии? Продаю в связи с переездом. Отрываю от сердца. Неплохо, но дорого. Оплата наличными или перевод на карту?`
      },
      {
        "id": `mF8cy8`,
        "text": `А сколько игр в комплекте? Оплата наличными или перевод на карту? Почему в таком ужасном состоянии? С чем связана продажа? Почему так дешёво?`
      },
      {
        "id": `81_kE9`,
        "text": `С чем связана продажа? Почему так дешёво? А сколько игр в комплекте? Почему в таком ужасном состоянии? Оплата наличными или перевод на карту?`
      },
      {
        "id": `LznjEC`,
        "text": `Оплата наличными или перевод на карту? А где блок питания? Неплохо, но дорого. А сколько игр в комплекте?`
      }
    ]
  },
  {
    "id": `t7I-94`,
    "title": `Ёлки. История деревьев`,
    "announce": `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Из под его пера вышло 8 платиновых альбомов.`,
    "fullText": `Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Программировать не настолько сложно, как об этом говорят. Из под его пера вышло 8 платиновых альбомов. Первая большая ёлка была установлена только в 1938 году. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Как начать действовать? Для начала просто соберитесь. Достичь успеха помогут ежедневные повторения. Ёлки — это не просто красивое дерево. Это прочная древесина. Он написал больше 30 хитов.`,
    "createdDate": `2020-04-04 15:11:00`,
    "category": [`Психология`, `Деревья`, `Железо`, `За жизнь`],
    "comments": [
      {
        "id": `klKjpv`,
        "text": `Оплата наличными или перевод на карту? Почему в таком ужасном состоянии? А где блок питания? Совсем немного...`
      },
      {
        "id": `58wReA`,
        "text": `Неплохо, но дорого. А сколько игр в комплекте? А где блок питания? Оплата наличными или перевод на карту?`
      },
      {
        "id": `ipiqnz`,
        "text": `Оплата наличными или перевод на карту? Вы что?! В магазине дешевле. А где блок питания? С чем связана продажа? Почему так дешёво?`
      },
      {
        "id": `bUHCBz`,
        "text": `Вы что?! В магазине дешевле. Оплата наличными или перевод на карту? А сколько игр в комплекте? Почему в таком ужасном состоянии?`
      },
      {
        "id": `n6wNOo`,
        "text": `А сколько игр в комплекте? А где блок питания? Совсем немного... Оплата наличными или перевод на карту?`
      },
      {
        "id": `5PlSYs`,
        "text": `Оплата наличными или перевод на карту? Вы что?! В магазине дешевле. А сколько игр в комплекте? С чем связана продажа? Почему так дешёво?`
      },
      {
        "id": `b3GLe0`,
        "text": `А где блок питания? Совсем немного... Оплата наличными или перевод на карту? Продаю в связи с переездом. Отрываю от сердца.`
      }
    ]
  }
];

category(app, new CategoryService(mockData));
search(app, new SearchService(mockData));
article(app, new ArticleService(mockData), new CommentService());
// })();

module.exports = app;
