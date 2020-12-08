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
  avatar_path VARCHAR(255) NOT NULL
);

CREATE UNIQUE INDEX user_unique_ind ON users (email, firstname, lastname);


CREATE TABLE comments
(
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  article_id INTEGER NOT NULL,
  comment_date DATE NOT NULL,
  comment_text VARCHAR(1000),
  FOREIGN KEY (user_id) REFERENCES users (id)
		ON DELETE SET NULL
		ON UPDATE SET NULL,
  FOREIGN KEY (article_id) REFERENCES articles (id)
		ON DELETE SET NULL
		ON UPDATE SET NULL
);

CREATE INDEX comments_search_ind ON comments (comment_text);

CREATE TABLE categories
(
  id SERIAL PRIMARY KEY,
  category_name VARCHAR(16) NOT NULL
);

CREATE INDEX category_search_ind ON categories (category_name);

CREATE TABLE articles
(
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  -- comment_id INTEGER,
  title VARCHAR(250) NOT NULL,
  created_date DATE NOT NULL,
  image_path VARCHAR(255) NOT NULL,
  announce VARCHAR(500) NOT NULL,
  full_text VARCHAR(2000) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id)
		ON DELETE SET NULL
		ON UPDATE SET NULL
  -- FOREIGN KEY (comment_id) REFERENCES comments (id)
	-- 	ON DELETE SET NULL
	-- 	ON UPDATE SET NULL
);

CREATE UNIQUE INDEX articles_unique_ind ON articles (title);
CREATE INDEX articles_search_ind ON articles (title);

CREATE TABLE articles_categories
(
  article_id INTEGER NOT NULL,
  category_id INTEGER NOT NULL,
	CONSTRAINT articles_categories_pk PRIMARY KEY (article_id, category_id),
  FOREIGN KEY (article_id) REFERENCES articles (id)
		ON DELETE SET NULL
		ON UPDATE CASCADE,
	FOREIGN KEY (category_id) REFERENCES categories (id)
		ON DELETE SET NULL
		ON UPDATE CASCADE
);
