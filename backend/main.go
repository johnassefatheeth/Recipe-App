package main

import (
	"context"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/machinebox/graphql"
	"net/http"
)

type User struct {
	Name     string `json:"name"`
	UserName string `json:"UserName"`
	Password string `json:"password"`
}

func main() {
	// Create a new http.Client with custom headers
	client := &http.Client{
		Transport: &http.Transport{},
	}

	// Create a new graphql.Client with the customized http.Client
	gqlClient := graphql.NewClient("http://localhost:8080/v1/graphql", graphql.WithHTTPClient(client))

	// Create a Gin router
	router := gin.Default()

	// Add CORS middleware
	router.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(200)
			return
		}
		c.Next()
	})

	// Define a route to perform a GraphQL request
	router.GET("/graphql-request", func(c *gin.Context) {
		// Get the query parameters from the request
		email := c.Query("email")
		password := c.Query("password")

		// Define your GraphQL query or mutation
		query := fmt.Sprintf(`query LoginQuery {
			food_recipe_Users(where: { email: "%s", password: "%s" }) {
			  name
			  UserName
			  password
			}
		  }`, email, password)

		// Create a new request using the client
		req := graphql.NewRequest(query)

		// Set custom headers for the GraphQL request
		req.Header.Set("x-hasura-admin-secret", "myadminsecretkey")
		req.Header.Set("content-type", "application/json")

		// Perform the GraphQL request
		var response struct {
			Data struct {
				Users []User `json:"food_recipe_Users"`
			} `json:"data"`
		}
		if err := gqlClient.Run(context.Background(), req, &response); err != nil {
			// Handle error
			c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("GraphQL request failed: %s", err)})
			return
		}

		// Access the users from the response
		users := response.Data.Users

		c.JSON(http.StatusOK, gin.H{"users": users})
	})

	// Run the Gin server
	router.Run(":8088")
}