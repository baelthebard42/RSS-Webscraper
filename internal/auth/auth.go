package auth

import (
	"errors"
	"net/http"
	"strings"
)

// GetAPIKey: it extracts api key from header of a request
// looks like: Authorization: ApiKey {key here}
func GetAPIKey(headers http.Header) (string, error) {

	val := headers.Get("Authorization")

	if val == "" {
		return "", errors.New("no auth info given")
	}

	vals := strings.Split(val, " ")

	if len(vals) != 2 {
		return "", errors.New("malformed auth header")
	}

	if vals[0] != "ApiKey" {
		return "", errors.New("malformed first part of auth header")
	}
	return vals[1], nil
}
