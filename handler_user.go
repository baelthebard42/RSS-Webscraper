package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/baelthebard42/RSS-Webscraper/internal/auth"
	"github.com/baelthebard42/RSS-Webscraper/internal/database"
	"github.com/google/uuid"
)

func (apiCfg *apiConfig) handleCreateUser(w http.ResponseWriter, r *http.Request) {
	type parameters struct {
		Name string `json:"name"`
	}

	params := parameters{}

	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&params)

	if err != nil {
		respondWithError(w, 400, "Error parsing JSOn")
		return
	}

	user, err := apiCfg.DB.CreateUser(r.Context(), database.CreateUserParams{
		ID:        uuid.New(),
		CreatedAt: time.Now().UTC(),
		UpdatedAt: time.Now().UTC(),
		Name:      params.Name,
	})

	if err != nil {
		log.Println("Error creating user", err)
		respondWithError(w, 500, fmt.Sprint("COuldnt create user", err))
		return
	}

	respondWithJSON(w, 201, dbUsertoUser(user))

}

func (apiCfg *apiConfig) handlerGetUserByAPI(w http.ResponseWriter, r *http.Request) {

	a_key, err := auth.GetAPIKey(r.Header)
	if err != nil {
		respondWithError(w, 400, fmt.Sprint("Auth error", err))
		return
	}

	user, err := apiCfg.DB.GetUserByAPIKey(r.Context(), a_key)

	if err != nil {
		respondWithError(w, 400, fmt.Sprint("Error retrieving user", err))
		return
	}
	respondWithJSON(w, 200, dbUsertoUser(user))
}
