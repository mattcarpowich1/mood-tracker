package handlers

import (
  "net/http"
  "encoding/json"
  "database/sql"
  "github.com/mattcarpowich1/mood-tracker/db"
  "time"
)

var (
  err error
  user db.User
)

// INSERT   
// SINGLE USER
// "/user/add"
/////////////
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

    result := db.UserId{id}

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

// FETCH
// USER BY ID
// "user/fetch"
//////////////
func FetchUser(dbCon *sql.DB) http.HandlerFunc {

  fn := func(w http.ResponseWriter, r *http.Request) {

    _id := db.UserId{}

    err := json.NewDecoder(r.Body).Decode(&_id)
    if err != nil {
      panic(err)
    }

    err, user = db.FindUser(dbCon, &_id)
    if err != nil {
      panic(err)
    }

    userJson, err := json.Marshal(user)
    if err != nil {
      panic(err)
    }

    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusOK)
    w.Write(userJson)

  }

  return fn
}