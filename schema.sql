DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS threads;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS subcomments;

CREATE TABLE users(
  userid INTEGER PRIMARY KEY,
  name TEXT,
  password TEXT,
  image TEXT
);

CREATE TABLE threads(
  thread_id INTEGER PRIMARY KEY,
  username TEXT,
  created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  insult TEXT,
  votes INTEGER,
  show INTEGER,
  FOREIGN KEY(username) REFERENCES users(name)
);

CREATE TABLE comments(
  comment_id INTEGER PRIMARY KEY,
  thread_id INTEGER,
  username TEXT,
  comeback TEXT,
  votes INTEGER,
  show INTEGER,
  created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(thread_id) REFERENCES threads(id),
  FOREIGN KEY(username) REFERENCES users(name)
);

CREATE TABLE subcomments(
  subcomment_id INTEGER PRIMARY KEY,
  thread_id INTEGER,
  username TEXT,
  comment_id INTEGER,
  subcomment TEXT,
  votes INTEGER,
  show INTEGER,
  created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(thread_id) REFERENCES threads(id),
  FOREIGN KEY(comment_id) REFERENCES comments(id),
  FOREIGN KEY(username) REFERENCES users(name)
);

PRAGMA foreign_keys = ON;
