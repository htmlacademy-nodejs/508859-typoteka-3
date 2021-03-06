'use strict';

const categories = [
  {[`category_name`]: `Auto`},
  {[`category_name`]: `Remote work`},
  {[`category_name`]: `Business`},
  {[`category_name`]: `Travels`},
  {[`category_name`]: `Design and arrangement`},
  {[`category_name`]: `Toy production`},
  {[`category_name`]: `UX & UI`},
  {[`category_name`]: `IT`},
  {[`category_name`]: `Movie`},
  {[`category_name`]: `Psychology`}
];

const users = [{
  email: `ilkolmakov@yandex.ru`,
  firstname: `Ilya`,
  lastname: `Kolmakov`,
  pass: `123456`,
  [`avatar_path`]: `/avatar-user-1.png`
},
{
  email: `amalofeev@mail.ru`,
  firstname: `Alexey`,
  lastname: `Malofeev`,
  pass: `aa11bc`,
  [`avatar_path`]: `/avatar-user-2.png`
},
{
  email: `valexeev@yandex.ru`,
  firstname: `Vladimir`,
  lastname: `Alexeev`,
  pass: `qw12345678`,
  [`avatar_path`]: `/avatar-user-3.png`
},
{
  email: `mleonov@yandex.ru`,
  firstname: `Michail`,
  lastname: `Leonov`,
  pass: `12AA12345`,
  [`avatar_path`]: `/avatar-user-4.png`
},
{
  email: `ebelova@yandex.ru`,
  firstname: `Elena`,
  lastname: `Belova`,
  pass: `123456`,
  [`avatar_path`]: `/avatar-user-5.png`
},
{
  email: `astolipin@yandex.ru`,
  firstname: `Alexander`,
  lastname: `Stolipin`,
  pass: `uqwerty`,
  [`avatar_path`]: `//avatar-user-6.png`
},
{
  email: `alex@yandex.ru`,
  firstname: `Alex`,
  lastname: `Ktolov`,
  pass: `456789`,
  [`avatar_path`]: `//avatar-user-7.png`
},
{
  email: `vladimirk@yandex.ru`,
  firstname: `Vladimir`,
  lastname: `Kamenev`,
  pass: `aaqqsswwddee`,
  [`avatar_path`]: `/avatar-user-8.png`
},
{
  email: `voronovmatvey@yandex.ru`,
  firstname: `Matvey`,
  lastname: `Voronov`,
  pass: `123aaqwe`,
  [`avatar_path`]: `/avatar-user-9.png`
},
{
  email: `marias@yandex.ru`,
  firstname: `Maria`,
  lastname: `Semenova`,
  pass: `54321`,
  [`avatar_path`]: `/avatar-user-10.png`
}];

