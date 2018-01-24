package controllers

import (
  "net/http"
  "encoding/json"
  "database/sql"
  "time"
  "fmt"
  "github.com/mattcarpowich1/mood-tracker/db"
)

var (
  userId db.UserId
  mood db.Mood
  moods db.Moods
  moodId db.MoodId
)

func AddMood(dbCon *sql.DB) http.HandlerFunc {
  fn := func(w http.ResponseWriter, r *http.Request) {
    err = json.NewDecoder(r.Body).Decode(&mood)
    if err != nil {
      panic(err)
    }

    mood.CreatedAt = time.Now()

    err, moodId = db.AddMood(dbCon, &mood)
    if err != nil {
      panic(err)
    }

    moodIdJson, err := json.Marshal(moodId)
    if err != nil {
      panic(err)
    }

    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusOK)
    w.Write(moodIdJson)
  }

  return fn

}

func FetchMoodsLastHour(dbCon *sql.DB) http.HandlerFunc {
  fn := func(w http.ResponseWriter, r *http.Request) {
    err = json.NewDecoder(r.Body).Decode(&userId)
    if err != nil {
      panic(err)
    }

    fmt.Println(userId)

    err, moods = db.FindMoodsHour(dbCon, &userId)
    if err != nil {
      panic(err)
    }

    moodsJson, err := json.Marshal(moods)
    if err != nil {
      panic(err)
    }

    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusOK)
    w.Write(moodsJson)
  }

  return fn

}