package main  

import (
  "net/http"
  "log"
  "github.com/mattcarpowich1/mood-tracker/handlers"
  "github.com/mattcarpowich1/mood-tracker/db"
  "database/sql"
  "github.com/gorilla/mux"
  _ "github.com/lib/pq"
)

func main() {

  var err error

  router := mux.NewRouter()

  db.DBCon, err = sql.Open("postgres", "user=matthewcarpowich dbname=moodtrackerdb sslmode=disable")
  if err != nil {
    panic(err)
  }

  router.HandleFunc("/user/new", handlers.CreateUser(db.DBCon)).Methods("POST")
  router.PathPrefix("/").Handler(http.FileServer(http.Dir("./client/build")))
  http.Handle("/", router)
  log.Fatal(http.ListenAndServe(":8080", router))
}
