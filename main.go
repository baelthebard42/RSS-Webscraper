package main

import (
	_ "fmt"
	"log"
	"net/http"
	"os"

	"github.com/go-chi/chi"
	"github.com/go-chi/cors"
	"github.com/joho/godotenv"
)

func main() {

	godotenv.Load() //loading env file
	portString := os.Getenv("PORT")

	if portString == "" {
		log.Fatal("PORT variable not defined in env file or env file not present")
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

	server := &http.Server{
		Handler: router,
		Addr:    ":" + portString,
	}

	log.Printf("Server started at port %v", portString)
	err := server.ListenAndServe()

	if err != nil {
		log.Fatal(err)
	}

}
