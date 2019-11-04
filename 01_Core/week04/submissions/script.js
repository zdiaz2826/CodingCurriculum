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
/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function navFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}



  /* Form Validation*/
  function checkForm() {
    var firstName = document.forms["contact-form"]["first-name"].value;
    var lastName = document.forms["contact-form"]["last-name"].value;
    var eMail = document.forms["contact-form"]["e-mail"].value;
    var phoneNum = document.forms["contact-form"]["phone"].value;
    var textArea = document.forms["contact-form"]["comments"].value;
      if (firstName == '' || lastName == "" || eMail == "" || phoneNum == "" || textArea == ""){
        alert("Error: Input field is empty!")
        return false;
      }
  }

 
