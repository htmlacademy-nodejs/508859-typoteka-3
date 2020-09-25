'use strict';

const adaptMainPage = (articleList) => {
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
    discussedList: adaptArticleList(articleList),
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
    postList: adaptArticleList(articleList)
  };
};

const adaptMyPage = (articleList) => ({
  page: `my`,
  isAuth: true,
  title: `Типотека`,
  postList: adaptArticleList(articleList)
});

const adaptArticleList = (articleList) => {
  return articleList.map((article) => adaptArticle(article)).slice(0, 4);
};

const adaptArticle = (article) => ({
  id: article.id,
  categories: (adaptCategoryList(article.category)).slice(0, 3),
  img: {
    preview: {
      backgrounds: {
        src1: `/img/forest@1x.jpg`,
        src2: `/img/forest@1x.jpg 1x, img/forest@2x.jpg 2x`
      },
      imgAlt: `Фотография леса`,
    },
    full: {
      backgrounds: {
        src1: `/img/sea-fullsize@1x.jpg`,
        src2: ``
      },
      imgAlt: `пейзаж море, скалы, пляж`
    }
  },
  datetime: article.createdDate,
  title: article.title,
  previewText: article.announce,
  fullText: article.fullText,
  commentCount: article.comments.length
});

const adaptCategoryList = (categories) => {
  return categories.map((category) => adaptCategory(category));
};

const adaptCategory = (category) => ({
  name: category,
  count: Math.floor(Math.random() * 100)
});


const adaptPostPage = (article) => ({
  page: `post`,
  isAuth: true,
  headerPost: `Бирюзовое доверие`,
  ...adaptArticle(article),
  comments: [
    {
      commentUser: {
        name: `Евгений Петров`,
        avatar: `/img/avatar-1.png`
      },
      text: `Автор, ты все выдумал, покайся`,
      datetime: `21.03.2019, 20:33`,
    },
    {
      commentUser: {
        name: `Александр Марков`,
        avatar: `/img/avatar-5.png`
      },
      text: `Конечно, прежде чем так писать, нужно
      искренне
      приложить усилия, чтобы разобраться — не все люди умеют выражать свои мысли.`,
      datetime: `21.03.2019, 20:33`,
    },
    {
      commentUser: {
        name: `Евгений Петров`,
        avatar: `/img/avatar-4.png`
      },
      text: `Автор, ты все выдумал, покайся`,
      datetime: `21.03.2019, 20:33`,
    },
    {
      commentUser: {
        name: `Александр Марков`,
        avatar: `/img/avatar-3.png`
      },
      text: `Конечно, прежде чем так писать, нужно
      искренне приложить усилия, чтобы разобраться — не все люди умеют выражать свои мысли.`,
      datetime: `21.03.2019, 20:33`,
    }
  ]
});

const adaptMyCommentListPage = (comments) => ({
  page: `comments`,
  isAuth: true,
  title: `Типотека`,
  commentList: comments
});

const adaptNewPostPage = (content) => ({
  page: `new-post`,
  isAuth: true,
  isEdit: false,
  title: `new publication`,
  post: {
    title: content.title || ``,
    img: content.img || ``,
    createdDate: content.createdDate || `13.09.2020`,
    categories: content.categories || [],
    announce: content.announce || ``,
    fullText: content.fullText || ``
  }
});

const adaptSearchPage = (content) => ({
  page: `search`,
  isAuth: true,
  title: `Типотека`,
  searchWord: ``,
  searchList: adaptSearchList(content)
});

const adaptSearchList = (searchList) => {
  return searchList.map((searchElem) => adaptSearchResult(searchElem));
};

const adaptSearchResult = (content) => ({
  createdDate: content.createdDate,
  title: content.title
});

module.exports = {
  adaptMainPage,
  adaptMyPage,
  adaptMyCommentListPage,
  adaptArticle,
  adaptPostPage,
  adaptNewPostPage,
  adaptSearchPage
};
