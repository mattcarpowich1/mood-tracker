package main  

import (
  "net/http"
  "log"
  "github.com/waldenism/mood-tracker/handlers"
  "github.com/waldenism/mood-tracker/db"
  "database/sql"
  "github.com/gorilla/mux"
  _ "github.com/lib/pq"
)

const connectionString = `
  user=christopherwalden
  dbname=moodtrackerdb
  sslmode=disable`

//\\\\\\\\\\\\\\\\\\\\\\
//****  BACKEND BY  ****
//*** mattcarpowich1 ***
//**********************
/*/                 /*/
/*\................/*/
/*/               /*/
/*\............../*/
/*/             /*/
/*\............/*/

func main() {
  var err error

  db.DBCon, err = sql.Open("postgres", connectionString)
  if err != nil {
    panic(err)
  }

  router := mux.NewRouter()
  router.HandleFunc("/user/add", handlers.AddUser(db.DBCon)).Methods("POST")
  router.HandleFunc("/user/fetch", handlers.FetchUser(db.DBCon)).Methods("POST")
  router.HandleFunc("/user/login", handlers.LoginUser(db.DBCon)).Methods("POST")
  router.PathPrefix("/").Handler(http.FileServer(http.Dir("./client/build")))
  http.Handle("/", router)

  log.Fatal(http.ListenAndServe(":8080", router))

}
