window.addEventListener("load", getData)

function getData() {
  fetch('http://localhost:8020/products')
  .then(response => { 
      return response.json()
  })
  .then(data => {
    for (i = 0; i < data.length; i++) {
        var products = `<figure class="${data[i].description} id="${data[i].product_type_id}"> 
                            <a href="details.html"><img class="products" src="image${data[i].imgNum}.jpg" alt="${data[i].description}"/></a>
                            <figcaption>${data[i].product_name}</figcaption>
                            <figcaption>$${data[i].price}</figcaption>
                        </figure> `
        document.getElementById('empty-div').innerHTML+=products
    }
  })
}


// var dropdown = document.querySelectorAll("#hairproducts")[0];

// dropdown.addEventListener("change",function filterProducts(value) {
//   var figureTag = document.getElementById('empty-div').querySelectorAll('figure');
//   for(i = 0; i < figureTag.length; i++) {
//     figureTag[i].style.display = "block";
//   }
//   if(value.target.value != figureTag.className) {
//     for(i = 0; i < figureTag.length; i++) {
//       figureTag[i].style.display = "none";
//     }
//   }else {
//     figureTag[i].style.display = "block";
//   }
// })











// // calling getData on page load
// window.addEventListener("load", getData)

// class productInfo {
//   constructor(productId, productTypeId, productName, productPrice) {
//     this.productId = productId,
//     this.prductTypeId = productTypeId,
//     this.productName = productName,
//     this.productPrice = productPrice
//   }
// }

// //this function gets data from API then loops thorugh it to display the products
// function getData() {
//   fetch('http://localhost:8020/products')
//   .then(response => { 
//       return response.json()
//   })
//   .then(data => {
//     for (i = 0; i < data.length; i++) {
//         var products = `<figure class="${data[i].description} id="${data[i].product_type_id}"> 
//                             <a href="details.html"><img class="products" src="image${data[i].imgNum}.jpg" alt="${data[i].description}"/></a>
//                             <figcaption>${data[i].product_name}</figcaption>
//                             <figcaption>$${data[i].price}</figcaption>
//                         </figure> `
//         document.getElementById('empty-div').innerHTML+=products
//     }
//   })
// }

 
// function filterProducts(productTypeId) {

// let rows = document.getElementById('empty-div')
//   if (productTypeId === "all") {
//     for (let z = 0; z < rows.length; z++) {
//       rows[z].setAttribute('style',"display: block")
//         console.log('see all is working!')
//     }
//   }else {
//     for (let z = 0; z < rows.length; z++) {
//       if(rows[z].id != productTypeId) {
//         rows[z].setAttribute('style', 'display: none')
//       } else {
//         rows[z].setAttribute('style','display: inline-block')
//       }
//     }
//   } 
// }


// function displayToppings() {
//   for(let i=0;i<toppings.length;i++) {
//     let topping = `<tr id="${toppings[i].typeId}"><td>${toppings[i].typeId}</td><td>${toppings[i].name}</td></tr>`
// document.getElementById("rows").innerHTML += topping
//     }
// }

// displayToppings()


















// var dropdown = document.querySelectorAll("#hairproducts")[0];

// dropdown.addEventListener("change", function(val) {
// var figureTag = document.getElementById('empty-div').querySelectorAll('figure');
// console.log(figureTag)
//     for(i = 0; i < figureTag.length; i++) {
//         figureTag[i].style.display = "block";
//     }
//     for(i = 0; i < figureTag.length; i++) {
//         if( val.target.value != figureTag[i].className) {
//             figureTag[i].style.display = "none";
//         }
//         else {
//             // figureTag[i].style.display = "block";
//         }
//     }
// })






// //calling getData on page load
// document.addEventListener("DOMContentLoaded", getData)

// var dropdown = document.querySelectorAll("#hairproducts")[0];

