/******************** Nav bar *****************************/
// Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon 
function navFunction() {
  //selects the navigation bar by ID
  var x = document.getElementById("myTopnav");
  // if the class name of that element in the html is "topnav"
  if (x.className === "topnav") {
    //add the responsive class
    x.className += " responsive";
  } else {
    //otherwise class name is "topbnav"
    x.className = "topnav";
  }
}


/******* CONTACT PAGE FORM VALIDATION  *******/

//function is called on submit to check input fields
function checkForm() {
//creating a variable for each input field
var firstName = document.forms["contact-form"]["first-name"].value;
var lastName = document.forms["contact-form"]["last-name"].value;
var eMail = document.forms["contact-form"]["e-mail"].value;
var phoneNum = document.forms["contact-form"]["phone"].value;
var textArea = document.forms["contact-form"]["comments"].value;
  //checking to see if the urser left a blank input field
  if (firstName == '' || lastName == "" || eMail == "" || phoneNum == "" || textArea == ""){
    //alerting the user if the input field is empty.
    alert("Error: Input field is empty!")
    event.preventDefault(); //preventing the form from submiting
    return false;
  }
}



/*********** POST REQUEST ***********/

//empty array to store value from check boxes
var checkboxArr = []

// empty string to hold string value of check boxes
var howDidYou = ""

//checks for which boxes are checked
function printChecked(){
  // get all the checkboxes
  var items = document.getElementsByName('checkbox')
  //loop through the checkboxes
  for(i = 0; i < items.length; i++){
    // check which checkboxes are checked
    if(items[i].type=='checkbox' && items[i].checked==true)
      //push the values of the checked boxes to an array
      checkboxArr.push(items[i].value)
  } 
  // re-assign the array to a string
  howDidYou = checkboxArr.toString()
}


// //this function is executed when the user clicks the submit button 
function postData() {

  //calling printChecked to getthe value from checkboxes 
  printChecked()

  // each varibale stores the input from the user
  var firstName = document.getElementById('first-name').value;
  var lastName = document.getElementById('last-name').value;
  var email = document.getElementById('e-mail').value;
  var phone = document.getElementById('phone').value;
  var message = document.getElementById('comments').value;

  //storing the data from radio button checked by user
  var contactMethod = ""
  if (document.getElementById('by-phone').checked === true) {
    var contactMethod = "phone"
  }
  else {
    var contactMethod = "email"
  }

 //POST request 
  fetch('http://localhost:8020/contact', {
    method: "post",
    body: JSON.stringify({first_name:firstName, last_name:lastName, email:email, phone:phone, contact_method:contactMethod, how_did_you:howDidYou, message:message})
  }).then(res => {
     return res.json()
  }).then(res => {
    console.log('Success')
  })
  //redirecting the user to a thank you pager after the form is submitted.
  location.assign("thanks.html")
}