const articles = [
  {[`user_id`]: 1, title: `Учим HTML и CSS`, [`created_date`]: `2020-04-14 06:34:00`, [`image_path`]: `/img-1.jpg`, announce: `Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Собрать камни бесконечности легко, если вы прирожденный герой.`, [`full_text`]: `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Как начать действовать? Для начала просто соберитесь.`},
  {[`user_id`]: 2, title: `Учим HTML и CSS`, [`created_date`]: `2020-04-14 06:34:00`, [`image_path`]: `/img-1.jpg`, announce: `Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Собрать камни бесконечности легко, если вы прирожденный герой.`, [`full_text`]: `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Как начать действовать? Для начала просто соберитесь.`},
  {[`user_id`]: 3, title: `Учим HTML и CSS`, [`created_date`]: `2020-04-14 06:34:00`, [`image_path`]: `/img-1.jpg`, announce: `Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Собрать камни бесконечности легко, если вы прирожденный герой.`, [`full_text`]: `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Как начать действовать? Для начала просто соберитесь.`},
  {[`user_id`]: 4, title: `Учим HTML и CSS`, [`created_date`]: `2020-04-14 06:34:00`, [`image_path`]: `/img-1.jpg`, announce: `Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Собрать камни бесконечности легко, если вы прирожденный герой.`, [`full_text`]: `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Как начать действовать? Для начала просто соберитесь.`},
  {[`user_id`]: 5, title: `Как достигнуть успеха не вставая с кресла`, [`created_date`]: `2020-06-17 04:57:00`, [`image_path`]: `/img-2.jpg`, announce: `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Наметь цели своей жизни на бумаге. Подумай о целях, как будто ты их уже достиг. Что ты чувствуешь? Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.`, [`full_text`]: `Простые ежедневные упражнения помогут достичь успеха. Золотое сечение — соотношение двух величин, гармоническая пропорция. Он написал больше 30 хитов. Квадрокоптер состоит из рамы, винтов и \"сердца\" системы - микроконтроллера. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры. Наметь цели своей жизни на бумаге. Подумай о целях, как будто ты их уже достиг. Что ты чувствуешь? Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Как начать действовать? Для начала просто соберитесь. Собрать камни бесконечности легко, если вы прирожденный герой. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`},
  {[`user_id`]: 6, title: `Как достигнуть успеха не вставая с кресла`, [`created_date`]: `2020-06-17 04:57:00`, [`image_path`]: `/img-2.jpg`, announce: `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Наметь цели своей жизни на бумаге. Подумай о целях, как будто ты их уже достиг. Что ты чувствуешь? Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.`, [`full_text`]: `Простые ежедневные упражнения помогут достичь успеха. Золотое сечение — соотношение двух величин, гармоническая пропорция. Он написал больше 30 хитов. Квадрокоптер состоит из рамы, винтов и \"сердца\" системы - микроконтроллера. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры. Наметь цели своей жизни на бумаге. Подумай о целях, как будто ты их уже достиг. Что ты чувствуешь? Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Как начать действовать? Для начала просто соберитесь. Собрать камни бесконечности легко, если вы прирожденный герой. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`},
  {[`user_id`]: 7, title: `Как достигнуть успеха не вставая с кресла`, [`created_date`]: `2020-06-17 04:57:00`, [`image_path`]: `/img-2.jpg`, announce: `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Наметь цели своей жизни на бумаге. Подумай о целях, как будто ты их уже достиг. Что ты чувствуешь? Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.`, [`full_text`]: `Простые ежедневные упражнения помогут достичь успеха. Золотое сечение — соотношение двух величин, гармоническая пропорция. Он написал больше 30 хитов. Квадрокоптер состоит из рамы, винтов и \"сердца\" системы - микроконтроллера. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры. Наметь цели своей жизни на бумаге. Подумай о целях, как будто ты их уже достиг. Что ты чувствуешь? Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Как начать действовать? Для начала просто соберитесь. Собрать камни бесконечности легко, если вы прирожденный герой. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`},
  {[`user_id`]: 8, title: `Обзор новейшего смартфона`, [`created_date`]: `2020-06-16 22:43:00`, [`image_path`]: `/img-3.jpg`, announce: `Программировать не настолько сложно, как об этом говорят. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры. Золотое сечение — соотношение двух величин, гармоническая пропорция. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.`, [`full_text`]: `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Как начать действовать? Для начала просто соберитесь. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Из под его пера вышло 8 платиновых альбомов. Наметь цели своей жизни на бумаге. Подумай о целях, как будто ты их уже достиг. Что ты чувствуешь?`},
  {[`user_id`]: 9, title: `Обзор новейшего смартфона`, [`created_date`]: `2020-06-16 22:43:00`, [`image_path`]: `/img-3.jpg`, announce: `Программировать не настолько сложно, как об этом говорят. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры. Золотое сечение — соотношение двух величин, гармоническая пропорция. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.`, [`full_text`]: `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Как начать действовать? Для начала просто соберитесь. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Из под его пера вышло 8 платиновых альбомов. Наметь цели своей жизни на бумаге. Подумай о целях, как будто ты их уже достиг. Что ты чувствуешь?`},
  {[`user_id`]: 10, title: `Обзор новейшего смартфона`, [`created_date`]: `2020-06-16 22:43:00`, [`image_path`]: `/img-3.jpg`, announce: `Программировать не настолько сложно, как об этом говорят. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры. Золотое сечение — соотношение двух величин, гармоническая пропорция. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.`, [`full_text`]: `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Как начать действовать? Для начала просто соберитесь. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Из под его пера вышло 8 платиновых альбомов. Наметь цели своей жизни на бумаге. Подумай о целях, как будто ты их уже достиг. Что ты чувствуешь?`}
];

