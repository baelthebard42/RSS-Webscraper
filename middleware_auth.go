package main

import (
	"fmt"
	"net/http"

	"github.com/baelthebard42/RSS-Webscraper/internal/auth"
	"github.com/baelthebard42/RSS-Webscraper/internal/database"
)

type authHandler func(http.ResponseWriter, *http.Request, database.User)

func (apiCfg *apiConfig) middlewareAuth(handler authHandler) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
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
		handler(w, r, user)
	}
}
