
var arr = [];
var cos = 0;
var cnt = 0;

var myCart = JSON.parse(sessionStorage.getItem('myCart'));
var counterCart = JSON.parse(sessionStorage.getItem('counterCart'));
var cost = JSON.parse(sessionStorage.getItem('cost'));

window.addEventListener('load', (event) => {

    getAllProducts();
    getAllCategory();
    //document.getElementById("ItemsCountText").innerHTML = sum;

    let sum = JSON.parse(sessionStorage.getItem(counterCart));
    if (sum == null) {
       document.getElementById("ItemsCountText").innerHTML = 0;   
    }
})


function getAllProducts() {
    debugger
    fetch("api/Product/")
    .then(response => {
        if (response.ok && response.status == 204)
            alert("לא נמצאו מוצרים")
        else if (response.ok)
            return response.json()
        else
            throw new error(response.status)
    })
        .then(data => {
            if (data) {
                var count = 0;
                data.forEach(d => viewProducts(d, count = count + 1))
                document.getElementById("counter").innerHTML = count;
            }
 
        })

    .catch (err => console.log(err));
}


function viewProducts(product) {

    var element = document.getElementById("temp-card");
    var cln = element.content.cloneNode(true);
    cln.querySelector("img").src = "../Images/" + product.Images ;
    cln.querySelector(".price").innerText = "מחיר:  " + product.price + " ₪ ";
    cln.querySelector(".description").innerText = product.desc;
    cln.querySelector(".addToMyCart").addEventListener("click", () => {
      addToCart(product)    
    });
    document.getElementById("PoductList").appendChild(cln);
}

function getAllCategory() {
    fetch("api/Category/")
        .then(response => {
            if (response.ok && response.status == 204)
                alert("לא נמצאו קטגוריות")
            else if (response.ok)
                return response.json()
            else
                throw new error(response.status)
        })
        .then(data => {
            if (data) {
                data.forEach(c => viewCategory(c))
                
            }
        })
        .catch(err => console.log(err))
}

function viewCategory(category) {
    var element = document.getElementById("temp-category");
    var cln = element.content.cloneNode(true);

    cln.querySelector(".OptionName").innerText = category.name;
    cln.querySelector(".opt").id = category._id;
    cln.querySelector(".lbl").for = category._id;
    cln.querySelector(".opt").addEventListener("change", () => {
        if (document.getElementById(category._id).checked) {
            getProductsByCategory(category._id);
        }
        else
        {
            window.location.href = "";
            getAllProducts();
              
        }        
    });
    document.getElementById("filters").appendChild(cln);
}




function getProductsByCategory(c) {
    fetch("api/Product/" + c)
        .then(response => {                       
            if (response.ok && response.status == 204)
                alert("לא נמצאו מוצרים")
            else if (response.ok)
                return response.json()
            else
                throw new error(response.status)
           
        })       
        .then(data => {
            if (data) {
                document.body.removeChild(document.getElementById("PoductList"));
                c = 0;



               // document.getElementById("counter").innerHTML = 0;
                var t = document.createElement('div');
                t.setAttribute("id", "PoductList");
                document.body.appendChild(t);
                data.forEach(d => { return (viewProducts(d), c = c + 1) });
                document.getElementById("counter").innerHTML = c;
            }           
            else
                alert("אין מוצרים מקטגוריה זו");
        })
        .catch(err => console.log(err))
}



function addToCart(product) {
    if (myCart) {
        arr = myCart;
        //document.getElementById("ItemsCountText").innerHTML = JSON.parse(sessionStorage.getItem('counterCart'));
    }
    arr.push(product);
    sessionStorage.setItem('myCart', JSON.stringify(arr));

    if (counterCart)
        cos = counterCart;
    cos += 1;
    sessionStorage.setItem('counterCart', JSON.stringify(cos));

    if (cost)
        cnt = cost;
    cnt += product.price;
    sessionStorage.setItem('cost', JSON.stringify(cnt));
    document.getElementById("ItemsCountText").innerHTML = arr.length;
}