const comments = [
  {[`user_id`]: 1, [`article_id`]: 1, [`comment_date`]: `21.03.2019, 20:33`, [`comment_text`]: `А где блок питания? Продаю в связи с переездом. Отрываю от сердца. Вы что?! В магазине дешевле. А сколько игр в комплекте?`},
  {[`user_id`]: 1, [`article_id`]: 2, [`comment_date`]: `21.03.2019, 20:33`, [`comment_text`]: `Продаю в связи с переездом. Отрываю от сердца. Совсем немного... А сколько игр в комплекте? С чем связана продажа? Почему так дешёво?`},
  {[`user_id`]: 1, [`article_id`]: 3, [`comment_date`]: `21.03.2019, 20:33`, [`comment_text`]: `Вы что?! В магазине дешевле. Совсем немного... А сколько игр в комплекте? А где блок питания?`},
  {[`user_id`]: 2, [`article_id`]: 3, [`comment_date`]: `21.03.2019, 20:33`, [`comment_text`]: `Вы что?! В магазине дешевле. Совсем немного... А сколько игр в комплекте? А где блок питания?`},
  {[`user_id`]: 2, [`article_id`]: 2, [`comment_date`]: `21.03.2019, 20:33`, [`comment_text`]: `А сколько игр в комплекте? Совсем немного... А где блок питания? Оплата наличными или перевод на карту?`},
  {[`user_id`]: 2, [`article_id`]: 1, [`comment_date`]: `21.03.2019, 20:33`, [`comment_text`]: `А сколько игр в комплекте? Совсем немного... А где блок питания? Оплата наличными или перевод на карту?`},
  {[`user_id`]: 3, [`article_id`]: 1, [`comment_date`]: `21.03.2019, 20:33`, [`comment_text`]: `А сколько игр в комплекте? Совсем немного... А где блок питания? Оплата наличными или перевод на карту?`},
  {[`user_id`]: 3, [`article_id`]: 2, [`comment_date`]: `21.03.2019, 20:33`, [`comment_text`]: `С чем связана продажа? Почему так дешёво? Почему в таком ужасном состоянии? А сколько игр в комплекте? Продаю в связи с переездом. Отрываю от сердца.`},
  {[`user_id`]: 3, [`article_id`]: 3, [`comment_date`]: `21.03.2019, 20:33`, [`comment_text`]: `Почему в таком ужасном состоянии? Вы что?! В магазине дешевле. С чем связана продажа? Почему так дешёво? Продаю в связи с переездом. Отрываю от сердца.`},
  {[`user_id`]: 3, [`article_id`]: 1, [`comment_date`]: `21.03.2019, 20:33`, [`comment_text`]: `Почему в таком ужасном состоянии? Вы что?! В магазине дешевле. С чем связана продажа? Почему так дешёво? Продаю в связи с переездом. Отрываю от сердца.`}
];

const articlesCategories = [
  {[`article_id`]: 1, [`category_id`]: 1},
  {[`article_id`]: 1, [`category_id`]: 2},
  {[`article_id`]: 1, [`category_id`]: 3},
  {[`article_id`]: 2, [`category_id`]: 1},
  {[`article_id`]: 2, [`category_id`]: 2},
  {[`article_id`]: 2, [`category_id`]: 3},
  {[`article_id`]: 3, [`category_id`]: 1},
  {[`article_id`]: 3, [`category_id`]: 2},
  {[`article_id`]: 3, [`category_id`]: 3},
  {[`article_id`]: 3, [`category_id`]: 4},
];

module.exports = {
  categories,
  users,
  articles,
  comments,
  articlesCategories
};
