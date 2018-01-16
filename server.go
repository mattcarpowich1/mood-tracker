package main  

import (
  "net/http"
  "log"
  "github.com/mattcarpowich1/mood-tracker/auth"
  "github.com/gorilla/mux"
)

func main() {
  router := mux.NewRouter()
  router.HandleFunc("/register", auth.Register).Methods("POST")
  router.PathPrefix("/").Handler(http.FileServer(http.Dir("./client/build")))
  http.Handle("/", router)
  log.Fatal(http.ListenAndServe(":8080", router))
}


