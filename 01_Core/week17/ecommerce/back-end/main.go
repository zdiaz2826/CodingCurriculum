package main

import (
	//import this package then import the mysql driver to let it know you will be using mysql.
	"database/sql"
	//this package allows your API to read and send JSON data in between the javascript programs in the browser.
	"encoding/json"
	//import this package to print information to the terminal.
	"fmt"
	//import this package to make HTTP(or HTTPS) requests
	"net/http"

	//importing the Go MySQL driver to have full access to then database/sql package
	_ "github.com/go-sql-driver/mysql"
)

//the port that the api is running on
var port = "8020"

//creating global variable that points to the database connection
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
	database, err := sql.Open("mysql", "root:Redventures123@tcp(database:3306)/products?charset=utf8")
	if err != nil {
		panic(err)
	}
	//assign the database connection we created to the global variable db
	db = database

	//Closing the connecting with defer. defer closes the connection after func main() has completed
	defer db.Close()

	http.HandleFunc("/", handleRequest1)
	//handles GET request
	http.HandleFunc("/products", handleRequest2)
	//handles POST request
	http.HandleFunc("/contact", handleRequest3)

	//printing this line to the terminal so I know it's working
	fmt.Printf("Listening on port %s\n", port)

	//listen on the port for incoming requests/connections
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		panic(err)
	}
}

// Cross Origin Resource Sharing. This allows the API to be accessible by JavaScript in-browser client-side code.
func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}

//This is the handler for the path "/" which is the home page
func handleRequest1(w http.ResponseWriter, r *http.Request) {

	//checking if the request is a GET request.
	if r.Method == http.MethodGet {
		//defining a slice that will hold the data returned from the DB
		products := []Product{}

		//calling the CORS function above to tell the API to allow requests from all.
		enableCors(&w)

		//Query that selects the data being requested by the client.
		query := `SELECT id, product_type_id, product_name, price, description, imgNum FROM hair_products WHERE imgNum <= 3`

		// .Query executes a prepared query statement and returns it as *Rows
		//calling db.Query and passign in the query above, and assigning the data to rows because we expect multuple rows.
		rows, err := db.Query(query)
		//checking for error
		if err != nil {
			fmt.Println(err)
			//this return statement prevents the rest of the code below here from executing.
			return
		}

		// This structure is looping over the rows returned from the db.Query using rows.Next().
		for rows.Next() { //rows.Next() returns true if there's still a row left to deal with

			//create a products to store the row into.
			var product Product
			//scan each column
			err := rows.Scan(&product.ID, &product.ProductTypeID, &product.PrdoductName, &product.Price, &product.Description, &product.Image)
			//checking for errors
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

//This is the handler for the path "/products"
func handleRequest2(w http.ResponseWriter, r *http.Request) {

	//if the HTTP method is a GET request
	if r.Method == http.MethodGet {
		//define a slice of products to hold all the rows that come back from the database.
		products := []Product{}

		//calling the CORS function above to tell the API to allow requests from all.
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
func handleRequest3(w http.ResponseWriter, r *http.Request) {
	//If the request was an http POST request
	if r.Method == http.MethodPost {
		//create a message variable to hold the incoming request
		var message Message

		//calling the CORS function above to tell the API to allow requests from all.
		enableCors(&w)

		//read the request body with a json decoder and store into the message variable just created
		json.NewDecoder(r.Body).Decode(&message)

		//insert query with `?` to protect from sql injection
		query := `INSERT INTO new_message (first_name, last_name, email, phone, contact_method, how_did_you, message) values (?,?,?,?,?,?,?)`

		//using db.Exec resturns a result telling you the rows affected. Below we are inserting the data received from the client.
		res, err := db.Exec(query, message.FirstName, message.LastName, message.Email, message.Phone, message.ContactMethod, message.HowDidYou, message.Message)

		//if there wasn't an error, then there was no problem connecting to the database and running the query.
		if err != nil {
			fmt.Println(err)
			return
		}

		// getting the id of the last row inserted to see what happened.
		id, err := res.LastInsertId()
		//Checking for errors
		if err != nil {
			fmt.Println(err)
			return
		}
		//assigning the auto-incremented id to message ID .
		message.ID = id

		//When the data is successfully saved respond with a HTTP status code 201 created
		w.WriteHeader(http.StatusCreated)

		//Use the writer (w) to create a json encoder and encode the data that was saved and respond to the caller with json.
		json.NewEncoder(w).Encode(message)

	}
}
