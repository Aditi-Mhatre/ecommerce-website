  //loop through product buttons to check if clicked 
  var x = document.getElementsByClassName("img-btn");
  for(var i = 0; i < x.length; i ++){
      var click = x[i];
      console.log(click);
      click.addEventListener("click", added);
      click.addEventListener("click", itemIn);
      click.addEventListener("click", updateTotal);
  }

//changes "Add to Cart" to "Added" 
function added(){
    var buttonClick = event.target;
    console.log(buttonClick);
    if (buttonClick.innerText == "Add to Cart"){
        buttonClick.innerText = "Item in Cart";
        buttonClick.style.backgroundColor = "salmon";
        // updateCart();
        addItem();
    }else{
        buttonClick.innerText = "Add to Cart";
        buttonClick.style.backgroundColor = "pink";
    }     
}

//updates the number of cart items displayed in navigation bar
// function updateCart(){
//     var x = event.target;
//     var q = document.getElementsByClassName("cartqty")[0];
//     var nqty = parseInt(q.innerText);
//     if (x.innerText == "Remove"){
//       nqty = nqty - 1;
//     }else{
//       nqty = nqty + 1;
//     }
//     q.innerText = nqty ;
// }

//extracts information about the added product
function addItem(){
  var button = event.target;
  var item = button.parentElement;
  var title = item.getElementsByClassName("title")[0].innerText;
  var price = item.getElementsByClassName("price")[0].innerText;
  var image = item.getElementsByClassName("pic")[0].src;
  addToCart(title, price, image);
}

//displays the added product information in shopping cart
function addToCart(title,price,image){
    var row = document.createElement("tr");
    row.classList.add("row");
    var cartItem = document.getElementsByClassName("row")[0];
    var cartContent = `
            <td><img name="img" class="display" src=${image}></td>
            <td name="item" class="item">${title}</td>
            <td><input name="qty" class="num" name="qty" type="number" value = 1></td>
            <td name="price" class="cost">${price}</td>
            <td><button class="del">Remove</button></td>
        `
    row.innerHTML = cartContent;
    cartItem.append(row);
    row.getElementsByClassName("del")[0].addEventListener("click", removeItem);
    row.getElementsByClassName("num")[0].addEventListener("click", changeqty);
}

function changeqty(){
  var x = event.target;
  if (x.value <= 0){
    x.value = 1;
  }
  updateTotal();
}

function updateTotal(){
  var y = event.target;
  var cartRow = document.getElementsByClassName("row");
  var sum = 0;
  for (var i = 1; i < cartRow.length; i ++){
    var row = cartRow[i];
    var cost = row.getElementsByClassName("cost")[0].innerText;
    var qty = row.getElementsByClassName("num")[0].value;
    var price = parseFloat(cost.replace("$",""));
    sum = sum + (price * qty);
  }
  var total = document.getElementsByClassName("value")[0];
  total.innerText = "$ " + sum;
}

//removes product from cart
function removeItem(){
  var buttonClicked = event.target;
  var name = buttonClicked.parentElement.parentElement.getElementsByClassName("item")[0].innerText;
  var itemName = document.getElementsByClassName("title");
  var item = document.getElementsByClassName("img-btn");
  for (var i = 0; i < itemName.length; i++){
    if (itemName[i].innerText == name){
      item[i].innerText = "Add to Cart";
    }
  }
  buttonClicked.parentElement.parentElement.remove();
  var content = document.getElementsByClassName("row")[0].innerText;
  if (content == ""){
    var empty = document.getElementsByClassName("empty")[0];
    empty.style.display = "block";
    var btn = document.getElementById("checkout-btn");
    btn.style.display = "none";
    var total = document.getElementsByClassName("value")[0];
    total.innerText = "$ 0";
    var cbtn = document.getElementsByClassName("img-btn");
    for (var i = 0; i < cbtn.length; i ++){
      cbtn[i].innerText = "Add to Cart";
    }
  }
  // updateCart();
  updateTotal();
}

//shopping cart modal
// var modal = document.getElementsByClassName("modal")[0];
// var btn = document.getElementById("cart-sym");
// var span = document.getElementsByClassName("close")[0];
// btn.addEventListener("click", showCart);
// span.addEventListener("click", closeCart);

// function showCart(){
//   modal.style.display = "block";
//   span.addEventListener("click", closeCart);
// }

// function closeCart(){
//   modal.style.display = "none";
// }

// btn.onclick = function() {
//   modal.style.display = "block";
// }
// span.onclick = function(){
//   modal.style.display = "none";
// }


//displays message in the cart according to items in it
function itemIn(){
  var empty = document.getElementsByClassName("empty")[0];
  empty.style.display = "none";
  var checkOut = document.getElementById("checkout-btn");
  checkOut.style.display = "block";
  var carttotal = document.getElementsByClassName("value")[0];
  carttotal.style.display = "block";
}