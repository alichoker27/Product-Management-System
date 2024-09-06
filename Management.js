// 1 get total                 Function
// 2 Creat Product             Function
// 3 Save Data in localStorage Function
// 4 Clear data input          Function (after click create)
// 5 Read                      Function (show them in the table)
// 6 Count Product              Function (Creat rproducts = count)
// 7 Delete                    Function
// 8 Update                    Function
// 9 Search                    Function
// 10 Clean data               Function

let Title = document.getElementById("title");
let Price = document.getElementById("price");
let Taxes = document.getElementById("taxes");
let Ads = document.getElementById("ads");
let Discount = document.getElementById("discount");
let Total = document.getElementById("total");
let Count = document.getElementById("count");
let Category = document.getElementById("category");
let Submit = document.getElementById("submit");

let mood = "create";
let tmp;

// 1 get total Function
function getTotal() {
  if (Price.value != "") {
    let result = +Price.value + +Taxes.value + +Ads.value - +Discount.value;
    Total.innerHTML = `Total: ${result}`;
    Total.style.background = "green";
  } else {
    Total.innerHTML = " ";
    Total.style.background = "brown";
  }
}

// 2 Create Product Function
let dataProduct;

//Checking if localStorage has product data:
//localStorage.getItem("product") retrieves the value associated with the key "product" from the local storage.
//The if statement checks if this value is truthy, meaning it exists and is not null or undefined.
if (localStorage.getItem("product")) {
  try {
    dataProduct = JSON.parse(localStorage.getItem("product"));
  } catch (e) {
    dataProduct = [];
  }
} else {
  dataProduct = [];
}

// 3 Save Data in localStorage Function
Submit.onclick = function () {
  // Create object to save all the data
  let newProduct = {
    title: Title.value.toLowerCase(),
    price: Price.value,
    taxes: Taxes.value,
    ads: Ads.value,
    discount: Discount.value,
    total: Total.innerHTML.split(": ")[1], // Extract total value
    count: Count.value,
    category: Category.value.toLowerCase(),
  };

  // 6 Count Product (Creat products = count)
  if (
    Title.value != "" &&
    Price.value != "" &&
    Category.value != "" &&
    newProduct.count < 100
  ) {
    if (mood === "create") {
      if (newProduct.count > 1) {
        for (let i = 0; i < newProduct.count; i++) {
          dataProduct.push(newProduct);
        }
      } else {
        dataProduct.push(newProduct);
      }
    } else {
      dataProduct[tmp] = newProduct;
      mood = "create";
      Submit.innerHTML = "Create";
      Count.style.display = "block";
    }
    clear();
  }

  localStorage.setItem("product", JSON.stringify(dataProduct));
  console.log(dataProduct);

  showData();
};

// 4 Clear data input Function (after click create)
function clear() {
  Title.value = "";
  Price.value = "";
  Taxes.value = "";
  Ads.value = "";
  Discount.value = "";
  Count.value = "";
  Category.value = "";
  Total.innerHTML = "Total: ";
  Total.style.background = "brown";
}

// 5 Read Function (show them in the table)
function showData() {
  getTotal();
  let table = "";
  for (let i = 0; i < dataProduct.length; i++) {
    table += ` <tr>
                    <td>${i + 1}</td>
                    <td>${dataProduct[i].title}</td>
                    <td>${dataProduct[i].price}</td>
                    <td>${dataProduct[i].taxes}</td>
                    <td>${dataProduct[i].ads}</td>
                    <td>${dataProduct[i].discount}</td>
                    <td>${dataProduct[i].total}</td>
                    <td>${dataProduct[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">Update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                </tr>`;
  }
  document.getElementById("tbody").innerHTML = table;

  let btnDeleteAll = document.getElementById("deleteAll");
  if (dataProduct.length > 0) {
    btnDeleteAll.innerHTML = `<button onclick="deleteAll()">Delete All (${dataProduct.length})</button>`;
  } else {
    btnDeleteAll.innerHTML = "";
  }
}

showData();

// 7 Delete Function
function deleteData(i) {
  dataProduct.splice(i, 1);
  //i is the number of position(index), 1 is the number of the product that I want to delete
  //this line of code will delete the product from the array only !to delete from the local storage we use the following code=>
  localStorage.product = JSON.stringify(dataProduct);
  //add the new array  to the local storage after deleting the item
  //JSON.stringfy(dataProduct): Convert the dataProduct javaScript array into a JSON string  because localStorage can only store data as strings
  //localStorage.product = JSON.stringify(dataProduct);: Stores the JSON string in localStorage under the key product that I created above.
  showData();
}

function deleteAll() {
  localStorage.clear();
  dataProduct.splice(0);
  showData();
}

// 8 Update                    Function
function updateData(i) {
  Title.value = dataProduct[i].title;
  Price.value = dataProduct[i].price;
  Taxes.value = dataProduct[i].taxes;
  Ads.value = dataProduct[i].ads;
  Discount.value = dataProduct[i].discount;
  Category.value = dataProduct[i].category;
  getTotal();
  count.style.display = "none";
  Submit.innerHTML = "Update";
  mood = "Update";
  tmp = i;
  scroll({ top: 0, behavior: "smooth" });
}

// 9 Search  Function
let search = document.getElementById("search");
let searchMood = "title"; //default
function getSearchMood(id) {
  if (id == "SearchTitle") {
    searchMood = "title";
    search.placeholder = "Search by Title";
  } else {
    searchMood = "category";
    search.placeholder = "Search by Category";
  }
  search.focus();
  search.value = "";
  showData();
}

function searchData(value) {
  let table = "";
  if (searchMood == "title") {
    for (let i = 0; i < dataProduct.length; i++) {
      if (dataProduct[i].title.includes(value.toLowerCase())) {
        table += ` <tr>
        <td>${i + 1}</td>
        <td>${dataProduct[i].title}</td>
        <td>${dataProduct[i].price}</td>
        <td>${dataProduct[i].taxes}</td>
        <td>${dataProduct[i].ads}</td>
        <td>${dataProduct[i].discount}</td>
        <td>${dataProduct[i].total}</td>
        <td>${dataProduct[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">Update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
    </tr>`;
      }
    }
  } else {
    for (let i = 0; i < dataProduct.length; i++) {
      if (dataProduct[i].category.includes(value.toLowerCase())) {
        table += ` <tr>
        <td>${i + 1}</td>
        <td>${dataProduct[i].title}</td>
        <td>${dataProduct[i].price}</td>
        <td>${dataProduct[i].taxes}</td>
        <td>${dataProduct[i].ads}</td>
        <td>${dataProduct[i].discount}</td>
        <td>${dataProduct[i].total}</td>
        <td>${dataProduct[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">Update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
    </tr>`;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}

// 10 Clean data Function
