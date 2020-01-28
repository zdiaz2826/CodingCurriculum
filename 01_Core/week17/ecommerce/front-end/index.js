/* Nav bar: Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function navFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

/* SlideShow */
var slideIndex = 0;

showSlides();
function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}


/* display featured products in home page*/
document.addEventListener("DOMContentLoaded",featuredProducts);

function featuredProducts() {
fetch('http://localhost:8020/products')
.then(response => { 
    return response.json()
})
.then(data => {
    for (i = 0; i < 3; i++) {
      var products = `<figure>
                          <img class="featured1" src="image${data[i].imgNum}.jpg" alt="${data[i].description}"/>
                          <figcaption>${data[i].product_name}</figcaption>
                      </figure>`
      document.getElementById('featured-div').innerHTML+=products
    }
  }
)}


