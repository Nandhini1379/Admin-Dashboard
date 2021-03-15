let url = "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products";

if(localStorage.getItem("user-authenticated") == null || localStorage.getItem("user-authenticated") === "false") {
    alert("Please login first")
    window.location = "/login.html";
}


let productData = [];
let dataClasses = ["row", "p-3", "align-items-center", "shadow-sm"];
let dataPane = document.getElementById("dataPane");
let countPlaceholder = document.getElementById("countPlaceholder");
let expiredFilter = document.getElementById("expiredFilter");
let lowStockFilter = document.getElementById("lowStockFilter");
let totalCount = 0;
let lowStockCount = 0;
let expiredCount = 0;
let lowStockEleRefs = [];
let expiredEleRefs = [];
let today = new Date();

logOut.addEventListener("click", logOutHandler);

fetch(url)
    .then(response => response.json())
    .then(data => {
        data.forEach(element => {
            productData.push(element);
        });
        loadData();
        expiredFilter.addEventListener("change", expiredFilterHandler);
        lowStockFilter.addEventListener("change", lowStockFilterHandler);
    });



function loadData() {
    totalCount = productData.length;
    countPlaceholder.innerText = totalCount;

    let df = document.createDocumentFragment();

    productData.forEach(element => {
        let newEle = document.createElement("div");
        dataClasses.forEach(e => newEle.classList.add(e));
        newEle.innerHTML = `
        <div class="col text-muted">
            ${element.id}
        </div>
        <div class="col-4">
            ${element.medicineName}
        </div>
        <div class="col-4 text-muted">
            ${element.medicineBrand}
        </div>
        <div class="col">
            ${element.expiryDate}
        </div>
        <div class="col text-muted">
            $${element.unitPrice}
        </div>
        <div class="col text-muted">
            ${element.stock}
        </div>
    `
        df.appendChild(newEle);

        if(element.stock < 100) {
            lowStockCount++;
            lowStockEleRefs.push(newEle);
        }
        let tmp = new Date(element.expiryDate);
        if(tmp < today) {
            expiredCount++;
            expiredEleRefs.push(newEle);
        }
    })

    dataPane.appendChild(df);

}

function expiredFilterHandler() {
    if(expiredFilter.checked) {
        totalCount += expiredCount;
        countPlaceholder.innerText = totalCount;
        expiredEleRefs.forEach(e => {
            e.hidden = false;
        });
    } else {
        totalCount -= expiredCount;
        countPlaceholder.innerText = totalCount;
        expiredEleRefs.forEach(e => {
            e.hidden = true;
        });
    }
}

function lowStockFilterHandler() {
    if(lowStockFilter.checked) {
        totalCount += lowStockCount;
        countPlaceholder.innerText = totalCount;
        lowStockEleRefs.forEach(e => {
            e.hidden = false;
        });
    } else {
        totalCount -= lowStockCount;
        countPlaceholder.innerText = totalCount;
        lowStockEleRefs.forEach(e => {
            e.hidden = true;
        });
    }
}

function logOutHandler() {
    localStorage.setItem("user-authenticated", false);
    window.location = "/login.html";
}