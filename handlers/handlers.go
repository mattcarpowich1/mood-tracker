package handlers

import (
  "net/http"
  "encoding/json"
  "database/sql"
  "github.com/mattcarpowich1/mood-tracker/db"
  "time"
)

var err error

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

    err = db.InsertUser(dbCon, &user)
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