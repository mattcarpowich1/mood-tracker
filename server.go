package main  

import (
  "net/http"
  "os"
  "github.com/mattcarpowich1/mood-tracker/controllers"
  "github.com/mattcarpowich1/mood-tracker/db"
  "database/sql"
  "github.com/gorilla/handlers"
  "github.com/gorilla/mux"
  _ "github.com/lib/pq"
)

const connectionString = `
  user=matthewcarpowich
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
  router.HandleFunc("/user/add", controllers.AddUser(db.DBCon)).Methods("POST")
  router.HandleFunc("/user/fetch", controllers.FetchUser(db.DBCon)).Methods("POST")
  router.HandleFunc("/user/login", controllers.LoginUser(db.DBCon)).Methods("POST")
  router.HandleFunc("/mood/add", controllers.AddMood(db.DBCon)).Methods("POST")
  router.HandleFunc("/mood/fetch/hour", controllers.FetchMoodsLastHour(db.DBCon)).Methods("POST")
  router.PathPrefix("/").Handler(http.FileServer(http.Dir("./client/build")))
  http.FileServer(http.Dir("./client/build"))
  http.Handle("/", router)

  http.ListenAndServe(":8080", handlers.LoggingHandler(os.Stdout, router))

}
