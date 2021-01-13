/* 1. Получить список всех категорий (идентификатор, наименование категории); */

SELECT categories.id, categories.category_name FROM categories;

/* 2. Получить список категорий для которых создана минимум одна публикация (идентификатор, наименование категории); */

SELECT categories.id, categories.category_name FROM categories
  RIGHT JOIN articles_categories
    ON categories.id = articles_categories.category_id

/* 3. Получить список категорий с количеством публикаций (идентификатор, наименование категории, количество публикаций в категории); */

SELECT categories.id, categories.category_name, count(articles_categories.category_id) FROM categories
  RIGHT JOIN articles_categories
    ON categories.id = articles_categories.category_id
GROUP BY categories.id

/* 4. Получить список публикаций (идентификатор публикации, заголовок публикации, анонс публикации, дата публикации, имя и фамилия автора,
контактный email, количество комментариев, наименование категорий). Сначала свежие публикации; */

SELECT articles.id, articles.title, articles.announce, articles.created_date, concat(users.firstname, ' ', users.lastname), users.email, count(comments.article_id)
  FROM articles
  INNER JOIN users
    ON articles.user_id = users.id
  INNER JOIN comments
    ON articles.id = comments.article_id
GROUP BY articles.id, users.firstname, users.lastname, users.email
ORDER BY articles.created_date DESC

/* 5. Получить полную информацию определённой публикации (идентификатор публикации, заголовок публикации, анонс,
полный текст публикации, дата публикации, путь к изображению, имя и фамилия автора, контактный email,
количество комментариев, наименование категорий); */

SELECT articles.id, articles.title, articles.announce,  articles.full_text, articles.created_date, articles.image_path,
concat(users.firstname, ' ', users.lastname),  users.email, count(comments.article_id), string_agg(categories.category_name, ', ')
FROM articles
  INNER JOIN users
    ON articles.user_id = users.id
  INNER JOIN comments
    ON articles.id = comments.article_id
  INNER JOIN articles_categories
    ON articles.id = articles_categories.article_id
  INNER JOIN (
    SELECT id, category_name
		FROM categories
  )
  categories
  ON categories.id = articles_categories.category_id
WHERE articles.id = 1
GROUP BY articles.id, users.firstname, users.lastname, users.email

/* 6. Получить список из 5 свежих комментариев (идентификатор комментария, идентификатор публикации, имя и фамилия автора, текст комментария); */

SELECT comments.id, comments.article_id, concat(users.firstname, ' ', users.lastname), comment_text
FROM comments
  INNER JOIN users
      ON comments.user_id = users.id
ORDER BY comments.comment_date DESC
LIMIT 5

/* 7. Получить список комментариев для определённой публикации (идентификатор комментария, идентификатор публикации, имя и фамилия автора,
текст комментария). Сначала новые комментарии; */

SELECT comments.id, comments.article_id, concat(users.firstname, ' ', users.lastname), comment_text
FROM comments
  INNER JOIN users
    ON comments.user_id = users.id
  INNER JOIN articles
      ON comments.article_id = articles.id
WHERE articles.id = 1
ORDER BY comments.comment_date DESC

/* 8. Обновить заголовок определённой публикации на «Как я встретил Новый год»; */

UPDATE articles
  set title = 'Как я встретил Новый год'
WHERE articles.id = 4
