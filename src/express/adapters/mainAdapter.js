'use strict';

const mainAdapter = (articleList) => {
  return {
    isAuth: true,
    title: `Типотека`,
    page: `main`,
    categories: [
      {
        name: `Автомобили`,
        count: 88
      },
      {
        name: `Удаленная работа`,
        count: 13
      },
      {
        name: `Бизнес`,
        count: 13
      },
      {
        name: `Путешествия`,
        count: 13
      },
      {
        name: `Дизайн и обустройство`,
        count: 13
      },
      {
        name: `Производство игрушек`,
        count: 22
      },
      {
        name: `UX & UI`,
        count: 22
      }
    ],
    discussedList: [
      {
        text: `Билл Гейтс впервые за два года возглавил рейтинг самых богатых людей мира по версии Bloomberg`,
        hot: 12
      },
      {
        text: `Сервис для аналитики Telegram-чатов Combot попал под блокировку из-за информации на служебной странице`,
        hot: 15
      },
      {
        text: `Модель Кайли Дженнер продаст 51% своей компании Kylie Cosmetics владельцу Factor за $600 млн`,
        hot: 52
      },
      {
        text: `Tesla получила 146 тысяч предзаказов на электрический пикап Cybertruck за двое суток`,
        hot: 153
      }
    ],
    commentList: [
      {
        author: `Анна Артамонова`,
        avatar: `/img/avatar-small-1.png`,
        text: `Сервис аренды жилья Airbnb стал глобальным партнером Международного
          олимпийского комитета
          (МОК) на девять лет, в течение которых пройдет пять Олимпиад, в том числе в Токио в 2020 году.`
      },
      {
        author: `Александр Петров`,
        avatar: `/img/avatar-small-2.png`,
        text: `Главреды «Дождя», Forbes и других СМИ попросили Роскомнадзор
          разъяснить штрафы за ссылки на
          сайты с матом`
      },
      {
        author: `Игорь Шманский`,
        avatar: `/img/avatar-small-3.png`,
        text: `Что-то все электрокары в последнее время все на одно лицо
          делаются))`
      }
    ],
    postList: getArticleListAdapter(articleList)
  };
};

const getArticleListAdapter = (articleList) => {
  return articleList.map((article) => getArticleAdapter(article)).slice(0, 4);
};

const getArticleAdapter = (article) => {
  return {
    id: article.id,
    breadcrumbs: article.category.slice(0, 3),
    img: {
      backgrounds: {
        src1: `/img/forest@1x.jpg`,
        src2: `/img/forest@1x.jpg 1x, img/forest@2x.jpg 2x`
      },
      imgText: `Фотография леса`
    },
    datetime: article.createdDate,
    title: article.title,
    previewText: article.announce,
    fullText: article.fullText,
    commentCount: article.comments.length
  };
};

module.exports = mainAdapter;
