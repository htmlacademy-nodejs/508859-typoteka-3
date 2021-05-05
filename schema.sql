CREATE DATABASE typoteka
  WITH
  OWNER = academy
  ENCODING = 'UTF8'
  TEMPLATE = template0
  LC_COLLATE = 'C'
  LC_CTYPE = 'C'
  CONNECTION LIMIT = -1;

GRANT ALL ON DATABASE typoteka TO academy;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS articles;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS articles_categories;
DROP TABLE IF EXISTS categories;

CREATE TABLE users
(
  id SERIAL PRIMARY KEY,
  email VARCHAR(100) NOT NULL,
  firstname VARCHAR(100) NOT NULL,
  lastname VARCHAR(100) NOT NULL,
  pass VARCHAR(100) NOT NULL,
  avatarPath VARCHAR(255) NOT NULL
);

CREATE UNIQUE INDEX user_unique_ind ON users (email, firstname, lastname);


CREATE TABLE comments
(
  id SERIAL PRIMARY KEY,
  userId INTEGER NOT NULL,
  articleId INTEGER NOT NULL,
  text VARCHAR(1000),
  FOREIGN KEY (userId) REFERENCES users (id)
		ON DELETE SET NULL
		ON UPDATE SET NULL,
  FOREIGN KEY (articleId) REFERENCES articles (id)
		ON DELETE SET NULL
		ON UPDATE SET NULL
);

CREATE INDEX comments_search_ind ON comments (text);

CREATE TABLE categories
(
  id SERIAL PRIMARY KEY,
  name VARCHAR(16) NOT NULL
);

CREATE INDEX category_search_ind ON categories (name);

CREATE TABLE articles
(
  id SERIAL PRIMARY KEY,
  userId INTEGER NOT NULL,
  title VARCHAR(250) NOT NULL,
  createdDate DATE NOT NULL,
  imagePath VARCHAR(255) NOT NULL,
  imagePathFull VARCHAR(255),
  announce VARCHAR(500) NOT NULL,
  fullText VARCHAR(2000) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id)
		ON DELETE SET NULL
		ON UPDATE SET NULL
);

CREATE UNIQUE INDEX articles_unique_ind ON articles (title);
CREATE INDEX articles_search_ind ON articles (title);

CREATE TABLE articles_categories
(
  articleId INTEGER NOT NULL,
  categoryId INTEGER NOT NULL,
	CONSTRAINT articles_categories_pk PRIMARY KEY (articleId, categoryId),
  FOREIGN KEY (articleId) REFERENCES articles (id)
		ON DELETE SET NULL
		ON UPDATE CASCADE,
	FOREIGN KEY (categoryId) REFERENCES categories (id)
		ON DELETE SET NULL
		ON UPDATE CASCADE
);
