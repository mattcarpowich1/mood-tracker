package handlers

import (
  "net/http"
  "encoding/json"
  "database/sql"
  "time"
  "fmt"
  "github.com/mattcarpowich1/mood-tracker/db"
  "golang.org/x/crypto/bcrypt"
)

var (
  err error
  user db.User
  userIdWithHash db.UserIdWithPasswordHash
)

// CREATE   
// NEW USER!
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

    password := []byte(user.PasswordHash)
    fmt.Println(password)
    fmt.Println(string(password))

    hash, err := bcrypt.GenerateFromPassword(password, 10)
    if err != nil {
      panic(err)
    }

    s := string(hash[:])
    user.PasswordHash = s

    var id int

    err, id = db.InsertUser(dbCon, &user)
    if err != nil {
      panic(err)
    }

    fmt.Println("New user added!")
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

// AUTHENTI-
// CATE USER
// "/user/login"
///////////////
func LoginUser(dbCon *sql.DB) http.HandlerFunc{
  fn := func(w http.ResponseWriter, r *http.Request) {

    w.Header().Set("WWW-Authenticate", `Basic realm="Restricted"`)

    credentials := db.UserCredentials{}

    err := json.NewDecoder(r.Body).Decode(&credentials)
    if err != nil {
      panic(err)
    }

    creds := []byte(credentials.PasswordHash)

    err, userIdWithHash = db.FetchByCredentials(dbCon, &credentials)
    if err != nil {
      fmt.Println("oops!")
      panic(err)
    }

    hash := []byte(userIdWithHash.PasswordHash)

    err = bcrypt.CompareHashAndPassword(hash, creds)
    if err != nil {
      http.Error(w, "Password Incorrect", 401)
      return
    }

    userJson, err := json.Marshal(userIdWithHash.ID)
    if err != nil {
      panic(err)
    }

    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusOK)
    w.Write(userJson)

  }

  return fn

}