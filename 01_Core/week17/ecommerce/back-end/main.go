package main

import (
	//database/sql does not know what flavor of sql you intend to use. So we also import the go-sql-driver/mysql driver to tell it we're using mysql instead of postgres or mssql or something else.
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"

	// Because we don't call mysql directly, but database/sql uses it, we need to import it and ignore it with the underscore in front
	_ "github.com/go-sql-driver/mysql"
)

//the port that the api is running on
var port = "8020"

//a global database variable as a pointer. We use a pointer so we don't have to create a bunch of copies of our database connection.
var db *sql.DB

// Product struct to hold the values of the db
type Product struct {
	ID            int64  `json:"id"`
	ProductTypeID int64  `json:"product_type_id"`
	PrdoductName  string `json:"product_name"`
	Price         int64  `json:"price"`
	Description   string `json:"description"`
	Image         int64  `json:"imgNum"`
}

// Message struct to hold the values from the POST request
type Message struct {
	ID            int64  `json:"id"`
	FirstName     string `json:"first_name"`
	LastName      string `json:"last_name"`
	Email         string `json:"email"`
	Phone         string `json:"phone"`
	ContactMethod string `json:"contact_method"`
	HowDidYou     string `json:"how_did_you"`
	Message       string `json:"message"`
}

func main() {

	//NEVER COMMIT REAL CREDENTIALS TO GITHUB.
	database, err := sql.Open("mysql", "root:Redventures123@tcp(localhost:3306)/products?charset=utf8")
	if err != nil {
		panic(err)
	}
	//assign the database connection we created to t$he global variable db
	db = database

	//Always close your connection with a defer right after opening. Defer will run the db.Close when the function main() completes.
	defer db.Close()

	//define which function handles which route
	http.HandleFunc("/products", handleRequest)
	//handles POST request
	http.HandleFunc("/contact", handleRequest2)

	//need an application to run to constantly listen
	fmt.Printf("Listening on port %s\n", port)
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		panic(err)
	}
}

// Cross Origin Resource Sharing. This allows the API to be accessible by JavaScript in-browser client-side code.
func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}

//This is the handler for the path "/products"
func handleRequest(w http.ResponseWriter, r *http.Request) {

	//if the HTTP method is a GET request, we want to get the products from the DB
	if r.Method == http.MethodGet {
		//define a slice of products to hold all the rows that come back from the database.
		products := []Product{}

		enableCors(&w)

		//write a query to send to the database. It's best practice to list all columns individually instead of `SELECT *` because the columns in the table can change.
		query := `SELECT id, product_type_id, product_name, price, description, imgNum FROM hair_products`

		//Use db.Query when you expect to get back multiple rows
		rows, err := db.Query(query)
		//always, always check your errors
		if err != nil {
			fmt.Println(err)
			//this return statement prevents the rest of the code below here from executing.
			return
		}

		// This structure is looping over the rows returned from the db.Query using rows.Next(). rows.Next() returns true if there's still a row left to deal with
		for rows.Next() {
			//create a products to store the row into.
			var product Product
			//scan each column
			err := rows.Scan(&product.ID, &product.ProductTypeID, &product.PrdoductName, &product.Price, &product.Description, &product.Image)
			//always check your errors
			if err != nil {
				fmt.Println(err)
				return
			}
			//add the product we created from this row to the slice of product we created earlier
			products = append(products, product)
		}

		//add an http status header reflecting the outcome of the request to the ResponseWriter
		w.WriteHeader(http.StatusOK)
		//Make the ResponseWriter into a json encoder, then encode the products slice into json and send the response.
		json.NewEncoder(w).Encode(products)
	}
}

//This is the handler for the path "/contact"
func handleRequest2(w http.ResponseWriter, r *http.Request) {
	//If the request was an http POST request
	if r.Method == http.MethodPost {
		//create a message variable to hold the incoming request
		var message Message

		enableCors(&w)

		//read the request body with a json decoder and store into the message variable just created
		json.NewDecoder(r.Body).Decode(&message)

		//insert query with `?` to parameterize values to protect from sql injection
		query := `INSERT INTO new_message (first_name, last_name, email, phone, contact_method, how_did_you, message) values (?,?,?,?,?,?,?)`
		//using db.Exec for inserts returns a Result, not a row. Give it a query plus the parameters that will replace each `?` in the query string
		res, err := db.Exec(query, message.FirstName, message.LastName, message.Email, message.Phone, message.ContactMethod, message.HowDidYou, message.Message)
		//for real though, catch those errors.
		if err != nil {
			fmt.Println(err)
			return
		}
		//if there wasn't an error, then there was no problem connecting to the database and running the query.
		// You can then use the Result, res, to find out what happened. LastInsertId returns the auto-incremented id for the item that you just saved.
		id, err := res.LastInsertId()
		//Catchin' those errors
		if err != nil {
			fmt.Println(err)
			return
		}
		// now that you have the last inserted ID, you can save it to the user that came in on the original request.
		message.ID = id

		//Because we successfully saved the data, let the caller know the item was created with a HTTP status code 201 Created
		w.WriteHeader(http.StatusCreated)

		//Use the writer (w) to create a json encoder and encode the data that was saved and respond to the caller with json.
		json.NewEncoder(w).Encode(message)

	}
}
