DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS threads;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS subcomments;

CREATE TABLE users(
  id INTEGER PRIMARY KEY,
  name TEXT,
  password TEXT,
  image TEXT
);

CREATE TABLE threads(
  id INTEGER PRIMARY KEY,
  username TEXT,
  created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  insult TEXT,
  votes INTEGER,
  FOREIGN KEY(username) REFERENCES users(name)
);

CREATE TABLE comments(
  id INTEGER PRIMARY KEY,
  thread_id INTEGER,
  username TEXT,
  comeback TEXT,
  votes INTEGER,
  created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(thread_id) REFERENCES threads(id),
  FOREIGN KEY(username) REFERENCES users(name)
);

CREATE TABLE subcomments(
  id INTEGER PRIMARY KEY,
  thread_id INTEGER,
  username TEXT,
  comment_id INTEGER,
  subcomment TEXT,
  votes INTEGER,
  created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(thread_id) REFERENCES threads(id),
  FOREIGN KEY(username) REFERENCES users(name)
);

PRAGMA foreign_keys = ON;
