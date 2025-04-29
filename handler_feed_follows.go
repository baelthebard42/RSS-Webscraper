package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/baelthebard42/RSS-Webscraper/internal/database"
	"github.com/go-chi/chi"
	"github.com/google/uuid"
)

func (apiCfg *apiConfig) handleCreateFeedFollow(w http.ResponseWriter, r *http.Request, user database.User) {
	type parameters struct {
		FeedID uuid.UUID `json:"fid"`
	}

	params := parameters{}

	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&params)

	if err != nil {
		respondWithError(w, 400, "Error parsing JSOn")
		return
	}

	feed, err := apiCfg.DB.CreateFeedFollow(r.Context(), database.CreateFeedFollowParams{
		ID:        uuid.New(),
		CreatedAt: time.Now().UTC(),
		UpdatedAt: time.Now().UTC(),
		UserID:    user.ID,
		FeedID:    params.FeedID,
	})

	if err != nil {
		log.Println("Error creating feed follow", err)
		respondWithError(w, 500, fmt.Sprint("COuldnt create feed follow", err))
		return
	}

	respondWithJSON(w, 201, dbFFtoFF(feed))

}

func (apiCfg *apiConfig) handleGetFeedFollow(w http.ResponseWriter, r *http.Request, user database.User) {

	feedfollows, err := apiCfg.DB.GetFeedFollows(r.Context(), user.ID)

	if err != nil {
		log.Println("Error retrieving feed follow", err)
		respondWithError(w, 500, fmt.Sprint("COuldnt retrieve feed follow", err))
		return
	}

	respondWithJSON(w, 200, dbFFstoFFs(feedfollows))

}

func (apiCfg *apiConfig) handleDeleteFeedFollow(w http.ResponseWriter, r *http.Request, user database.User) {

	feedfollowIDstr := chi.URLParam(r, "feedfollow_id")
	ffid, err := uuid.Parse(feedfollowIDstr)

	if err != nil {
		respondWithError(w, 400, fmt.Sprint("Couldnt parse feed follow id: ", err))
		return
	}

	err = apiCfg.DB.DeleteFeedFollow(r.Context(), database.DeleteFeedFollowParams{
		ID:     ffid,
		UserID: user.ID,
	})

	if err != nil {
		log.Println("Error deleting feed follow", err)
		respondWithError(w, 500, fmt.Sprint("COuldnt retrieve feed follow", err))
		return
	}

	respondWithJSON(w, 200, struct{}{})

}
