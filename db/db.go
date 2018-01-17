package db

import (
  "database/sql"
  "fmt"
  "time"
)

var (
    // DBCon is the connection handle
    // for the database
    DBCon *sql.DB
)

type User struct {
  username string
  email string
  passwordHash string
  passwordSalt string
  CreatedAt time.Time
  lastLogin time.Time
}

func InsertUser(db *sql.DB) error {
  sqlStatement := `  
    INSERT INTO users (username, email, passwordHash,
    passwordSalt, createdAt, lastLogin)  
    VALUES ($1, $2, $3, $4, $5, $6)`
  _, err := db.Exec(sqlStatement, "mattcarpowich", "mattcarpowich@gmail.com",
    "aaaa", "bbbb", time.Now(), time.Now())
  if err != nil {
    return err
  }
  fmt.Println("New record!")
  return nil
}