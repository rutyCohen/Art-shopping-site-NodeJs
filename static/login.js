

function login() {
    let email = document.getElementById("email1").value;
    let password = document.getElementById("password1").value;

    console.log(email,"email");
    console.log(password,"password");
    fetch("api/user/" + email + "/" + password)
        .then(response => {

            if (response.ok && response.status == 204)
                alert(`אינך רשום במערכת`);
            else if (response.ok)
                return response.json()
            else
                throw new console.error(response.status);
        })
        .then(data => {
            if (data) {
                sessionStorage.setItem("user", JSON.stringify(data));
                window.location.href = "ExsistingUser.html";
                alert("welcome back " + data.firstName + " " + data.lastName);
            }
            else{
                sessionStorage.setItem("password", JSON.stringify(password));
            }

        })
        .catch(err => console.log(err));
};

function sign() {
    let user = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        address:{
        country: document.getElementById("country").value,
        city: document.getElementById("city").value,
        street: document.getElementById("street").value,
        apartmentNumber: document.getElementById("apartmentNumber").value}


    }
    fetch("api/user", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(response => {
        if (response.status==400)
        alert("Oooooops. Please enter a valid email");
        if (response.status==407)
        alert("Ooowww no. Your password isn't valid")
        if (response.ok && response.status==200)
        return response.json()
        else
        throw new error(response.status);
})
.then(data => {
    if (data) {
        alert('User registered successfully')
        sessionStorage.setItem('user',JSON.stringify(data))
        window.location.href = "ExsistingUser.html";
    }
 
})
.catch(err => console.log(err))
};

function getAllOrder(){

    var id = JSON.parse(sessionStorage.getItem("user"))._id;

    fetch("api/user/" + id)
        .then(response => {
            if(response.ok && response.status ==200)
                return response.json();
            else 
                throw new Error(response.json);
        })
        .then(data=>{
            if(data != "erro") {
                document.getElementById("myOrders").innerText ="" +JSON.stringify(data)+"👍👌";
                
            }
    
        }).catch((error) => { console.log(error); alert(error) });
                
    }
    function getMax(){
        debugger
        fetch("api/orders" )
            .then(response => {
                if(response.ok && response.status ==200)
                    return response.json();
                else 
                    throw new Error(response.json);
            })
            .then(data=>{
                if(data != "erro") {
                    document.getElementById("show").innerText ="" +JSON.stringify(data);
                    
                }
        
            }).catch((error) => { console.log(error); alert(error) });
                    
        }
    
    

    
    