// //fetched data  from API
// function getData() {
// fetch('http://localhost:8020/products' , {
//     method: 'get',
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//     }
// })
// .then(response => { 
//     return response.json()
// })
// .then(data => {
//     //This function is looping through the data from my database and displaying each obj in the DOM
//    function displayAll() {
//         for (i = 0; i < data.length; i++) {
//             var products = `<figure> 
//                                 <a href="details.html"><img class="products" src="image${data[i].imgNum}.jpg" alt="${data[i].description}"/></a>
//                                 <figcaption>${data[i].product_name}</figcaption>
//                                 <figcaption>$${data[i].price}</figcaption>
//                             </figure> `
//             document.getElementById('empty-div').innerHTML+=products
//         }
//     } displayAll(); // Here I'm calling the function right away so the products display on page load. (couldn't use an iife because then I couldnt acess the data to do the following logic)
    
//     //Here Im targeting the dropdown menu and the function takes in the value chosen by the user    
//     dropdown.addEventListener("change", function(val) {

//             //This removes the data displayed in the div where the products are displayed
//             document.getElementById("empty-div").innerHTML = "";
//             //This if else statement matches the data according to the category picked in the drop down menu, then displays the product(s)
//              if (val.target.value == "shampoo") {
//                 var display = `<figure> 
//                                     <a href="details.html"><img class="products" src="image${data[0].imgNum}.jpg" alt="${data[0].description}"/></a>
//                                 <figcaption>${data[0].product_name}</figcaption>                     
//                                 <figcaption>$${data[0].price}</figcaption>
//                                 </figure> 
//                                 <figure> 
//                                     <a href="details.html"><img class="products" src="image${data[1].imgNum}.jpg" alt="${data[1].description}"/></a>
//                                 <figcaption>${data[1].product_name}</figcaption>                     
//                                 <figcaption>$${data[1].price}</figcaption>
//                                 </figure>  `
//                 document.getElementById('empty-div').innerHTML+=display
//             }
//             else if(val.target.value == "conditioner") {
//                 var display = `<figure> 
//                                     <a href="details.html"><img class="products" src="image${data[2].imgNum}.jpg" alt="${data[2].description}"/></a>
//                                     <figcaption>${data[2].product_name}</figcaption>                     
//                                     <figcaption>$${data[2].price}</figcaption>
//                                 </figure> 
//                                 <figure> 
//                                     <a href="details.html"><img class="products" src="image${data[3].imgNum}.jpg" alt="${data[3].description}"/></a>
//                                     <figcaption>${data[3].product_name}</figcaption>                     
//                                     <figcaption>$${data[3].price}</figcaption>
//                                 </figure>  `
//                 document.getElementById('empty-div').innerHTML+=display
//             }
//             else if (val.target.value == "hair-spray") {
//                 var display = `<figure> 
//                                     <a href="details.html"><img class="products" src="image${data[4].imgNum}.jpg" alt="${data[4].description}"/></a>
//                                     <figcaption>${data[4].product_name}</figcaption>                     
//                                     <figcaption>$${data[4].price}</figcaption>
//                                 </figure> 
//                                 <figure> 
//                                     <a href="details.html"><img class="products" src="image${data[5].imgNum}.jpg" alt="${data[5].description}"/></a>
//                                     <figcaption>${data[5].product_name}</figcaption>                     
//                                     <figcaption>$${data[5].price}</figcaption>
//                                 </figure>  `
//                 document.getElementById('empty-div').innerHTML+=display
//             }
//             else if (val.target.value == "mousse") {
//                 var display = `<figure> 
//                                     <a href="details.html"><img class="products" src="image${data[6].imgNum}.jpg" alt="${data[6].description}"/></a>
//                                     <figcaption>${data[6].product_name}</figcaption>                     
//                                     <figcaption>$${data[6].price}</figcaption>
//                                 </figure> 
//                                 <figure> 
//                                     <a href="details.html"><img class="products" src="image${data[7].imgNum}.jpg" alt="${data[7].description}"/></a>
//                                     <figcaption>${data[7].product_name}</figcaption>                     
//                                     <figcaption>$${data[7].price}</figcaption>
//                                 </figure>  `
//                 document.getElementById('empty-div').innerHTML+=display
//             }
//             //if the user clicks "see all" in the dropdown menu the displayAll function is called again to display all the products again.
//             else {
//                 return displayAll()

//             }

//          })
//     })
// }















