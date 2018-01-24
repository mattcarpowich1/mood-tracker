package db

import (
  "database/sql"
  "fmt"
  "time"
)

var (
  // db connection handle 
  DBCon *sql.DB
  val int64
  t time.Time
)

type User struct {
  ID int
  Username string
  FirstName string
  Email string
  PasswordHash string
  CreatedAt time.Time
  UpdatedAt time.Time
  LastLogin time.Time
}

type Mood struct {
  ID int
  Value int  
  UserId int
  CreatedAt time.Time
}

type Moods struct {
  Values []int64
  Times []time.Time
}

type UserId struct {
  ID int
}

type MoodId struct {
  ID int
}

type UserCredentials struct {
  Username string
  PasswordHash string
}

type UserIdWithPasswordHash struct {
  ID int
  PasswordHash string
}

func AddMood(db *sql.DB, mood *Mood) (error, MoodId) {
  query := `
  INSERT INTO moods (value, userId)
  VALUES ($1, $2)
  RETURNING id`

  stmt, err := db.Prepare(query)
  if err != nil {
    panic(err)
  }

  moodId := MoodId{}

  err = stmt.QueryRow(mood.Value, mood.UserId).Scan(&moodId.ID)
  if err != nil {
    return err, moodId
  }

  return nil, moodId

}

func FindMoodsHour(db *sql.DB, userId *UserId) (error, Moods) {
  query := `
  SELECT value, createdat FROM moods
  WHERE userid=$1 AND createdat >= NOW() - '1 day'::INTERVAL
  ORDER BY createdat DESC;`

  moods := Moods{}

  rows, err := db.Query(query, userId.ID)
  if err != nil {
    return err, moods
  }

  var vals []int64
  var times []time.Time

  for rows.Next() {
    rows.Scan(&val, &t)
    vals = append(vals, val)
    times = append(times, t)
  }

  moods.Values = vals
  moods.Times = times

  return nil, moods

}

func InsertUser(db *sql.DB, user *User) (error, int) {
  query := `  
    INSERT INTO users (username, firstname, email, 
    passwordHash, createdAt, updatedAt, lastLogin)  
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id`

  id := 0

  err := db.QueryRow(
    query, 
    user.Username, 
    user.FirstName,
    user.Email,
    user.PasswordHash, 
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
    SELECT username, firstname, createdat, updatedat, lastlogin
    FROM users WHERE id=$1`

  stmt, err := db.Prepare(query)
  if err != nil {
    panic(err)
  }

  user := User{}

  err = stmt.QueryRow(id.ID).Scan(
    &user.Username,
    &user.FirstName,
    &user.CreatedAt,
    &user.UpdatedAt,
    &user.LastLogin)

  if err != nil {
    return err, user
  }

  return nil, user

}

func FetchByCredentials(db *sql.DB, credentials *UserCredentials) (error, UserIdWithPasswordHash) {
  query := `
    SELECT id, passwordHash 
    FROM users WHERE username=$1`

  stmt, err := db.Prepare(query)
  if err != nil {
    panic(err)
  }

  user := UserIdWithPasswordHash{}

  err = stmt.QueryRow(credentials.Username).Scan(
    &user.ID, 
    &user.PasswordHash)

  fmt.Println(user)

  if err != nil {
    return err, user
  }

  return nil, user

}