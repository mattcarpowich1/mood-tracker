package db

import (
  "database/sql"
  "fmt"
  "time"
)

var (
  // db connection handle 
  DBCon *sql.DB
)

type User struct {
  ID int
  Username string
  Email string
  PasswordHash string
  PasswordSalt string
  CreatedAt time.Time
  UpdatedAt time.Time
  LastLogin time.Time
}

type UserId struct {
  ID int
}

func InsertUser(db *sql.DB, user *User) (error, int) {
  query := `  
    INSERT INTO users (username, email, passwordHash,
    passwordSalt, createdAt, updatedAt, lastLogin)  
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id`

  id := 0

  err := db.QueryRow(
    query, 
    user.Username, 
    user.Email,
    user.PasswordHash, 
    user.PasswordSalt, 
    user.CreatedAt, 
    user.UpdatedAt, 
    user.LastLogin).Scan(&id)

  if err != nil {
    return err, -1
  }

  fmt.Println("New user added!")

  return nil, id
}

func FindUser(db *sql.DB, id *UserId) (error, User) {
  query := `
    SELECT username, email, createdat, updatedat, lastlogin
    FROM users WHERE id=$1`

  stmt, err := db.Prepare(query)
  if err != nil {
    panic(err)
  }

  user := User{}

  err = stmt.QueryRow(id.ID).Scan(
    &user.Username,
    &user.Email,
    &user.CreatedAt,
    &user.UpdatedAt,
    &user.LastLogin)

  if err != nil {
    return err, user
  }

  return nil, user
}