// // /* Get all products */
// document.addEventListener("DOMContentLoaded", displayProducts);

// function displayProducts() {
// fetch('http://localhost:8020/products')
// .then(response => { 
// if (!response.ok) {
//   throw new Error('Network response was not ok');
// }
//     return response.json()
// })
// .then(data => {
//     for (i = 0; i < data.length; i++) {
//     var products = `<figure> 
//                         <a href="details.html"><img class="products" src="image${data[i].imgNum}.jpg" alt="${data[i].description}"/></a>
//                         <figcaption>${data[i].product_name}</figcaption>
//                         <figcaption>$${data[i].price}</figcaption>
//                     </figure> `
//     document.getElementById('empty-div').innerHTML+=products
//     }
//   }
// )}


// // // // /*filter products*/

// var dropdown = document.querySelectorAll("#hairproducts")[0];

// //listens for a change and passes in the value as val
// dropdown.addEventListener("change", val => {

// document.getElementById("empty-div").innerHTML = "";

// fetch('http://localhost:8020/products')
// .then(response => { 
//     return response.json()
// })
// .then(data =>{
//     if (val.target.value == "shampoo") {
//         var display = `<figure> 
//                             <a href="details.html"><img class="products" src="image${data[0].imgNum}.jpg" alt="${data[0].description}"/></a>
//                            <figcaption>${data[0].product_name}</figcaption>                     
//                            <figcaption>$${data[0].price}</figcaption>
//                         </figure> 
//                         <figure> 
//                             <a href="details.html"><img class="products" src="image${data[1].imgNum}.jpg" alt="${data[1].description}"/></a>
//                            <figcaption>${data[1].product_name}</figcaption>                     
//                            <figcaption>$${data[1].price}</figcaption>
//                         </figure>  `
//         document.getElementById('empty-div').innerHTML+=display
//     }
//     else if(val.target.value == "conditioner") {
//         var display = `<figure> 
//                             <a href="details.html"><img class="products" src="image${data[2].imgNum}.jpg" alt="${data[2].description}"/></a>
//                             <figcaption>${data[2].product_name}</figcaption>                     
//                             <figcaption>$${data[2].price}</figcaption>
//                         </figure> 
//                         <figure> 
//                             <a href="details.html"><img class="products" src="image${data[3].imgNum}.jpg" alt="${data[3].description}"/></a>
//                             <figcaption>${data[3].product_name}</figcaption>                     
//                             <figcaption>$${data[3].price}</figcaption>
//                         </figure>  `
//         document.getElementById('empty-div').innerHTML+=display
//     }
//     else if (val.target.value == "hair-spray") {
//         var display = `<figure> 
//                             <a href="details.html"><img class="products" src="image${data[4].imgNum}.jpg" alt="${data[4].description}"/></a>
//                             <figcaption>${data[4].product_name}</figcaption>                     
//                             <figcaption>$${data[4].price}</figcaption>
//                         </figure> 
//                         <figure> 
//                             <a href="details.html"><img class="products" src="image${data[5].imgNum}.jpg" alt="${data[5].description}"/></a>
//                             <figcaption>${data[5].product_name}</figcaption>                     
//                             <figcaption>$${data[5].price}</figcaption>
//                         </figure>  `
//         document.getElementById('empty-div').innerHTML+=display
//     }
//     else if (val.target.value == "mousse") {
//         var display = `<figure> 
//                             <a href="details.html"><img class="products" src="image${data[6].imgNum}.jpg" alt="${data[6].description}"/></a>
//                             <figcaption>${data[6].product_name}</figcaption>                     
//                             <figcaption>$${data[6].price}</figcaption>
//                         </figure> 
//                         <figure> 
//                             <a href="details.html"><img class="products" src="image${data[7].imgNum}.jpg" alt="${data[7].description}"/></a>
//                             <figcaption>${data[7].product_name}</figcaption>                     
//                             <figcaption>$${data[7].price}</figcaption>
//                         </figure>  `
//         document.getElementById('empty-div').innerHTML+=display
//     }
//     else {
//         return displayProducts()
//     }
//     })
// })
  


