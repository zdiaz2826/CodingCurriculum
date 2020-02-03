//calling the functions on page load
window.onload = function () {
  //calling the fuction that gets all the products
  getData()
}

/******************** Nav bar *****************************/

// Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon 
function navFunction() {
  //selects the navigation bar by ID
  var x = document.getElementById("myTopnav");
  // if the class name of x is "topnav" in the html file
  if (x.className === "topnav") {
    //add the responsive class, this resizes the nav bar as the screen shrinks or stretches.
    x.className += " responsive";
  } else {
    //if the class name is not "topnav" make the class name "topnav"
    x.className = "topnav";
  }
}

//this function gets data from API then loops thorugh it to display the products
function getData() {
  fetch('http://localhost:8020/products')
  .then(response => { 
      return response.json()
  })
  .then(data => {
    for (i = 0; i < data.length; i++) {
        var products = `<figure class="individual_row" id="${data[i].product_type_id}"> 
                            <a href="details.html"><img class="products" src="image${data[i].imgNum}.jpg" alt="${data[i].description}"/></a>
                            <figcaption>${data[i].product_name}</figcaption>
                            <figcaption>$${data[i].price}</figcaption>
                        </figure> `
        document.getElementById('empty-div').innerHTML+=products
    }
    console.log(data)
  }).catch(error => {
    console.log(error)
  })
}


//function to filter products called in products.html line 25
function filterProducts(value) {  //value is the category the user clicks on using drop down menu
   
  let rows = document.getElementById('empty-div').children; //selecting the list of figure elements in the "empty-div tag"

  if (value === "-1") { 

    for (let i = 0; i < rows.length; i++) {  //if the codition is true loop through the figure tags.
      rows[i].setAttribute('style',"display: block"); //set the display property for each figure tag to block.
    }
    
  }else { // otherwise if the value is something other than -1 

    for (let i = 0; i < rows.length; i++) {  // loop through the figure tags

      if(rows[i].id != value) { // if the id of the figure tag does not match the value
        rows[i].setAttribute('style', 'display: none'); // set thee display property for those tags to none
        
      }else { // otherwise if the id of the tag matched the value 
        rows[i].setAttribute('style','display: inline-block'); // set the property for the figure tag to display block
        console.log(rows[i]) // console log the sresults
      }
    }
  } 
}
