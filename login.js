let url = "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/login";

let logIn = document.getElementById("logIn");
let userName = document.getElementById("userName");
let password = document.getElementById("Password");

if(localStorage.getItem("user-authenticated") === "true") {
    alert("already logged in");
    window.location = "/orders.html"
}

logIn.addEventListener("click", logInHandler);

function logInHandler() {
    if(userName.value === password.value) {
        fetch(url, {
            method: "POST",
            body: JSON.stringify({username : userName.value, password: password.value})
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            alert("Login Successful!");
            localStorage.setItem("user-authenticated", true);
            window.location = "/orders.html";
        })
    } else {
        alert("Please enter valid credentials!");
    }
}