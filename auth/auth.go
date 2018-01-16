package auth

import (
  "net/http"
  "encoding/json"
  "time"
)

type User struct {
  Username string
  Password string
  CreatedAt time.Time
}

func Register(w http.ResponseWriter, r *http.Request) {

  // initialize empty user
  user := User{}

  // parse json request body and use it to set fields on user
  // user is passed as a pointer variable so its fields can be modified 
  err := json.NewDecoder(r.Body).Decode(&user)
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