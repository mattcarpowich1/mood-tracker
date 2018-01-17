package handlers

import (
  "net/http"
  "encoding/json"
  "database/sql"
  "github.com/mattcarpowich1/mood-tracker/db"
  "time"
)

type userId struct {
  ID int
}

var err error

// FETCH
// USER BY ID
// @mattcarpowich1
//////////////////
func FetchUser(dbCon *sql.DB) http.HandlerFunc {
  fn := func(w http.ResponseWriter, r *http.Request) {

    _id := userId{}

    err := json.NewDecoder(r.body).Decode(&_id)
    if err != nil {
      panic(err)
    }

    err, user = db.FindUser(dbCon, &_id)

  }
}

// INSERTS   
// NEW USER
// @mattcarpowich1
//////////////////
func AddUser(dbCon *sql.DB) http.HandlerFunc {
  fn := func(w http.ResponseWriter, r *http.Request) {

    user := db.User{}

    err := json.NewDecoder(r.Body).Decode(&user)
    if err != nil {
      panic(err)
    }

    user.CreatedAt = time.Now().Local()
    user.UpdatedAt = user.CreatedAt
    user.LastLogin = user.UpdatedAt

    var id int

    err, id = db.InsertUser(dbCon, &user)
    if err != nil {
      panic(err)
    }

    result := userId{id}

    userIdJson, err := json.Marshal(result)
    if err != nil {
      panic(err)
    }

    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusOK)
    w.Write(userIdJson)

  }

  return fn

}