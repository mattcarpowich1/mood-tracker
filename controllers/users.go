package controllers

import (
  "net/http"
  "encoding/json"
  "database/sql"
  "time"
  "github.com/waldenism/mood-tracker/db"
  "github.com/dgrijalva/jwt-go"
  "golang.org/x/crypto/bcrypt"
)

var (
  err error
  user db.User
  userIdWithHash db.UserIdWithPasswordHash
)

// secret for JWT, replace with env variable
var mySigningKey = []byte("this-is-a-secret")

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

    user.CreatedAt = time.Now()
    user.UpdatedAt = user.CreatedAt
    user.LastLogin = user.UpdatedAt

    password := []byte(user.PasswordHash)

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
    credentials := db.UserCredentials{}

    err := json.NewDecoder(r.Body).Decode(&credentials)
    if err != nil {
      panic(err)
    }

    err, userIdWithHash = db.FetchByCredentials(dbCon, &credentials)
    if err != nil {
      http.Error(w, "User doesn't exist", 401)
      return
    }

    err = bcrypt.CompareHashAndPassword(
      []byte(userIdWithHash.PasswordHash), 
      []byte(credentials.PasswordHash))

    if err != nil {
      http.Error(w, "Password Incorrect", 401)
      return
    }

    // ***JWT STUFF*** //
    token := jwt.New(jwt.SigningMethodHS256)
    claims := token.Claims.(jwt.MapClaims)
    claims["aud"] = userIdWithHash.ID
    claims["exp"] = time.Now().Add(time.Hour * 24).Unix()
    tokenString, _ := token.SignedString(mySigningKey)

    w.Write([]byte(tokenString))
    
    return
  }

  return fn

}