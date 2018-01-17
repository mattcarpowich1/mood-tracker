package handlers

import (
  "net/http"
  "encoding/json"
  "database/sql"
  "github.com/mattcarpowich1/mood-tracker/db"
  "time"
)

type User struct {
  Username string
  Password string
  CreatedAt time.Time
}

var err error

func CreateUser(dbCon *sql.DB) http.HandlerFunc {

  fn := func(w http.ResponseWriter, r *http.Request) {

    // initialize empty user
    user := User{}

    // parse json request body and use it to set fields on user
    // user is passed as a pointer variable so its fields can be modified 
    err := json.NewDecoder(r.Body).Decode(&user)
    if err != nil {
      panic(err)
    }

    err = db.InsertUser(dbCon)
    if err != nil {
      panic(err)
    }

    // set created at field on user to current local time
    user.CreatedAt = time.Now().Local()

    // MARSHAL, or convert user object back to json and 
    // write to response
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