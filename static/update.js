
function update() {
    
    userId= JSON.parse(sessionStorage.getItem('user'))._id
    let user = {
        email: document.getElementById("email3").value,
        password: document.getElementById("password3").value,
        firstName: document.getElementById("firstName3").value,
        lastName: document.getElementById("lastName3").value,
        address:{
            country: document.getElementById("country3").value,
            city: document.getElementById("city3").value,
            street: document.getElementById("street3").value,
            apartmentNumber: document.getElementById("apartmentNumber3").value}
    
      

    }
    fetch("api/user/"+ userId ,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(response => 
    {
        if (response.ok)
        
            alert('your new details saved successfully');
            window.location.href = "products.html";

        })
};

function user() {
    let user = JSON.parse(sessionStorage.getItem('user'));
    let address =JSON.parse(sessionStorage.getItem('user')).address;
     document.getElementById("email3").value = user.email;
     document.getElementById("password3").value = user.password;
     document.getElementById("firstName3").value = user.firstName;
     document.getElementById("lastName3").value = user.lastName;
     document.getElementById("country3").value = address[0].city;
     document.getElementById("city3").value =address[0].country;
     document.getElementById("street3").value = address[0].street;
     document.getElementById("apartmentNumber3").value = address[0].apartmentNumber;

    


   

};