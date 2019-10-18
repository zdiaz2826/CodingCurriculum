/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  // Close the dropdown if the user clicks outside of it
  window.onclick = function(e) {
    if (!e.target.matches('.dropbtn')) {
    var myDropdown = document.getElementById("myDropdown");
      if (myDropdown.classList.contains('show')) {
        myDropdown.classList.remove('show');
      }
    }
  }
  // create a alphabetically-sorted list by last name.
// function getNames(){
//     var names = document.getElementById("myText").value;
//     var namesArr = names.split(', ');
//     var sortedNames = namesArr.sort();
//     var fullHTML = sortedNames.join();
//     document.getElementById("list").innerHTML = fullHTML;

// }

// string of full names

var names = ["Ziara Diaz", "Nick Strumpf", "Malcolm Taylor", "Chris Smith"];

var sortedNames = names.sort((a,b) => {
 var aSplit = a.split(' ');
 var aLastName = aSplit[1].toLowerCase();
 var bSplit = b.split(' ');
 var bLastName = bSplit[1].toLowerCase();
 if(aLastName < bLastName) return -1;
 if(aLastName > bLastName) return 1;
 return 0;
})
var id = document.querySelector(".names");
sortedNames.forEach((i)=>{
   var newDiv = document.createElement('ol');
    newDiv.innerHTML = i;
   id.appendChild(newDiv)
})
