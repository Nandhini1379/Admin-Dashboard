let url = "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users";

if(localStorage.getItem("user-authenticated") == null || localStorage.getItem("user-authenticated") === "false") {
    alert("Please login first")
    window.location = "/login.html";
}


let usersData = [];
let userEleRefs = [];
let userNames = [];
let dataClasses = ["row", "gy-1", "p-3", "align-items-center", "shadow-sm"];
let dataPane = document.getElementById("dataPane");
let searchInput = document.getElementById("searchInput");
let searchFilter = document.getElementById("searchFilter");
let resetFilter = document.getElementById("resetFilter");

logOut.addEventListener("click", logOutHandler);

fetch(url)
    .then(response => response.json())
    .then(data => {
        data.forEach(element => {
            usersData.push(element);
        });
        loadData();
        searchFilter.addEventListener("click", searchFilterHandler);
        resetFilter.addEventListener("click", resetFilterHandler);
    });

function loadData() {
    let df = document.createDocumentFragment();

    usersData.forEach(element => {
        let newEle = document.createElement("div");
        dataClasses.forEach(e => newEle.classList.add(e));
        newEle.innerHTML = `
        <div class="col-1 text-muted">
            ${element.id}
        </div>
        <div class="col-3">
            <img src="${element.profilePic}" alt="profile pic">
        </div>
        <div class="col-4 text-muted">
            ${element.fullName}
        </div>
        <div class="col-1">
            ${element.dob}
        </div>
        <div class="col-1 text-muted">
            ${element.gender}
        </div>
        <div class="col-2 text-muted">
            ${element.currentCity}, ${element.currentCountry}
        </div>
        `;
        userNames.push(element.fullName.toLowerCase());
        userEleRefs.push(newEle);
        df.appendChild(newEle);
    });

    dataPane.appendChild(df);
}

function searchFilterHandler() {
    let t = searchInput.value.toLowerCase();
    if(t.length < 2) {
        alert("Please enter atleast 2 characters");
        return;
    }
    for(let i = 0; i < usersData.length; i++) {
        if(userNames[i].includes(t)) {
            userEleRefs[i].hidden = false;
        } else {
            userEleRefs[i].hidden = true;
        }
    }
    searchInput.value = "";
}

function resetFilterHandler() {
    userEleRefs.forEach(e => {
        if(e.hidden) {
            e.hidden = false;
        }
    })
}

function logOutHandler() {
    localStorage.setItem("user-authenticated", false);
    window.location = "/login.html";
}