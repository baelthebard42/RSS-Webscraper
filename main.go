package main

import (
	"database/sql"
	_ "fmt"
	"log"
	"net/http"
	"os"

	"github.com/baelthebard42/RSS-Webscraper/internal/database"
	"github.com/go-chi/chi"
	"github.com/go-chi/cors"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

type apiConfig struct {
	DB *database.Queries
}

func main() {

	godotenv.Load() //loading env file
	portString := os.Getenv("PORT")

	if portString == "" {
		log.Fatal("PORT variable not defined in env file or env file not present")
	}

	dbURL := os.Getenv("DB_URL")

	if dbURL == "" {
		log.Fatal("DB_URL variable not defined in env file or env file not present")
	}

	connection, err := sql.Open("postgres", dbURL)

	if err != nil {
		log.Fatal("Cant connect to db", err)
	}

	apiCfg := apiConfig{ // this api handler can be passed to our endpoints to access the database
		DB: database.New(connection),
	}

	//fmt.Println("Using Port", portString)

	router := chi.NewRouter()

	router.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"https://*", "http://*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"*"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: false,
		MaxAge:           300,
	}))

	v1Router := chi.NewRouter()

	v1Router.Get("/healthz", handlerReadiness)
	v1Router.Get("/error", handlerErr)
	v1Router.Post("/users", apiCfg.handleCreateUser)
	v1Router.Get("/users", apiCfg.handlerGetUserByAPI)

	router.Mount("/v1", v1Router)

	server := &http.Server{
		Handler: router,
		Addr:    ":" + portString,
	}

	log.Printf("Server started at port %v", portString)
	errr := server.ListenAndServe()

	if errr != nil {
		log.Fatal(errr)
	}

}
