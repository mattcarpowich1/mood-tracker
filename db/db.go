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
  id int
  Username string
  Email string
  PasswordHash string
  PasswordSalt string
  CreatedAt time.Time
  UpdatedAt time.Time
  LastLogin time.Time
}

func InsertUser(db *sql.DB, user *User) (error, int) {

  query := `  
    INSERT INTO users (username, email, passwordHash,
    passwordSalt, createdAt, updatedAt, lastLogin)  
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id`

  id := 0

  err := db.QueryRow(query, user.Username, user.Email,
    user.PasswordHash, user.PasswordSalt, user.CreatedAt, 
    user.UpdatedAt, user.LastLogin).Scan(&id)

  if err != nil {
    return err, -1
  }

  fmt.Println("New user added!")

  return nil, id

}