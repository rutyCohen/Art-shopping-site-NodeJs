function getOrder() {
    let c = JSON.parse(sessionStorage.getItem("counterCart"));
    document.getElementById("itemCount").innerHTML = c;
    document.getElementById("totalAmount").innerHTML = JSON.parse(sessionStorage.getItem("cost"));
    let cart = JSON.parse(sessionStorage.getItem("myCart"));

    for (let i = 0; i < cart.length; i++) {
        drowOrder(cart[i]);
    }
}

function drowOrder(product) {
    var url = "../Images/";
    let s = document.getElementById("temp-row");
    var clonS = s.content.cloneNode(true);
    clonS.querySelector(".image").src = url + product.Images ;
    clonS.querySelector(".itemName").innerHTML = product.name;
    clonS.querySelector(".price").innerHTML = product.price + ' ' + 'ש"ח ';
    clonS.querySelector(".expandoHeight").addEventListener("click", () => {
        deleteItem(product);
    });
    document.querySelector("tbody").appendChild(clonS);
}


function deleteItem(product) {
    let cart = JSON.parse(sessionStorage.getItem("myCart"));
    for (var i = 0; i < cart.length; i++) {
        if (product._id == cart[i]._id)
        {
            var tempCart = cart.slice(0, i);
            var tempCart1 = cart.slice(i + 1, cart.length);
            cart = tempCart.concat(tempCart1);
            sessionStorage.setItem("myCart", JSON.stringify(cart));

            var cost = JSON.parse(sessionStorage.getItem("cost"));
            cost-= product.price;
            var count = JSON.parse(sessionStorage.getItem("counterCart"));
            count-= 1;

            sessionStorage.setItem("cost", JSON.stringify(cost));
            sessionStorage.setItem("counterCart", JSON.stringify(count));
            document.querySelector("tbody").replaceChildren();
            getOrder();
            break;
        }

    }
}

function placeOrder() {
    
    var items = [];
    var cart = JSON.parse(sessionStorage.getItem("myCart"));

    for (var i = 0; i < cart.length; i++) {
        var item = {
            //OrderItemId: 0,
            ProductId: JSON.parse(sessionStorage.getItem("myCart"))[i]._id,
            //OrderId: 0,
            Quantity: 1
        }
        items.push(item);
    }
    let myCartDetails = {
       // OrderId: 0,
       date: new Date(),
       sum: JSON.parse(sessionStorage.getItem("cost")),
        userId: JSON.parse(sessionStorage.getItem("user"))._id,
        products: items
    };
    fetch("api/orders", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(myCartDetails)
    }).then(response => {
        if (response.ok)
            return response.json();
        else
            response.json().then(error => { alert(JSON.stringify(error.errors)); });
    })
        .then(data => {
            alert(' הזמנתך מספר ' + data._id +'נקלטה בהצלחה, תודה ולהתראות');
            window.location.href = "products.html";
            let userIdForSession = JSON.parse(sessionStorage.getItem("user"));
            sessionStorage.clear();
            sessionStorage.setItem("user", JSON.stringify(userIdForSession));
    })
}










