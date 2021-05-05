/* 1. Получить список всех категорий (идентификатор, наименование категории); */

SELECT categories.id, categories.name FROM categories;

/* 2. Получить список категорий для которых создана минимум одна публикация (идентификатор, наименование категории); */

SELECT categories.id, categories.name FROM categories
  RIGHT JOIN articles_categories
    ON categories.id = articles_categories.categoryId

/* 3. Получить список категорий с количеством публикаций (идентификатор, наименование категории, количество публикаций в категории); */

SELECT categories.id, categories.name, count(articles_categories.categoryId) FROM categories
  RIGHT JOIN articles_categories
    ON categories.id = articles_categories.categoryId
GROUP BY categories.id

/* 4. Получить список публикаций (идентификатор публикации, заголовок публикации, анонс публикации, дата публикации, имя и фамилия автора,
контактный email, количество комментариев, наименование категорий). Сначала свежие публикации; */

SELECT articles.id, articles.title, articles.announce, articles.createdDate, concat(users.firstname, ' ', users.lastname), users.email, count(comments.articleId)
  FROM articles
  INNER JOIN users
    ON articles.userId = users.id
  INNER JOIN comments
    ON articles.id = comments.articleId
GROUP BY articles.id, users.firstname, users.lastname, users.email
ORDER BY articles.createdDate DESC

/* 5. Получить полную информацию определённой публикации (идентификатор публикации, заголовок публикации, анонс,
полный текст публикации, дата публикации, путь к изображению, имя и фамилия автора, контактный email,
количество комментариев, наименование категорий); */

SELECT articles.id, articles.title, articles.announce,  articles.fullText, articles.createdDate, articles.imagePath,
concat(users.firstname, ' ', users.lastname),  users.email, count(comments.articleId), string_agg(categories.name, ', ')
FROM articles
  INNER JOIN users
    ON articles.userId = users.id
  INNER JOIN comments
    ON articles.id = comments.articleId
  INNER JOIN articles_categories
    ON articles.id = articles_categories.articleId
  INNER JOIN (
    SELECT id, name
		FROM categories
  )
  categories
  ON categories.id = articles_categories.categoryId
WHERE articles.id = 1
GROUP BY articles.id, users.firstname, users.lastname, users.email

/* 6. Получить список из 5 свежих комментариев (идентификатор комментария, идентификатор публикации, имя и фамилия автора, текст комментария); */

SELECT comments.id, comments.articleId, concat(users.firstname, ' ', users.lastname), text
FROM comments
  INNER JOIN users
      ON comments.userId = users.id
ORDER BY comments.createdAt DESC
LIMIT 5

/* 7. Получить список комментариев для определённой публикации (идентификатор комментария, идентификатор публикации, имя и фамилия автора,
текст комментария). Сначала новые комментарии; */

SELECT comments.id, comments.articleId, concat(users.firstname, ' ', users.lastname), text
FROM comments
  INNER JOIN users
    ON comments.userId = users.id
  INNER JOIN articles
      ON comments.articleId = articles.id
WHERE articles.id = 1
ORDER BY comments.createdAt DESC

/* 8. Обновить заголовок определённой публикации на «Как я встретил Новый год»; */

UPDATE articles
  set title = 'Как я встретил Новый год'
WHERE articles.id = 4
