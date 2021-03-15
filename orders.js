let url = "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders";

if(localStorage.getItem("user-authenticated") == null || localStorage.getItem("user-authenticated") === "false") {
    alert("Please login first")
    window.location = "/login.html";
}


let ordersData = [];
let dataClasses = ["row", "p-2", "align-items-center", "shadow-sm"];
let dataPane = document.getElementById("dataPane");
let countPlaceholder = document.getElementById("countPlaceholder");
let newFilter = document.getElementById("newFilter");
let packedFilter = document.getElementById("packedFilter");
let inTransitFilter = document.getElementById("inTransitFilter");
let deliveredFilter = document.getElementById("deliveredFilter");
let logOut = document.getElementById("logOut");
let totalCount = 0;
let newCount = 0;
let packedCount = 0;
let inTransitCount = 0;
let deliveredCount = 0;
let newEleRefs = [];
let packedEleRefs = [];
let inTransitEleRefs = [];
let deliveredEleRefs = [];

logOut.addEventListener("click", logOutHandler);

fetch(url)
    .then(response => response.json())
    .then(data => {
        data.forEach(element => {
            ordersData.push(element);
        });
        loadData();
        newFilter.addEventListener("change", newFilterHandler);
        packedFilter.addEventListener("change", packedFilterHandler);
        inTransitFilter.addEventListener("change", inTransitFilterHandler);
        deliveredFilter.addEventListener("change", deliveredFilterHandler);
    });



function loadData() {
    totalCount = ordersData.length;
    countPlaceholder.innerText = totalCount;

    let df = document.createDocumentFragment();

    ordersData.forEach(element => {
        let newEle = document.createElement("div");
        dataClasses.forEach(e => newEle.classList.add(e));
        newEle.innerHTML = `
        <div class="col text-muted">
            ${element.id}
        </div>
        <div class="col-4">
            ${element.customerName}
        </div>
        <div class="col d-flex flex-column">
            <span> ${element.orderDate} </span>
            <span class="text-muted"> ${element.orderTime} </span>
        </div>
        <div class="col">
            <span class="text-muted"> $${element.amount} </span>
        </div>
        <div class="col">
            ${element.orderStatus}
        </div>
    `
        df.appendChild(newEle);

        switch(element.orderStatus) {
            case "New":
                newCount++;
                newEleRefs.push(newEle);
                break;
            case "Packed":
                packedCount++;
                packedEleRefs.push(newEle);
                break;
            case "InTransit":
                inTransitCount++;
                inTransitEleRefs.push(newEle);
                break;
            case "Delivered":
                deliveredCount++;
                deliveredEleRefs.push(newEle);
                break;
        }
    })

    dataPane.appendChild(df);

}

function newFilterHandler() {
    if(newFilter.checked) {
        totalCount += newCount;
        countPlaceholder.innerText = totalCount;
        newEleRefs.forEach(e => {
            e.hidden = false;
        });
    } else {
        totalCount -= newCount;
        countPlaceholder.innerText = totalCount;
        newEleRefs.forEach(e => {
            e.hidden = true;
        });
    }
}

function packedFilterHandler() {
    if(packedFilter.checked) {
        totalCount += packedCount;
        countPlaceholder.innerText = totalCount;
        packedEleRefs.forEach(e => {
            e.hidden = false;
        });
    } else {
        totalCount -= packedCount;
        countPlaceholder.innerText = totalCount;
        packedEleRefs.forEach(e => {
            e.hidden = true;
        });
    }
}

function inTransitFilterHandler() {
    if(inTransitFilter.checked) {
        totalCount += inTransitCount;
        countPlaceholder.innerText = totalCount;
        inTransitEleRefs.forEach(e => {
            e.hidden = false;
        });
    } else {
        totalCount -= inTransitCount;
        countPlaceholder.innerText = totalCount;
        inTransitEleRefs.forEach(e => {
            e.hidden = true;
        });
    }
}

function deliveredFilterHandler() {
    if(deliveredFilter.checked) {
        totalCount += deliveredCount;
        countPlaceholder.innerText = totalCount;
        deliveredEleRefs.forEach(e => {
            e.hidden = false;
        });
    } else {
        totalCount -= deliveredCount;
        countPlaceholder.innerText = totalCount;
        deliveredEleRefs.forEach(e => {
            e.hidden = true;
        });
    }
}

function logOutHandler() {
    localStorage.setItem("user-authenticated", false);
    window.location = "/login.html";
}