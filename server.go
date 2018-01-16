package main  

import (
  "net/http"
  "log"
)

func main() {
  http.Handle("/", http.FileServer(http.Dir("./client/build")))
  log.Printf("Listening on port 8080...")
  http.ListenAndServe(":8080", nil)
}


