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

const connectionString = `
  user=matthewcarpowich
  dbname=moodtrackerdb
  sslmode=disable`

//\\\\\\\\\\\\\\\\\\\\\\
//***  BACKEND BY  *****
//*** mattcarpowich1 ***
//**********************
/*/                 /*/
/*\................/*/
/*/               /*/
/*\............../*/
/*/             /*/
/*\............/*/
/*/           /*/
/*\........../*/
/*/         /*/ 
func main() {

  var err error

  router := mux.NewRouter()

  db.DBCon, err = sql.Open("postgres", connectionString)
  if err != nil {
    panic(err)
  }

  router.HandleFunc("/user/add", handlers.AddUser(db.DBCon)).Methods("POST")
  router.PathPrefix("/").Handler(http.FileServer(http.Dir("./client/build")))
  http.Handle("/", router)
  log.Fatal(http.ListenAndServe(":8080", router))

}
