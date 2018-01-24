# RUN THE FOLLOWING COMMANDS 
# ======================================== #
# 1) cd db/                                #
# 2) dropdb moodtrackerdb                  #
# 3) psql -U <username> -a -f create.sql   #
# ======================================== #

DROP DATABASE IF EXISTS moodtrackerdb;

CREATE DATABASE moodtrackerdb;

\c moodtrackerdb;

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  username varchar(100) not null UNIQUE,
  firstName varchar(100) not null,
  email varchar(100) not null UNIQUE,
  passwordHash varchar(1000) not null,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW(),
  lastLogin TIMESTAMP DEFAULT NOW() 
);

CREATE TABLE moods (
  ID SERIAL PRIMARY KEY,
  value INT not null,
  userID INT not null REFERENCES users(ID),
  CHECK (value >= 0 AND value < 11),
  createdAt TIMESTAMP DEFAULT NOW()
);
