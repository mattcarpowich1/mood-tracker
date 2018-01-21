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
  email varchar(100) not null UNIQUE,
  passwordHash varchar(1000) not null,
  passwordSalt varchar(1000),
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW(),
  lastLogin TIMESTAMP DEFAULT NOW() 
);
