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
  tUsername TEXT,
  created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  insult TEXT,
  story TEXT,
  tVotes INTEGER,
  tShow INTEGER,
  FOREIGN KEY(tUsername) REFERENCES users(name)
);

CREATE TABLE comments(
  comment_id INTEGER PRIMARY KEY,
  thread_id INTEGER,
  cUsername TEXT,
  comeback TEXT,
  cVotes INTEGER,
  cShow INTEGER,
  created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(thread_id) REFERENCES threads(id),
  FOREIGN KEY(cUsername) REFERENCES users(name)
);

CREATE TABLE subcomments(
  subcomment_id INTEGER PRIMARY KEY,
  thread_id INTEGER,
  sUsername TEXT,
  comment_id INTEGER,
  subcomment TEXT,
  sVotes INTEGER,
  sShow INTEGER,
  created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(thread_id) REFERENCES threads(id),
  FOREIGN KEY(comment_id) REFERENCES comments(id),
  FOREIGN KEY(sUsername) REFERENCES users(name)
);

PRAGMA foreign_keys = ON;
