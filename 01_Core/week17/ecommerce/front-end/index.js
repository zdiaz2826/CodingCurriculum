//calling the functions on page load
window.onload = function () {
  //calls the GET request for featured products to display
  featuredProducts();
  //calls the slideshow function that displays the pictures of the models
  slideShow();
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

/******************* SlideShow ********************/

//array that hold the images to the slideshow
var imgArray = [
  'banner4.jpg',
  'banner5.jpg',
  'banner6.jpg'
]

//declarind a variable to hold the current index of the slideshow
let curIndex = 0;

//variable that hold the timeframe between each picture in slideshow
let imgDuration = 3000;

//function that flips through the pictures in the array and displays them in a slideshow
function slideShow() {
  //selecting the current image in the slideshow and assigning it to index 0 of the imgArray
  document.getElementById('image1').src = imgArray[curIndex];
  //incrementing by 1 to get the next image in the array
  curIndex++;
  //when we get to the last image at index 2 the value of curIndex will be assigned to 0 again
  if (curIndex == imgArray.length) { 
    curIndex = 0;
   }
   //setting the timeframe between pictures in the slideshow
  setTimeout("slideShow()", imgDuration);
}


/**************** Display featured products ***********/

//function to get featured products
function featuredProducts() {
  //making a GET request to the endpoint "/" in my API
  fetch('http://localhost:8020/')
  //translate the response to JSON 
  .then(response => { 
      return response.json()
  })
  .then(data => {
    //loop through the reponse and assign the products to var products
      for (i = 0; i < data.length; i++) {
        var products = `<figure>
                            <img class="featured1" src="image${data[i].imgNum}.jpg" alt="${data[i].description}"/>
                            <figcaption>${data[i].product_name}</figcaption>
                        </figure>`
        document.getElementById('featured-div').innerHTML+=products // select the empty div and injeect the variable products.
      }
    }
)}
