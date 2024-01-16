package main

import (
	"context"
	"fmt"
	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"github.com/machinebox/graphql"
	"golang.org/x/crypto/bcrypt"
	"net/http"
)

type User struct {
	Name     string `json:"name"`
	UserName string `json:"UserName"`
	Password string `json:"password"`
}

func GenerateJWTToken(userID interface{}) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": userID,
		// Add other claims if needed
	})

	// Replace "your-secret-key" with a secret key for signing the token
	tokenString, err := token.SignedString([]byte("your-secret-key"))
	if err != nil {
		return "", err
	}

	return tokenString, nil
}

func main() {
	client := &http.Client{
		Transport: &http.Transport{},
	}

	gqlClient := graphql.NewClient("http://localhost:8080/v1/graphql", graphql.WithHTTPClient(client))

	router := gin.Default()

	router.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization,email,password")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(200)
			return
		}
		c.Next()
	})

	router.GET("/graphql-request", func(c *gin.Context) {
		email := c.GetHeader("email")
		password := c.GetHeader("password")

		query := fmt.Sprintf(`query LoginQuery {
			food_recipe_Users(where: { email: { _eq: "%s" } }) {
				id
				password
			}
		}`, email)

		req := graphql.NewRequest(query)
		req.Header.Set("x-hasura-admin-secret", "myadminsecretkey")
		req.Header.Set("content-type", "application/json")

		var response struct {
			FoodRecipeUsers []struct {
				ID       interface{} `json:"id"`
				Password string      `json:"password"`
			} `json:"food_recipe_Users"`
		}

		if err := gqlClient.Run(context.Background(), req, &response); err != nil {
			c.JSON(http.StatusOK, gin.H{"error": fmt.Sprintf("GraphQL request failed: %s", err)})
			return
		}

		if len(response.FoodRecipeUsers) == 0 {
			c.JSON(http.StatusOK, gin.H{"error": "User not found"})
			return
		}

		// Get the hashed password from the response
		hashedPassword := response.FoodRecipeUsers[0].Password

		// Compare the hashed password with the provided password
		err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
		if err != nil {
			c.JSON(http.StatusOK, gin.H{"error": "Invalid password"})
			return
		}

		// Password is valid
		userID := response.FoodRecipeUsers[0].ID
		token, err := GenerateJWTToken(userID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate JWT token"})
			return
		}

		c.JSON(http.StatusOK, gin.H{"user_id": userID, "token": token})
	})

	router.Run(":8088")
}
