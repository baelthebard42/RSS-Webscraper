package main

import (
	"log"
	"time"

	"github.com/baelthebard42/RSS-Webscraper/internal/database"
)

func startScraping(
	db *database.Queries, concurrency int, timeBetweenRequest time.Duration) {
	log.Printf("Scraping on %v goroutines every %s duration", concurrency, timeBetweenRequest)

	ticker := time.NewTicker(timeBetweenRequest)

}
