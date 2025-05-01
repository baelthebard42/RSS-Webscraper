package main

import (
	"time"

	"github.com/baelthebard42/RSS-Webscraper/internal/database"
	"github.com/google/uuid"
)

type User struct {
	ID        uuid.UUID `json:"id"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	Name      string    `json:"name"`
	APIKey    string    `json:"api_key"`
}

func dbUsertoUser(dbUser database.User) User {
	return User{
		ID:        dbUser.ID,
		CreatedAt: dbUser.CreatedAt,
		UpdatedAt: dbUser.UpdatedAt,
		Name:      dbUser.Name,
		APIKey:    dbUser.ApiKey,
	}
}

type Feed struct {
	ID        uuid.UUID `json:"id"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	Name      string    `json:"name"`
	URL       string    `json:"url"`
	UserID    uuid.UUID `json:"user_id"`
}

func dbFeedtoFeed(dbFeed database.Feed) Feed {
	return Feed{
		ID:        dbFeed.ID,
		CreatedAt: dbFeed.CreatedAt,
		UpdatedAt: dbFeed.UpdatedAt,
		Name:      dbFeed.Name,
		URL:       dbFeed.Url,
		UserID:    dbFeed.UserID,
	}
}

func dbFeedstoFeeds(dbFeeds []database.Feed) []Feed {

	feeds := []Feed{}
	for _, dbFeed := range dbFeeds {
		feeds = append(feeds, dbFeedtoFeed(dbFeed))
	}
	return feeds
}

type FeedFollow struct {
	ID        uuid.UUID `json:"id"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	UserID    uuid.UUID `json:"user_id"`
	FeedID    uuid.UUID `json:"feed_id"`
}

func dbFFtoFF(dbFF database.FeedFollow) FeedFollow {
	return FeedFollow{
		ID:        dbFF.ID,
		CreatedAt: dbFF.CreatedAt,
		UpdatedAt: dbFF.UpdatedAt,
		UserID:    dbFF.UserID,
		FeedID:    dbFF.FeedID,
	}
}

func dbFFstoFFs(dbFFs []database.FeedFollow) []FeedFollow {
	feedfollows := []FeedFollow{}
	for _, dbFF := range dbFFs {
		feedfollows = append(feedfollows, dbFFtoFF(dbFF))
	}
	return feedfollows
}

type Post struct {
	ID          uuid.UUID `json:"id"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
	Title       string    `json:"title"`
	Description *string   `json:"description"`
	PublishedAt time.Time `json:"pubdate"`
	URL         string    `json:"url"`
	FeedID      uuid.UUID `json:"feed_id"`
}

func dbPosttoPost(dbPost database.Post) Post {

	var description *string
	if dbPost.Description.Valid {
		description = &dbPost.Description.String
	}

	return Post{
		ID:          dbPost.ID,
		CreatedAt:   dbPost.CreatedAt,
		UpdatedAt:   dbPost.UpdatedAt,
		Title:       dbPost.Title,
		Description: description,
		PublishedAt: dbPost.PublishedAt,
		URL:         dbPost.Url,
		FeedID:      dbPost.FeedID,
	}
}

func dbPoststoPosts(dbPosts []database.Post) []Post {
	posts := []Post{}
	for _, dbpost := range dbPosts {
		posts = append(posts, dbPosttoPost(dbpost))
	}
	return posts
}
