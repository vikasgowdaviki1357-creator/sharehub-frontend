const BASE_URL = "https://sharehub-backend-lm98.onrender.com";
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

async function loadProduct() {
  const res = await fetch("https://sharehub-backend-lm98.onrender.com/api/items/all");
  const items = await res.json();

  const product = items.find((item) => item._id === id);

  document.getElementById("product-container").innerHTML = `
    <h2>${product.name}</h2>
    <img src="${product.image}" width="200">
    <p>₹${product.price}</p>
    <p>${product.category}</p>
    <p>${product.sold ? "Sold" : "Available"}</p>
  `;
}

loadProduct();